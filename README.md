# asynz [![Build Status](https://travis-ci.org/zzarcon/asynz.svg?branch=master)](https://travis-ci.org/zzarcon/asynz) [![npm version](https://badge.fury.io/js/asynz.svg)](https://badge.fury.io/js/asynz) [![Bower version](https://badge.fury.io/bo/asynz.svg)](http://badge.fury.io/bo/asynz) [![Dependency Status](https://david-dm.org/zzarcon/asynz.svg)](https://david-dm.org/zzarcon/asynz) [![npm license](https://img.shields.io/npm/l/awesome-badges.svg)](https://www.npmjs.org/package/awesome-badges)
  > Hipster way of load async script in the browser

Just a **tiny** module to load scripts in the browser. It also has support for script attributes and cache.

### Install
`$ npm i asynz`

`$ bower i asynz`

### Example: loading a dynamic library

```javascript
import asynz from "asynz";

loadLibrary('https://code.jquery.com/jquery-2.2.1.js');

async loadLibrary(src) {
  console.log(typeof window.jQuery === "undefined");
  let script = await asynz(src);
  
  $('body').html('jQuery is now available');
}
```

### Passing attributes
```javascript
const src = 'https://code.jquery.com/jquery-2.2.1.js';
const attrs = {
  id: 'jquery',
  async: true,
  defer: true,
  foo: 'bar',
  'data-api-key': 123
};

let script = await asynz(src, attrs);

console.log($('#jquery').attr('data-api-key') === 123);
```

Notice that when you pass `script` properties like **async** or **defer**, azync won't add them as an attribute, instead will set the value directly to the script, e.g. `script.async === true`


### Error handling
One of the cool things of the async functions, is that you can handle errors like it was synchronous code.

```javascript
const erroredSrc = 'http://foourl';

try {
  await asynz(erroredSrc);
  // Do stuff
} catch(e) {
  console.log('Error :(', e);
}
```

### Promise style
You can also use Promise style if you prefer

```javascript
import asynz from "asynz"
const src = 'https://code.jquery.com/jquery-2.2.1.js';

asynz(src).then(script => {
  console.log(jQuery);
}).catch(console.log.bind(console));
```

### Miscellaneous

In order to use [async functions](https://ponyfoo.com/articles/understanding-javascript-async-await) today you will need to install/include some stuff in your build process

**Needed packages**
```
$ npm i babel-cli babel-polyfill babel-plugin-transform-async-to-generator babel-preset-es2015 babel-preset-stage-0 --save-dev
```

**.babelrc**
```json
{
  "presets": ["es2015", "stage-0"],
  "plugins": ["transform-async-to-generator"]
}
```

**Include in your source**
```javascript
require("babel-core/register");
require("babel-polyfill");
```

