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

const element = document.querySelector('main');

if (element) {
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
} else {
  console.log('READING-TIME: No element found');
}
