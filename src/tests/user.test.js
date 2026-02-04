const request = require('supertest');
const app = require('../src/app'); // Import the app
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
    // Connect to the test database before running tests
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Clean up and close the database connection after tests
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('User Registration', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.username).toBe('testuser');
    });

    it('should return validation error for missing fields', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: '',
                email: '',
                password: ''
            });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe('error');
    });
});

describe('User Profile', () => {
    let token;

    beforeAll(async () => {
        // Register a user and log in to get a token
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser2',
                email: 'testuser2@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser2@example.com',
                password: 'password123'
            });
        token = res.body.data.token; // Store the token for use in profile tests
    });

    it('should fetch user profile', async () => {
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.username).toBe('testuser2');
    });

    it('should return 401 for unauthorized access', async () => {
        const res = await request(app)
            .get('/api/users/profile');
        expect(res.status).toBe(401);
        expect(res.body.status).toBe('error');
    });
});
