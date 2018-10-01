// private variables

const allowance = [
  {
    id: 'Undefined',
    defaultValue: false,
    isDirty: (val) => val === undefined,
  },
  {
    id: 'Null',
    defaultValue: false,
    isDirty: (val) => val === null,
  },
  {
    id: 'Function',
    defaultValue: false,
    isDirty: (val) => typeof val === 'function',
  },
  {
    id: 'EmptyString',
    defaultValue: false,
    isDirty: (val) => val === '',
  },
  {
    id: 'EmptyArray',
    defaultValue: false,
    isDirty: (val) => Array.isArray(val) && val.length === 0,
  },
  {
    id: 'EmptyObject',
    defaultValue: false,
    isDirty: (val) =>
      val !== null &&
      !Array.isArray(val) &&
      typeof val === 'object' &&
      Object.keys(val).length === 0,
  },
];

// private functions

function bool(val, defaultVal) {
  return val === !defaultVal ? val : defaultVal;
}

// exports

/**
 * @param  {object} object
 * @param  {object} options
 * @return {[type]}
 */
function shiny(object, options = {}) {
  if (object === null || typeof object !== 'object') {
    throw new Error('can only shine objects');
  }

  const allow = allowance.reduce((acc, rule) => {
    const isAllowed = !bool(options[`no${rule.id}`], rule.defaultValue);
    if (options.debug) {
      console.log(`${rule.id} is ${isAllowed ? 'allowed' : 'not allowed'}`);
    }
    acc[rule.id] = isAllowed;
    return acc;
  }, {});

  const isAllowed = (rule, val) => {
    const isDirty = rule.isDirty(val);
    if (options.debug) {
      console.log(`${rule.id} says ${isDirty ? 'dirty' : 'clean'}`);
    }
    return allow[rule.id] || !isDirty;
  };

  const clean = (obj) =>
    Object.keys(obj).reduce((acc, key) => {
      let val = obj[key];

      if (options.debug) {
        if (typeof val === 'object') {
          console.log(`-> ${JSON.stringify(val)}`);
        } else if (typeof val === 'string') {
          console.log(`-> '${val}'`);
        } else {
          console.log(`-> ${val}`);
        }
      }

      if (val !== null && typeof val === 'object') {
        val = clean(val);
      }

      if (allowance.every((rule) => isAllowed(rule, val))) {
        acc[key] = val;
      }

      return acc;
    }, Array.isArray(obj) ? [] : {});

  return clean(object);
}

export default shiny;
