const ElectronError = require('./ElectronError');

// Function to handle uncaught exceptions
function handleUncaughtException(error) {
    // Create an instance of CustomError and log or handle it as needed
    const customError = new ElectronError(error, 'Uncaught Exception');
    console.error('Uncaught Exception:', customError);
    // Optionally, you can log the error to a file, send it to a logging service, etc.
    // process.exit(1); // Optionally exit the process
}

// Function to handle unhandled promise rejections
function handleUnhandledRejection(reason, promise) {
    // Create an instance of CustomError and log or handle it as needed
    const customError = new ElectronError(reason, 'Unhandled Promise Rejection');
    console.error('Unhandled Promise Rejection:', customError);
    // Optionally, you can log the error to a file, send it to a logging service, etc.
    // process.exit(1); // Optionally exit the process
}

/* How to use
// Set up global error handlers
process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUnhandledRejection);
*/

// Function to wrap existing error handling logic
function errorHandlerWrapper(fn) {
    return function (...args) {
        try {
            // Call the original error handling function
            fn.apply(this, args);
        } catch (error) {
            // Create an instance of CustomError and handle it
            const customError = new ElectronError(error, 'Error caught and handled');
            console.error('Error caught and handled:', customError);
            // Optionally, you can log the error to a file, send it to a logging service, etc.
        }
    };
}

/*
// Example usage of the error handler wrapper
// Replace `existingErrorHandler` with the actual error handling function used in the project
existingErrorHandler = errorHandlerWrapper(existingErrorHandler);
*/
