function calculateReadingTime(element) {
  const text = element.textContent;
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  return readingTime;
}

function createBadge(readingTime) {
  const badge = document.createElement('span');
  badge.textContent = ` ⏱️ ${readingTime} min read`;
  return badge;
}

function insertBadge(element, badge) {
  const heading = element.querySelector('h1');
  if (heading) {
    heading.insertAdjacentElement('afterEnd', badge);
  } else {
    console.log('READING-TIME: No h1 found');
  }
}

function processPage() {
  let readingTime = calculateReadingTime(element);
  console.log('READING-TIME: calculated value ', readingTime);
  if (readingTime === 0) {
    console.log('READING-TIME: Did not find any text, retrying...');
    setTimeout(() => {
      readingTime = calculateReadingTime(element);
      console.log('READING-TIME: After retrying got', readingTime);
      const badge = createBadge(readingTime);
      insertBadge(element, badge);
    }, 3000);
  } else {
    const badge = createBadge(readingTime);
    insertBadge(element, badge);
  }
}

const element = document.querySelector('main');

const DEFAULT = {
  enableMdn: true,
};

console.log('chrome.storage', chrome.storage, chrome.storage?.sync);
const hasStorage = chrome.storage;

if (element && !hasStorage && DEFAULT.enableMdn) {
  processPage();
} else if (element && hasStorage) {
  chrome.storage?.sync?.get('enableMdn', (data) => {
    console.log('value from storage', data.enableMdn);
    enableMdn =
      data.enableMdn !== undefined ? data.enableMdn : DEFAULT.enableMdn;

    if (element && enableMdn) {
      processPage();
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
