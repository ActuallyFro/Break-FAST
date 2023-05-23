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

  storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
}



/*
  updateGraphSettings -- load window.SJFI_data into the form
  saveGraphSettings   -- saves the form into window.SJFI_data & reprintGraphMLFile()
  resetGraphSettings  -- clears the form & window.SJFI_data & MISSING: reprintGraphMLFile()
*/

window.updateGraphSettings = function(debug = false) {
  const titleInput = document.getElementById('graph-title');
  const directionalitySelect = document.getElementById('graph-directionality');

  if (typeof window.SJFI_data.graphSettingsTitle !== "string"){
    window.SJFI_data.graphSettingsTitle = "";
  }

  if (window.SJFI_data.graphSettingsDirectionality !== "directed" && window.SJFI_data.graphSettingsDirectionality !== "undirected"){
    directionalitySelect.value = "directed"
  }

  storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
}

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