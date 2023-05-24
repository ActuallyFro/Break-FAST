//---------------------------
// Objects
//---------------------------
window.addObjectOrUpdate = function(objectId, graphType, data) {
  const objectData = { id: objectId, type: graphType, ...data };
  window.SJFI_data.graphObjects = window.SJFI_data.graphObjects || [];
  const existingIndex = window.SJFI_data.graphObjects.findIndex(obj => obj.id === objectId);

  if (existingIndex !== -1) {
    window.SJFI_data.graphObjects[existingIndex] = objectData;
  } else {
    window.SJFI_data.graphObjects.push(objectData);
  }

    //storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data, true);
    localStorage.setItem(window.SJFI_storageKey, JSON.stringify(window.SJFI_data));
}

