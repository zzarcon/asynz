const attrWhitelist = ['async', 'defer']
let cache = {};

function onload(src, resolve) {
  cache[src] = true;

  return resolve;
}

function setAttrs(script, attrs) {
  Object.keys(attrs).forEach(key => {
    let value = attrs[key];

    if (attrWhitelist.includes(key)) {
      script[key] = value;
    } else {
      script.setAttribute(key, value);
    }
  });
}

export default (src, attrs = {}) => {
  return new Promise((resolve, reject) => {
    const isAlreadyLoaded = cache[src];
    if (isAlreadyLoaded) return resolve();

    let script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = src;
    script.onload = onload(src, resolve);
    script.onerror = reject;

    setAttrs(script, attrs);
    
    document.body.appendChild(script);
  });
};