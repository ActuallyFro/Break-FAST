//---------------------------
// Objects
//---------------------------
window.addObjectOrUpdate = function(objectId, graphType, data) {
  // Check if objectId is empty and generate a new ID based on the object count
  if (!objectId) {
    objectId = `${graphType}_${window.graphObjects.length}`;
  }

  const objectData = { id: objectId, type: graphType, ...data };
  const existingIndex = window.graphObjects.findIndex(obj => obj.id === objectId);

  if (existingIndex !== -1) {
    // Update existing object
    window.graphObjects[existingIndex] = objectData;
  } else {
    // Add new object
    window.graphObjects.push(objectData);
  }

  saveFunction(window.SJFI_storageKey);
}

