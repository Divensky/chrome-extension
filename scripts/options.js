async function checkPermission(permission) {
  return await chrome.permissions.contains({ permissions: [permission] });
}

const DEFAULT = {
  enableMdn: true,
};

document.addEventListener('DOMContentLoaded', async () => {
  const hasStoragePermission = await checkPermission('storage');

  const enableMdnElement = document.getElementById('enableMdn');
  if (!enableMdnElement) {
    return;
  }

  chrome.storage?.sync?.get('enableMdn', (data) => {
    console.log('options: data from storage', data.enableMdn);
    enableMdnElement.checked =
      data.enableMdn !== undefined ? data.enableMdn : DEFAULT.enableMdn;
  });

  enableMdnElement.addEventListener('change', function () {
    if (hasStoragePermission) {
      chrome.storage.sync.set({ enableMdn: enableMdnElement.checked });
      console.log(
        'Options: checkbox value changed with storage permission, new value:',
        enableMdnElement.checked
      );
    } else {
      chrome.permissions.request(
        { permissions: ['storage'] },
        function (granted) {
          if (granted) {
            chrome.storage.sync.set({ enableMdn: enableMdnElement.checked });
            console.log(
              'Options: permission granted and checkbox value changed to:',
              enableMdnElement.checked
            );
          } else {
            console.log('Sorry, no permission');
          }
        }
      );
    }
  });
});
