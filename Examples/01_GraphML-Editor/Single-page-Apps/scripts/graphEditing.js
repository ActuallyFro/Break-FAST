// 1.2.1 Implement Edit Node feature
// Reuse editNodeUI() and editNodeLogic() from 1.1.2

// 1.2.1 Implement Edit Node feature
// Reuse editNodeUI() and editNodeLogic() from 1.1.2

function editObject(object) {
  document.getElementById('object-id').value = object.id;
  
  const graphTypeSelect = document.getElementById('graph-type');
  graphTypeSelect.value = object.type;
  toggleObjectTypeFields();

  if (object.type === 'node') {
    const nodeLabelInput = document.getElementById('node-label');
    nodeLabelInput.value = object.label;

    const nodeProperties = object.properties || [];
    const nodePropertiesDiv = document.getElementById('node-properties');
    nodePropertiesDiv.innerHTML = '';

    for (const property of nodeProperties) {
      nodePropertiesDiv.appendChild(createPropertyInput(property));
    }
  } else {
    const edgeLabelInput = document.getElementById('edge-label');
    edgeLabelInput.value = object.label;
    const sourceNodeInput = document.getElementById('source-node');
    sourceNodeInput.value = object.source;
    const targetNodeInput = document.getElementById('target-node');
    targetNodeInput.value = object.target;
  }

  // Set editingIndex to the index of the object being edited
  window.editingIndex = window.graphObjects.findIndex(obj => obj.id === object.id);

  document.getElementById('submit-button').textContent = 'Update Object';
}

function removeObject(object) {
  const index = graphObjects.indexOf(object);
  if (index > -1) {
    graphObjects.splice(index, 1);
    saveFunction(window.SJFI_storageKey);
  }
}

//Commenting out to re-baseline
// function editNodeUI() {
//   console.log("1.1.2.1 Develop user interface for editing nodes");
// }

// function editNodeLogic() {
//   console.log("1.1.2.2 Implement logic for editing nodes in graph");
// }

// // 1.2.2 Implement Delete Node feature
// function deleteNodeWithDependenciesUI() {
//   console.log("1.2.2.1 Develop user interface for deleting nodes");
// }

// function deleteNodeWithDependenciesLogic() {
//   console.log("1.2.2.2 Implement logic for deleting nodes from graph, and handle dependencies");
// }

// // 1.2.3 Implement Edit Edge feature
// function editEdgeUI() {
//   console.log("1.2.3.1 Develop user interface for editing edges");
// }

// function editEdgeLogic() {
//   console.log("1.2.3.2 Implement logic for editing edges in graph");
// }

// // 1.2.4 Implement Delete Edge feature
// function deleteEdgeUI() {
//   console.log("1.2.4.1 Develop user interface for deleting edges");
// }

// function deleteEdgeLogic() {
//   console.log("1.2.4.2 Implement logic for deleting edges from graph");
// }

// // 1.2.5 Implement Save Progress feature
// function saveProgressLogic() {
//   console.log("1.2.5.1 Implement logic for saving progress of graph edits");
// }

// function saveProgressFeedback() {
//   console.log("1.2.5.2 Incorporate feedback from stakeholders");
// }

// // 1.2.6 Implement Load Progress feature
// function loadProgressLogic() {
//   console.log("1.2.6.1 Implement logic for loading progress of graph edits");
// }

// function loadProgressFeedback() {
//   console.log("1.2.6.2 Incorporate feedback from stakeholders");
// }

// // 1.2.7 Implement Undo/Redo Actions feature
// function undoRedoActionsUI() {
//   console.log("1.2.7.1 Develop user interface for undoing and redoing actions");
// }

// function undoRedoActionsLogic() {
//   console.log("1.2.7.2 Implement logic for undoing and redoing actions in graph");
// }

// // 1.2.6 Implement Load Progress feature
// // ...

// // 1.2.7 Implement Undo/Redo Actions feature
// // ...

// // 1.2.5 Implement Save Progress feature
// function saveProgressLogic() {
//   console.log("1.2.5.1 Implement logic for saving progress of graph edits");
// }
