# Shiny Object

Make your objects shine by cleaning off all the dirt. (eg. undefined, empty objects)

## Usage

```javascript
import shiny from 'shiny-object'

var obj = {
  string: '',
  nill: null,
  undef: undefined,
  arr: [{ // this whole bit will recursively be removed
    key: ''
  }],
  fn: () => ({ somethingSomething() }),
  clean: 'value',
}

// obj is not mutated
shiny(obj, {
  // all allowance options default to false
  allowUndefined: false,
  allowNulls: false,
  allowFunctions: false,
  allowEmptyStrings: false,
  allowEmptyArrays: false,
  allowEmptyObjects: false,
})

//> { clean: 'value' }

```

### ES5

```javascript
var shiny = require('shiny-object/es5');
```
