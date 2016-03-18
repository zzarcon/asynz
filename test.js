import asynz from './asynz';
import tapeTest from 'tape';

const src = 'https://code.jquery.com/jquery-2.2.1.js';

function before() {
  delete window.jQuery;

  let scripts = [...scriptsNumber()];
  
  scripts.forEach(s => s.remove());
};

test('Loading jquery', assert => {
  assert.pass(!window.jQuery);

  asynz(src).then(() => {
    assert.pass(!!window.jQuery);
    assert.end();
  });
});

test('Cache: loads the script for the first time', assert => {
  assert.pass(scriptsNumber().length === 0);

  asynz(src).then(() => {    
    assert.pass(scriptsNumber().length === 1);    
    assert.end();
  });
});

test('Cache: dont load the script if was already loaded', assert => {
  assert.pass(scriptsNumber().length === 0);

  asynz(src).then(() => {    
    assert.pass(scriptsNumber().length === 1);    

    asynz(src).then(() => {
      assert.pass(scriptsNumber().length === 1);    
      assert.end();
    });
  });
});

test('Add the proper attributes to the script', assert => {
  const zeptoSrc = 'http://zeptojs.com/zepto.js';
  const id = 'zepto';
  const attrs = {
    id,
    async: true,
    defer: true,
    foo: 'bar',
    'data-api-key': 123
  };

  asynz(zeptoSrc, attrs).then(() => {    
    let script = document.getElementById(id);

    assert.pass(script.getAttribute('id') === id);
    assert.pass(script.getAttribute('foo') === 'bar');
    assert.pass(script.getAttribute('data-api-key') === 123);
    assert.pass(script.async === true);
    assert.pass(script.defer === true);
    assert.end();
  });
});

test('The promise should reject if the script doesnt load', assert => {
  const erroredSrc = 'foourl';

  asynz(erroredSrc).catch(() => {    
    assert.pass(true);
    assert.end();
  });
});

function scriptsNumber() {
  return document.querySelectorAll('body script');
}

function test(title, cb) {
  tapeTest(title, (...args) => {
    before();
    cb(...args);
  });
}