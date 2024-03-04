const ElectronContext = require("./electronContext");

/**
 * ElectronError class for building custom error objects.
 * @class 
 * @name ElectronError
 * @classdesc 
 * @typedef ElectronError
 * @extends Error
 * @property {string} loggingMessage - A human-readable description of the error for logging.
 * @property {string} severity - The severity level of the error (e.g., minor, moderate, severe, critical).
 * @property {object[]} context - Additional context or information related to the error, including changes made to state.
 * @property {boolean} retry - Indicates whether the section of code this error originated from can be retried.
 */
class ElectronError extends Error {
    /**
     * Creates a new ElectronError instance.
     * @param {Error} origError - The original error being leveraged and built upon.
     * @param {string} loggingMessage - A human-readable description of the error for logging.
     * @param {string} severity - The severity level of the error.
     * @example
     * 
     * 
     */
    constructor(origError, loggingMessage = "", severity = "default") {
      super(origError.message); // Call the constructor of the parent class (Error)
      this.name = this.constructor.name; // Set the name property to the name of the constructor function
      this.loggingMessage = loggingMessage;
      this.type = findClass(origError); // Determine the class of the original error
      this.stack = origError.stack; // Set the stack trace of the original error
      this.severity = validateSeverity(severity); // Validate the severity level
      this.electronContext = new ElectronContext(); // Additional context or information related to the error //TODO import and use classs constructor
    }
  }
  
  /**
   * Determines the class of the original error.
   * @description Determines the class name of the original error being leveraged and built upon, which helps in identifying the specific type of error encountered.
   * @param {Error} origError - The original error being leveraged and built upon.
   * @returns {string} - The class name of the original error.
   */
  function findClass(origError) {
    return origError.constructor.name;
  }

  
  /**
   * Validates the severity level input.
   * @description Validates the provided severity level input against a predefined list of valid options and throws an error when the severity level is invalid, in order to enforce consistency and ensure proper handling of errors.
   * @param {string} severity - The severity level to validate.
   * @returns {string} - The validated severity level.
   * @throws {Error} - If the severity level is invalid.
   */
  function validateSeverity(severity) {
    const validSeverities = ["minor", "moderate", "severe", "critical"];
    if (!validSeverities.includes(severity)) {
      throw new Error(`Invalid severity level: ${severity}. Valid options are: ${validSeverities.join(", ")}.`);
    }
    return severity;
  }
  
