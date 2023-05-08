//---------------------------
// Objects
//---------------------------
// window.addObject = function(graphType, data) {
//   const objectId = `${graphType}_${window.graphObjects.length}`;
//   const objectData = { id: objectId, type: graphType, ...data };
//   window.graphObjects.push(objectData);
//   saveFunction(window.SJFI_storageKey);
// }

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



//Commenting out to re-baseline
// // 1.1.5 Implement Automatic Key Creation feature (stretch goal)
// function autoKeyCreationLogic() {
//   console.log("1.1.5.1 Develop logic for automatic key creation");
// }

// function autoKeyCreationFeedback() {
//   console.log("1.1.5.2 Incorporate feedback from stakeholders");
// }

// //---------------------------
// // Add
// //---------------------------
// // 1.1.1 Implement Add Node feature
// function addNodeUI() {
//   console.log("1.1.1.1 Develop user interface for adding nodes");
// }


// function addNodeLogic() {
//   console.log("1.1.1.2 Implement logic for adding nodes to graph");
// }

// // 1.1.4 Implement Add Edge feature
// function addEdgeUI() {
//   console.log("1.1.4.1 Develop user interface for adding edges");
// }

// function addEdgeLogic() {
//   console.log("1.1.4.2 Implement logic for adding edges to graph");
// }

// //---------------------------
// // Delete
// //---------------------------
// // 1.1.3 Implement Delete Node feature
// function deleteNodeUI() {
//   console.log("1.1.3.1 Develop user interface for deleting nodes");
// }

// function deleteNodeLogic() {
//   console.log("1.1.3.2 Implement logic for deleting nodes from graph");
// }

// //---------------------------
// // Move?
// //---------------------------
// // 1.1.2 Implement Edit Node feature
// // Moved to graphEditing.js