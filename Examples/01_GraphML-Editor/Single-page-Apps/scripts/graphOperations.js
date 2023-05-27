//---------------------------
// Objects
//---------------------------
window.addObjectOrUpdate = function(objectId, graphType, data) {
  let defaultNodeRenderSettings = [
    {
      labelOffsetX: 0,
      labelOffsetY: 0,
      fillColor: "#00b4f0",
      labelFontSize: 12,
      labelColor: "black",
      outlineColor: "black",
      radiusSize: 20,
      nodeColor: "#00b4f0",
      nodeColorOutline: "black",
      labelAnchor: "middle"
    }
  ];

  let defaultEdgeRenderSettings = [
    {
      labelOffsetX: 0,
      labelOffsetY: 0,
      fillColor: "black",
      labelFontSize: 12,
      labelColor: "#aaa"
    }
  ];

  // const objectData = { id: objectId, type: graphType, ...data };
  let objectData = {};
  
  if (graphType === 'node') {
    objectData = { id: objectId, type: graphType, renderSettings: defaultNodeRenderSettings, ...data };
  } else {  // else if (graphType === 'edge') {
    objectData = { id: objectId, type: graphType, renderSettings: defaultEdgeRenderSettings, ...data };
  }

  // { id: objectId, type: graphType, renderSettings: defaultRenderSettings, ...data };

  window.SJFI_data.graphObjects = window.SJFI_data.graphObjects || [];
  const existingIndex = window.SJFI_data.graphObjects.findIndex(obj => obj.id === objectId);


  if (existingIndex !== -1) {
    window.SJFI_data.graphObjects[existingIndex] = objectData;
  } else {
    window.SJFI_data.graphObjects.push(objectData);
  }

    storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
}

