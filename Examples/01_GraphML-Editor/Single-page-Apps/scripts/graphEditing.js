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
    const edgeKeyInput = document.getElementById('edge-key');
    edgeKeyInput.value = object.key;
    const edgeValueInput = document.getElementById('edge-value');
    edgeValueInput.value = object.value;
    const sourceNodeInput = document.getElementById('source-node');
    sourceNodeInput.value = object.source;
    const targetNodeInput = document.getElementById('target-node');
    targetNodeInput.value = object.target;

  //Loop thru nodes to find id -- source-node-id & target-node-id
    const sourceNodeId = window.graphObjects.find(obj => obj.label === object.source).id;
    const targetNodeId = window.graphObjects.find(obj => obj.label === object.target).id;

    const sourceNodeIdInput = document.getElementById('source-node-id');
    sourceNodeIdInput.value = sourceNodeId;
    const targetNodeIdInput = document.getElementById('target-node-id');
    targetNodeIdInput.value = targetNodeId;

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