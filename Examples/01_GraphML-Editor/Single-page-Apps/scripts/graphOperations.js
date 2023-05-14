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

window.updateTitle = function(debug = false) {
  const titleInput = document.getElementById('graph-title');
  titleInput.value = window.graphTitle;
}

window.saveTitle = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] saveTitle(" + storageKey + ") called");
  localStorage.setItem(`${storageKey}_title`, window.graphTitle);
};

window.loadTitle = function(storageKey, debug = false) {
  console.log("[SJFI] [DEBUG] loadTitle(" + storageKey + ") called");
  const storedTitle = localStorage.getItem(`${storageKey}_title`);
  if (storedTitle) {
    window.graphTitle = storedTitle;
    window.updateTitle();
  }
};

window.resetTitle = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetTitle(" + storageKey + ") called");
  localStorage.removeItem(`${storageKey}_title`);
  window.graphTitle = "";
  window.updateTitle();
};