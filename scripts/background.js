const actionableUrls = [
  'https://developer.mozilla.org/en-US/docs/',
  'https://developer.chrome.com/docs',
  'https://www.linkedin.com/in/',
];

const uninstallURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfNe4fiUzctMnMbTf_igA-UKbve3bPch4cJWcJHWIdbUdXfLw/viewform?usp=pp_url&entry.726004286=I+uninstalled+it+because...';

// todo: set up a bundler and/or resolve ES6 bug with Chrome and then replace the above with imports

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'pages/onboarding.html' });
    chrome.runtime.setUninstallURL(uninstallURL);
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  if (actionableUrls.some((url) => tab.url.startsWith(url))) {
    // const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // const nextState = prevState === 'On' ? 'Off' : 'On';
    // await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });
  }
});
