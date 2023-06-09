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

    const sourceNodeId = window.SJFI_data.graphObjects.find(obj => obj.label === object.source).id;
    const targetNodeId = window.SJFI_data.graphObjects.find(obj => obj.label === object.target).id;

    const sourceNodeIdInput = document.getElementById('source-node-id');
    sourceNodeIdInput.value = sourceNodeId;
    const targetNodeIdInput = document.getElementById('target-node-id');
    targetNodeIdInput.value = targetNodeId;

  }

  window.editingIndex = window.SJFI_data.graphObjects.findIndex(obj => obj.id === object.id);

  document.getElementById('submit-add_object-button').textContent = 'Update Object';
}

function removeObject(object) {
  const index = window.SJFI_data.graphObjects.indexOf(object);
  if (index > -1) {
    window.SJFI_data.graphObjects.splice(index, 1);
    //storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data, true);
    localStorage.setItem(window.SJFI_storageKey, JSON.stringify(window.SJFI_data));
  }
}