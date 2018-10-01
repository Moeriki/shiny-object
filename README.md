# Shiny Object

Make your objects shine by cleaning off all the dirt. (eg. undefined, empty objects)

## Usage

```javascript
const shiny = require('shiny-object');

// input is not mutated
shiny(
  {
    string: '',
    nill: null,
    undef: undefined,
    arr: [{ key: '' }],
    fn: () => ({ func: () => {} }),
    clean: 'value',
  },
  {
    // All options default to false
    noUndefined: true,
    noNull: true,
    noFunction: true,
    noEmptyString: true,
    noEmptyArray: true,
    noEmptyObject: true,
  }
); // { clean: 'value' }
```
