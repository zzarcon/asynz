let cache = {};

function onload(src, resolve) {
  cache[src] = true;

  return resolve;
}

export default (src, attrs = {}) => {
  return new Promise((resolve) => {
    const isAlreadyLoaded = cache[src];
    if (isAlreadyLoaded) return resolve();

    let script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = src;

    Object.keys(attrs).forEach(key => {
      script.setAttribute(key, attrs[key]);
    });

    script.onload = onload(src, resolve);

    document.body.appendChild(script);
  });
};