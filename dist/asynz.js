(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.asynz = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var attrWhitelist = ['async', 'defer'];
  var cache = {};

  function onload(src, resolve) {
    cache[src] = true;

    return resolve;
  }

  function setAttrs(script, attrs) {
    Object.keys(attrs).forEach(function (key) {
      var value = attrs[key];

      if (attrWhitelist.includes(key)) {
        script[key] = value;
      } else {
        script.setAttribute(key, value);
      }
    });
  }

  module.exports = function (src) {
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return new Promise(function (resolve, reject) {
      var isAlreadyLoaded = cache[src];
      if (isAlreadyLoaded) return resolve();

      var script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = src;
      script.onload = onload(src, resolve);
      script.onerror = reject;

      setAttrs(script, attrs);

      document.body.appendChild(script);
    });
  };
});
