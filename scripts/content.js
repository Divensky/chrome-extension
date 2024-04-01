const DEFAULT = {
  mdnDocs: true,
  chromeDocs: true,
  linkedIn: false,
};

const actionableUrls = [
  'https://developer.mozilla.org/en-US/docs/',
  'https://developer.chrome.com/docs',
  'https://www.linkedin.com/in/',
];

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

function getResourceNameAndValue(currentUrl, actionableUrls, DEFAULT) {
  let resource = null;
  let enabledDefault = false;
  actionableUrls.forEach((url, index) => {
    if (currentUrl.startsWith(url)) {
      resource = Object.keys(DEFAULT)[index];
      enabledDefault = DEFAULT[resource];
    }
  });
  return { resource, enabledDefault };
}

// todo: set up a bundler and/or resolve ES6 bug with Chrome and then replace the above with imports

const element = document.querySelector('main');
const hasStorage = chrome.storage;
const currentUrl = window.location.href;
const { resource, enabledDefault } = getResourceNameAndValue(
  currentUrl,
  actionableUrls,
  DEFAULT
);
console.log(
  'We got these values from the resource name:',
  resource,
  enabledDefault
);

if (element && !hasStorage && enabledDefault) {
  processPage(element);
} else if (element && hasStorage) {
  chrome.storage.sync?.get(resource, (data) => {
    console.log('READING-TIME: value from storage', data[resource]);
    const isEnabled =
      data[resource] !== undefined ? data[resource] : enabledDefault;

    if (element && isEnabled) {
      processPage(element);
    } else {
      console.log(
        'READING-TIME: Nothing done. The enabled value is',
        isEnabled,
        'on the element:',
        element
      );
    }
  });
} else {
  console.log('READING-TIME: The current url is disabled by default');
}
