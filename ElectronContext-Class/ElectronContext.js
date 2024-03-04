//TODO create functions to pululate properties
//TODO reflect changes made to properties in schema in the constructor and doc strings.
//TODO implement schema building. 
//TODO test schema building and electronContext construction
//TODO write development script that outputs the schema to json file by running this 
//TODO create version of this that replaces schema building with validation using built schema
//TODO add docstring headers to both versions

/**
 * Represents the Electron context information.
 * @class
 * @name ElectronContext
 * @classdesc
 * @typedef ElectronContext
 */
class ElectronContext {
  /**
   * Creates a new ElectronContext instance.
   * @constructor
   * @param {string} electronVersion - The version of Electron.
   * @param {string} nodejsVersion - The version of Node.js.
   * @param {string} currentPlatform - The current platform.
   * @param {object} processDetails - Details about the current process.
   * @param {object} environmentVariables - Environment variables.
   * @param {object} ipcChannels - IPC channels.
   * @param {Array} windows - Array of window configurations.
   * @param {Array} views - Array of view configurations.
   * @param {object} electronConfigurations - Electron configurations.
   */
  constructor(
    electronVersion,
    nodejsVersion,
    currentPlatform,
    processDetails,
    environmentVariables,
    ipcChannels,
    windows,
    views,
    electronConfigurations
  ) {
    this.electronVersion = null; // TODO: Determine Electron version dynamically
    this.nodejsVersion = null; // TODO: Determine Node.js version dynamically
    this.currentPlatform = null; // TODO: Determine current platform dynamically
    this.processDetails = null; // TODO: Determine process details dynamically
    this.environmentVariables = null; // TODO: Determine environment variables dynamically
    this.ipcChannels = null; // TODO: Determine IPC channels dynamically
    this.windows = null; // TODO: Determine window configurations dynamically
    this.views = null; // TODO: Determine view configurations dynamically
    this.electronConfigurations = null; // TODO: Determine Electron configurations dynamically
  }

  // Add any methods or additional functionality as needed
}

const electronContextSchema = {
  electronConfigurations: {
    electronVersion: { type: 'string' },
    nodejsVersion: { type: 'string' },
    currentPlatform: { type: 'string' },
    // Include standard Electron configurations (e.g., app name, app version, etc.)
  },
  process: {
    processID: { type: 'number' },
    processType: { type: 'string' },
  },
  environmentVariables: {
    type: 'object',
    properties: {
      ELECTRON_HOME: {
        type: 'object',
        properties: {
          value: { type: 'string' },
          belongsTo: {
            type: 'string',
            enum: ['electron', 'application', 'dependency'],
          },
        },
      },
      // Add more environment variables as needed
    },
  },
  ipcIncluded: {
    type: 'object',
    properties: {
      incoming: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            channel: { type: 'string' },
            codeSnippet: { type: 'string' },
          },
        },
      },
      outgoing: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            channel: { type: 'string' },
            codeSnippet: { type: 'string' },
          },
        },
      },
    },
  },
  windows: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        windowID: { type: 'number' },
        configuration: {
          type: 'object',
          properties: {
            width: { type: 'number' },
            height: { type: 'number' },
            title: { type: 'string' },
            // Add more window configurations as needed
          },
        },
      },
    },
  },
  views: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        viewID: { type: 'number' },
        configuration: {
          type: 'object',
          properties: {
            width: { type: 'number' },
            height: { type: 'number' },
            // Add more BrowserView configurations as needed
          },
        },
      },
    },
  },
};

function addToSchema(currentSchema, location, schemaAddition) {
  const keys = location.split('.');

  // Traverse the schema to reach the specified location
  for (const key of keys) {
    if (!currentSchema.hasOwnProperty(key)) {
      throw new Error(`Invalid location "${location}".`);
    }
    currentSchema = currentSchema[key];
  }

  // Add properties from schemaAddition to the schema
  Object.entries(schemaAddition).forEach(([key, value]) => {
    if (currentSchema.hasOwnProperty(key)) {
      throw new Error(
        `Property "${key}" already exists at location "${location}".`
      );
    }
    currentSchema[key] = value;
  });
}

// Example usage:
const schemaAddition = {
  newProperty: { type: 'string' },
  // Add more properties as needed
};

//addToSchema('environmentVariables.ELECTRON_HOME', schemaAddition);
