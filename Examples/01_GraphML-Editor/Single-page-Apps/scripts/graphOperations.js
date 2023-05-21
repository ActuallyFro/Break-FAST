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

  storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
}

/*
  updateGraphSettings -- load window.SJFI_data into the form
  saveGraphSettings   -- saves the form into window.SJFI_data & reprintGraphMLFile()
  resetGraphSettings  -- clears the form & window.SJFI_data & MISSING: reprintGraphMLFile()
*/

// window.updateGraphSettings = function(debug = false) {
//   const titleInput = document.getElementById('graph-title');
//   const directionalitySelect = document.getElementById('graph-directionality');

//   titleInput.value = window.SJFI_data.graphSettingsTitle;
//   directionalitySelect.value = window.SJFI_data.graphSettingsDirectionality;
// }

// window.saveGraphSettings = function(storageKey, debug = false) {
//   if (debug) console.log("[DEBUG] saveGraphSettings(" + storageKey + ") called -- THIS SHOULD BE REMOVED -- graphObjects and graphSettings are NOT separate anymore!");
//   // alert("saveGraphSettings() not reimplemented yet! -- just save the window.SJFI_data");

//   storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
//   reprintGraphMLFile();
// };

// window.resetGraphSettings = function(storageKey, debug = false) {
//   if (debug) console.log("[DEBUG] resetGraphSettings(" + storageKey + ") called");

//   window.SJFI_data.graphSettingsTitle = "";
//   window.SJFI_data.graphSettingsDirectionality = "directed";

//   storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
  
//   window.updateGraphSettings();
// };