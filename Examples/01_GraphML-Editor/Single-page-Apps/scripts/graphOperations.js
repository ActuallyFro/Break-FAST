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

window.updateGraphSettings = function(debug = false) {
  const titleInput = document.getElementById('graph-title');
  const directionalitySelect = document.getElementById('graph-directionality');
  // const directionalityValue = directionalitySelect.options[directionalitySelect.selectedIndex].value;

  titleInput.value = window.graphTitle;
  directionalitySelect.value = window.graphDirectionality;
}

window.saveGraphSettings = function(storageKey, debug = false) {
  if (debug) console.log("[DEBUG] saveGraphSettings(" + storageKey + ") called");
  localStorage.setItem(`${storageKey}_title`, window.graphTitle);
  localStorage.setItem(`${storageKey}_directionality`, window.graphDirectionality);

  reprintGraphMLFile();
};

window.loadGraphSettings = function(storageKey, debug = false) {
  let needToUpdate = false;
  console.log("[DEBUG] loadGraphSettings(" + storageKey + ") called");
  const storedTitle = localStorage.getItem(`${storageKey}_title`);
  const storedDirectionality = localStorage.getItem(`${storageKey}_directionality`);
  
  if (storedTitle) {
    window.graphTitle = storedTitle;
    needToUpdate = true;
  }

  if (storedDirectionality) {
    window.graphDirectionality = storedDirectionality;
    needToUpdate = true;
  }

  if (needToUpdate) {
    window.updateGraphSettings();
  }
};

window.resetGraphSettings = function(storageKey, debug = false) {
  if (debug) console.log("[DEBUG] resetGraphSettings(" + storageKey + ") called");
  localStorage.removeItem(`${storageKey}_title`);
  localStorage.removeItem(`${storageKey}_directionality`);
  window.graphTitle = "";
  window.graphDirectionality = "directed";
  window.updateGraphSettings();
};