//---------------------------
// Objects
//---------------------------
window.addObjectOrUpdate = function(objectId, graphType, data) {
  // Check if objectId is empty and generate a new ID based on the object count
  if (!objectId) {
    objectId = `${graphType}_${window.SJFI_data.graphObjects.length}`;
  }

  const objectData = { id: objectId, type: graphType, ...data };
  const existingIndex = window.SJFI_data.graphObjects.findIndex(obj => obj.id === objectId);

  if (existingIndex !== -1) {
    // Update existing object
    window.SJFI_data.graphObjects[existingIndex] = objectData;
  } else {
    // Add new object
    window.SJFI_data.graphObjects.push(objectData);
  }

  saveFunction(window.SJFI_storageKey, window.SJFI_data);
}

window.updateGraphSettings = function(debug = false) {
  const titleInput = document.getElementById('graph-title');
  const directionalitySelect = document.getElementById('graph-directionality');
  // const directionalityValue = directionalitySelect.options[directionalitySelect.selectedIndex].value;

  titleInput.value = window.SJFI_data.graphSettingsTitle;
  directionalitySelect.value = window.SJFI_data.graphSettingsDirectionality;
}

window.saveGraphSettings = function(storageKey, debug = false) {
  if (debug) console.log("[DEBUG] saveGraphSettings(" + storageKey + ") called");
  // localStorage.setItem(`${storageKey}_title`, window.SJFI_data.graphSettingsTitle);
  // localStorage.setItem(`${storageKey}_directionality`, window.SJFI_data.graphSettingsDirectionality);
  // window.SJFI_data
  // alert  message: FIX
  alert("saveGraphSettings() not reimplemented yet! -- just save the window.SJFI_data");

  reprintGraphMLFile();
};

window.loadGraphSettings = function(storageKey, debug = false) {
  let needToUpdate = false;
  if (debug) console.log("[DEBUG] loadGraphSettings(" + storageKey + ") called");
  // const storedTitle = localStorage.getItem(`${storageKey}_title`);
  // const storedDirectionality = localStorage.getItem(`${storageKey}_directionality`);
  
  //window.SJFI_data = JSON.parse(localStorage.getItem(storageKey));

  // if (storedTitle) {
  //   // window.graphTitle = storedTitle;
  //   needToUpdate = true;
  // }

  // if (storedDirectionality) {
  //   // window.graphDirectionality = storedDirectionality;
  //   needToUpdate = true;
  // }

  // if (needToUpdate) {
    alert("loadGraphSettings() not reimplemented yet! -- just load the window.SJFI_data");
    window.updateGraphSettings();
  // }
};

window.resetGraphSettings = function(storageKey, debug = false) {
  if (debug) console.log("[DEBUG] resetGraphSettings(" + storageKey + ") called");
  // localStorage.removeItem(`${storageKey}_title`);
  // localStorage.removeItem(`${storageKey}_directionality`);

  // window.graphTitle = "";
  window.SJFI_data.graphSettingsTitle = "";
  // window.graphDirectionality = "directed";
  window.SJFI_data.graphSettingsDirectionality = "directed";

  //alert("resetGraphSettings() not reimplemented yet! -- just reset the window.SJFI_data");
  //Do something like -- using the values above, then kick it out to "localStorage saveFunction()"
  saveFunction(window.SJFI_storageKey, window.SJFI_data);
  
  window.updateGraphSettings();
};