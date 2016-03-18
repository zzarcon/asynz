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