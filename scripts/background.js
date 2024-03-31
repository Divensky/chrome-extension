chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'pages/onboarding.html' });
    chrome.runtime.setUninstallURL(
      'https://docs.google.com/forms/d/e/1FAIpQLSfNe4fiUzctMnMbTf_igA-UKbve3bPch4cJWcJHWIdbUdXfLw/viewform?usp=pp_url&entry.726004286=I+uninstalled+it+because...'
    );
  }
});

const actionableUrls = [
  'https://developer.mozilla.org/en-US/docs/',
  'https://www.linkedin.com/in/',
];

chrome.action.onClicked.addListener(async (tab) => {
  if (actionableUrls.some((url) => tab.url.startsWith(url))) {
    // const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // const nextState = prevState === 'On' ? 'Off' : 'On';
    // await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });

  }
});
