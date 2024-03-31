document.addEventListener('DOMContentLoaded', async () => {
  async function checkPermission(permission) {
    return await chrome.permissions.contains({ permissions: [permission] });
  }

  const hasStoragePermission = await checkPermission('storage');

  console.log('storage permission at Options start:', hasStoragePermission);
  //TODO: remove console.logs
  // TODO: convert to modules and move permission code to a module
  const DEFAULT = {
    enableMdn: true,
  };

  const hasStorage = chrome.storage;
  console.log('options: chrome.storage', chrome.storage);

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
    console.log(
      'options: checkbox clicked, new value',
      enableMdnElement.checked
    );
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
