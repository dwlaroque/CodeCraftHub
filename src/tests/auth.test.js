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

describe('User Login', () => {
    beforeAll(async () => {
        // Create a test user
        await User.create({
            username: 'testuser3',
            email: 'testuser3@example.com',
            password: 'password123'
        });
    });

    it('should log in an existing user and return a token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser3@example.com',
                password: 'password123'
            });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.token).toBeDefined(); // Check that a token is returned
    });

    it('should return 401 for invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser3@example.com',
                password: 'wrongpassword'
            });
        expect(res.status).toBe(401);
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Invalid credentials'); // Check the error message
    });
    
    it('should return 404 for non-existent user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'password123'
            });
        expect(res.status).toBe(401);
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Invalid credentials'); // Check the error message
    });
});
