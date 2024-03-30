chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'Off' });
  chrome.tabs.create({ url: 'pages/onboarding.html' });
});

chrome.runtime.setUninstallURL(
  'https://docs.google.com/forms/d/e/1FAIpQLSfNe4fiUzctMnMbTf_igA-UKbve3bPch4cJWcJHWIdbUdXfLw/viewform?usp=pp_url&entry.726004286=I+uninstalled+it+because...'
);
