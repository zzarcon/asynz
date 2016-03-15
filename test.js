import asynz from './asynz';
import tapeTest from 'tape';

function before() {
  delete window.jQuery;

  let scripts = [...document.querySelectorAll('body script')];
  
  scripts.forEach(s => s.remove());
};


function test(title, cb) {
  tapeTest(title, (...args) => {
    before();
    cb(...args);
  });
}

test('Loading jquery', (assert) => {
  const src = 'https://code.jquery.com/jquery-2.2.1.js';

  assert.pass(!window.jQuery);

  asynz(src).then(() => {
    assert.pass(!!window.jQuery);

    assert.end();
  });
});

test('Cache: loads the script for the first time', () => {
  console.log(window.jQuery);
});

test('Cache: dont load the script if was already loaded', () => {

});

test('Add the proper attributes to the script', () => {

});