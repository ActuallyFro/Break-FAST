//---------------------------
// UI
//---------------------------
function OperationsUIObjectsFormSetup() {
  console.log("#.#.#.# Develop user interface for adding objects");

  const graphTypeDropdown = document.getElementById('graph-type');
  graphTypeDropdown.addEventListener('change', () => {
    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = 'Add Object';
    window.editingIndex = null;
    toggleObjectTypeFields();
  });
  
  const addPropertyButton = document.getElementById('add-property-button');
  addPropertyButton.addEventListener('click', () => {
    const nodeProperties = document.getElementById('node-properties');
    nodeProperties.appendChild(createPropertyInput());
  });

  const form = document.getElementById('graph-object-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const graphType = document.getElementById('graph-type').value;
    const objectId = document.getElementById('object-id').value;

    if (graphType === 'node') {
      const nodeLabel = document.getElementById('node-label').value;
      const nodePropertiesDiv = document.getElementById('node-properties');
      const propertyInputs = nodePropertiesDiv.getElementsByClassName('property-input');
      const properties = [];
  
      for (const propertyInput of propertyInputs) {
        const keyInput = propertyInput.getElementsByTagName('input')[0];
        const valueInput = propertyInput.getElementsByTagName('input')[1];
        properties.push({ key: keyInput.value, value: valueInput.value });
      }
  
      addObjectOrUpdate(objectId, graphType, { label: nodeLabel, properties });
    } else {
      const edgeLabel = document.getElementById('edge-label').value;
      const sourceNode = document.getElementById('source-node').value;
      const targetNode = document.getElementById('target-node').value;
      addObjectOrUpdate(objectId, graphType, { label: edgeLabel, source: sourceNode, target: targetNode });
    }



    updateTable();
    resetForm();
  });

}

window.exportGraphObjects = function(event) {
  console.log("X.X.2 Export graph objects to JSON file");
  SJFIJSONExport(window.graphObjects);
}

window.importGraphObjects = async function(event) {
  console.log("X.X.2 Import graph objects to JSON file");

  const importedGraphObjects = await SJFIJSONImport(event.target.files[0]);
  if (importedGraphObjects) {
    window.graphObjects = importedGraphObjects;
    updateTable();
    saveFunction(window.SJFI_storageKey);
  }
}
//////////////////////////



function OperationsUIObjectsButtonSetup() {
  console.log("0.1.2 Initialize User Interface for adding objects");
  const importButton = document.getElementById('import-button');
  importButton.addEventListener('click', () => {
    const importFileInput = document.getElementById('import-file');
    importFileInput.click();
  });

  const importFileInput = document.getElementById('import-file');
  importFileInput.addEventListener('change', window.importGraphObjects);

  const exportButton = document.getElementById('export-button');
  exportButton.addEventListener('click', (e) => { // Updated this line
    e.stopPropagation();
    window.exportGraphObjects();
  });

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function() {
    window.resetLocalStorage(window.SJFI_storageKey);
  });
}

function updateTable() {
  console.log("X.X.1 Update table of graph objects");
  const tableBody = document.getElementById('graph-object-table-body');
  tableBody.innerHTML = '';

  for (const object of graphObjects) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = object.id;
    row.appendChild(idCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = object.type;
    row.appendChild(typeCell);

    const labelCell = document.createElement('td');
    labelCell.textContent = object.label;
    row.appendChild(labelCell);

    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editObject(object);
    });
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    // Add the remove button
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeObject(object);
      updateTable();
    });
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    tableBody.appendChild(row);
  }

  updateNodeDropdowns();
}

function updateNodeDropdowns() {
  const sourceNodeDropdown = document.getElementById('source-node');
  const targetNodeDropdown = document.getElementById('target-node');

  sourceNodeDropdown.innerHTML = '';
  targetNodeDropdown.innerHTML = '';

  const nodeObjects = graphObjects.filter(object => object.type === 'node');

  for (const node of nodeObjects) {
    const sourceOption = document.createElement('option');
    sourceOption.value = node.label;
    sourceOption.textContent = node.label;
    sourceNodeDropdown.appendChild(sourceOption);

    const targetOption = document.createElement('option');
    targetOption.value = node.label;
    targetOption.textContent = node.label;
    targetNodeDropdown.appendChild(targetOption);
  }
}


function toggleObjectTypeFields() {
  const graphType = document.getElementById('graph-type').value;
  const nodeFields = document.getElementById('node-fields');
  const edgeFields = document.getElementById('edge-fields');

  if (graphType === 'node') {
      nodeFields.style.display = 'block';
      edgeFields.style.display = 'none';
  } else {
      nodeFields.style.display = 'none';
      edgeFields.style.display = 'block';
  }
}

function resetForm() {
  const form = document.getElementById('graph-object-form');
  form.reset();
  toggleObjectTypeFields();
  const submitButton = document.getElementById('submit-button');
  submitButton.textContent = 'Add Object';
  window.editingIndex = null;
}

function createPropertyInput(property) {
  const propertyDiv = document.createElement('div');
  propertyDiv.classList.add('property-input');

  const keyInput = document.createElement('input');
  keyInput.type = 'text';
  keyInput.placeholder = 'Key';
  keyInput.value = property ? property.key : '';
  propertyDiv.appendChild(keyInput);

  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.placeholder = 'Value';
  valueInput.value = property ? property.value : '';
  propertyDiv.appendChild(valueInput);

  const removeButton = document.createElement('button');
  removeButton.textContent = '-';
  removeButton.type = 'button';
  removeButton.addEventListener('click', () => {
    propertyDiv.remove();
  });
  propertyDiv.appendChild(removeButton);

  return propertyDiv;
}
