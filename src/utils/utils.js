const isEmpty = require('lodash/isEmpty');

const { AsyncLocalStorage } = require('async_hooks');

const als = new AsyncLocalStorage();

/* create response-wrapper object */
function createResponseObject({ req, message = '', payload = {}, code, type }) {
  const locale = req.headers.locale ? req.headers.locale : 'en';
  // eslint-disable-next-line import/no-dynamic-require
  const messageInLocale = require(`@public/locales/${locale}/backendMessages.json`);
  message = messageInLocale.API_MESSAGES[message] || message;

  return { code, message, type, payload };
}

/** Sort a JSON by keys */
function sortByKeys(obj) {
  if (isEmpty(obj)) {
    return obj;
  }

  const sortedObj = {};
  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
      sortedObj[key] = obj[key];
    });

  return sortedObj;
}

function getApiBaseUrl() {
  return `${global.env.NODE_ENV === 'development' ? 'http' : 'https'}://${global.env.HOST}:${global.env.PORT}`;
}

function autoVersionIncrement(version) {
  // Split the version string into an array of numbers.
  const parts = version.split('.');

  // Get the current major, minor, and patch numbers.
  let major = parseInt(parts[0], 10);
  let minor = parseInt(parts[1], 10);
  let patch = parseInt(parts[2], 10);

  // Increment the patch number.
  patch += 1;

  // If the patch number is now 10, increment the minor number and set the patch number to 0.
  if (patch === 10) {
    minor += 1;
    patch = 0;
  }

  // If the minor number is now 10, increment the major number and set the minor and patch numbers to 0.
  if (minor === 10) {
    major += 1;
    minor = 0;
    patch = 0;
  }

  // Return the new version string.
  return `${major}.${minor}.${patch}`;
}

function toDotNotation(obj, prefix = '') {
  const result = {};
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      // If the value is another object, call the function recursively
      Object.assign(result, toDotNotation(value, newKey));
    } else {
      // If the value is not an object, add it to the result
      result[newKey] = value;
    }
  }
  return result;
}

const stringConstructor = 'test'.constructor;
const arrayConstructor = [].constructor;
const objectConstructor = {}.constructor;

function whatIsIt(object) {
  if (object === null) {
    return 'null';
  }
  if (object === undefined) {
    return 'undefined';
  }
  if (object.constructor === stringConstructor) {
    return 'String';
  }
  if (object.constructor === arrayConstructor) {
    return 'Array';
  }
  if (object.constructor === objectConstructor) {
    return 'Object';
  }

  return "don't know";
}

function createNestedObject(data) {
  function processContent(content) {
    const nestedContent = {};
    Object.keys(content).forEach((key) => {
      if (key.includes('-')) {
        const parts = key.split('-');
        let currentLevel = nestedContent;

        for (let i = 0; i < parts.length; i++) {
          if (i === parts.length - 1) {
            currentLevel[parts[i]] = content[key];
          } else {
            currentLevel[parts[i]] = currentLevel[parts[i]] || {};
            currentLevel = currentLevel[parts[i]];
          }
        }
      } else {
        nestedContent[key] = content[key];
      }
    });
    return nestedContent;
  }

  return {
    identification: data.identification,
    name: data.name,
    content: processContent(data.content),
    relationships: data.relationships,
    timestamp_created: data.timestamp_created,
    timestamp_updated: data.timestamp_updated,
  };
}

function getProfilePicture(profilePic) {
  if (profilePic) {
    const baseUrl = getApiBaseUrl();

    return `${baseUrl}/profile_picture/${profilePic}`;
  }

  return '';
}

function dataUnflattering(data, length) {
  const keys = Object?.keys(data);
  const value = Object?.values(data);

  const newData = [];
  for (let i = 0; i < length; i++) {
    let tempData = {};
    for (let k = 0; k < keys.length; k++) {
      tempData = {
        ...tempData,
        [keys[k]]: value?.[k]?.[i] || null,
      };
    }
    newData.push(tempData);
  }

  return newData;
}

function createFieldRestrictionSchema({ schema }) {
  const newObject = {};
  for (const [propertyName, propertySchema] of Object.entries(schema)) {
    const propertyType = propertySchema?.type;
    if (
      [String, Number, Date, Boolean].includes(propertyType) ||
      Object.keys(propertySchema).includes('ref') ||
      Object.keys(propertySchema).includes('enums')
    ) {
      newObject[propertyName] = false;
    } else if (whatIsIt(propertySchema) === 'Object') {
      if (Object.keys(propertySchema).length === 0) {
        newObject[propertyName] = false;
      } else {
        newObject[propertyName] = createFieldRestrictionSchema(propertySchema);
      }
    } else if (whatIsIt(propertySchema) === 'Array') {
      if (propertySchema?.length > 0) {
        newObject[propertyName] = createFieldRestrictionSchema(propertySchema?.[0]);
      } else {
        newObject[propertyName] = false;
      }
    }
  }
  return newObject;
}

function separateTrueFalseFromObject(obj) {
  const trueObj = {};
  const falseObj = {};

  for (const key in obj) {
    if (typeof obj[key] === 'boolean') {
      if (obj[key]) {
        trueObj[key] = true;
      } else {
        falseObj[key] = false;
      }
    } else if (typeof obj[key] === 'object') {
      const nested = separateTrueFalseFromObject(obj[key]);
      trueObj[key] = nested.trueObj;
      falseObj[key] = nested.falseObj;
    }
  }

  return { trueObj, falseObj };
  // const { trueObj: separatedTrue, falseObj: separatedFalse } = separateTrueFalseFromObject(schema);
}

module.exports = {
  createNestedObject,
  createResponseObject,
  sortByKeys,
  getApiBaseUrl,
  autoVersionIncrement,
  toDotNotation,
  whatIsIt,
  als,
  getProfilePicture,
  dataUnflattering,
  createFieldRestrictionSchema,
  separateTrueFalseFromObject,
};
