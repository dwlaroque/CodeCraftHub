const success = (data) => {
    return {
        status: 'success',
        data,
    };
};

const error = (message, details = null) => {
    return {
        status: 'error',
        message,
        details,
    };
};

module.exports = { success, error };
