async function checkPermission(permission) {
  return await chrome.permissions.contains({ permissions: [permission] });
}

const DEFAULT = {
  mdnDocs: true,
  chromeDocs: true,
  linkedIn: false,
};

document.addEventListener('DOMContentLoaded', async () => {
  const hasStoragePermission = await checkPermission('storage');

  const websiteCheckboxes = document.querySelectorAll('.js-checkbox');

  websiteCheckboxes.forEach(function (checkbox) {
    chrome.storage?.sync?.get(checkbox.value, (data) => {
      console.log(
        'options: data from storage for',
        checkbox.value,
        ' value is: ',
        data[checkbox.value]
      );
      checkbox.checked =
        data[checkbox.value] !== undefined
          ? data[checkbox.value]
          : DEFAULT[checkbox.value];
    });

    checkbox.addEventListener('change', function () {
      console.log('clicked the checkbox', checkbox);
      const resource = checkbox.value;
      const enabled = checkbox.checked;
      const data = {};
      data[resource] = enabled;

      if (hasStoragePermission) {
        chrome.storage.sync.set(data);
        console.log(
          'Options: checkbox value changed with storage permission, new value:',
          data
        );
      } else {
        chrome.permissions.request(
          { permissions: ['storage'] },
          function (granted) {
            if (granted) {
              chrome.storage.sync.set(data);
              console.log(
                'Options: permission granted and checkbox value changed:',
                data
              );
            } else {
              console.log('Sorry, no permission');
            }
          }
        );
      }
    });
  });
});
