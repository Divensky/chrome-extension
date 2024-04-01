const DEFAULT = {
  enableMdn: true,
};

function calculateReadingTime(element) {
  const text = element.textContent;
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  return readingTime;
}

function createSnippet(readingTime) {
  const snippet = document.createElement('span');
  snippet.textContent = ` ⏱️ ${readingTime} min read`;
  return snippet;
}

function insertSnippet(element, snippet) {
  const heading = element.querySelector('h1');
  if (heading) {
    heading.insertAdjacentElement('afterEnd', snippet);
  } else {
    console.log(
      'READING-TIME: could not insert snippet - insertion spot not found'
    );
  }
}

function processPage(element) {
  const readingTime = calculateReadingTime(element);
  const snippet = createSnippet(readingTime);
  insertSnippet(element, snippet);
}

// todo: set up a bundler and/or resolve ES6 bug with Chrome and then replace the above with imports

const element = document.querySelector('main');
const hasStorage = chrome.storage;

if (element && !hasStorage && DEFAULT.enableMdn) {
  processPage(element);
} else if (element && hasStorage) {
  chrome.storage?.sync?.get('enableMdn', (data) => {
    console.log('value from storage', data.enableMdn);
    enableMdn =
      data.enableMdn !== undefined ? data.enableMdn : DEFAULT.enableMdn;

    if (element && enableMdn) {
      processPage(element);
    } else {
      console.log(
        'READING-TIME: Nothing done. The element is',
        element,
        'and enabled is:',
        enableMdn
      );
    }
  });
}
