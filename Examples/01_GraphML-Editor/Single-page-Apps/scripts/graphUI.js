//---------------------------
// UI
//---------------------------
function ButtonSetupAreaBObjectAdding(debug=false) {
  if (debug) console.log("[DEBUG] graphUI.js - 1. ButtonSetupAreaBObjectAdding() called");

  const graphTypeDropdown = document.getElementById('graph-type');
  graphTypeDropdown.addEventListener('change', () => {
    const submitButton = document.getElementById('submit-add_object-button');
    submitButton.textContent = 'Add Object';
    window.editingIndex = null;

    // toggleObjectTypeFields(); -- IDK why this is here...
  });
  
  const addPropertyButton = document.getElementById('add-property-button');
  addPropertyButton.addEventListener('click', () => {
    const nodeProperties = document.getElementById('node-properties');
    nodeProperties.appendChild(createPropertyInput());
  });

  const form = document.getElementById('graph-object-form'); // This will trigger for "ADD OBJECT" and "EDIT OBJECT" --- BUT PREVENTS BUTTONS from RELOADING THE PAGE!
  // const form = document.getElementById('submit-add_object-button');
  form.addEventListener('submit', (e) => {
    console.log("[DEBUG] submit-add_object-button clicked");

    e.preventDefault();
    const graphType = document.getElementById('graph-type').value;
    const objectId = document.getElementById('object-id').value;

    console.log("[DEBUG] graphType = " + graphType);
    console.log("[DEBUG] objectId = " + objectId);
    if (objectId === "" || objectId === null) { //New Object clicked, and empty
      return;
    }

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
      // console.log("addObjectOrUpdate(" + objectId + ", " + graphType + ", { label: " + nodeLabel + ", properties: " + properties + " })");
      addObjectOrUpdate(objectId, graphType, { label: nodeLabel, properties });

    } else {
      console.log("addObjectOrUpdate(" + objectId + "... )");
      // length of objectID
      console.log("objectId.length = " + objectId.length);
      const edgeLabel = document.getElementById('edge-label').value;
      const edgeKey = document.getElementById('edge-key').value;
      const edgeValue = document.getElementById('edge-value').value;
      const sourceNode = document.getElementById('source-node').value;
      const targetNode = document.getElementById('target-node').value;

      const sourceNodeId = window.SJFI_data.graphObjects.find(obj => obj.label === sourceNode).id;
      const targetNodeId = window.SJFI_data.graphObjects.find(obj => obj.label === targetNode).id;

      // console.log("addObjectOrUpdate(" + objectId + ", " + graphType + ", { label: " + edgeLabel + ", key: " + edgeKey + ", value: " + edgeValue + ", source: " + sourceNode + ", sourceId: " + sourceNodeId + ", target: " + targetNode + ", targetNode: " + targetNodeId + " })");
      addObjectOrUpdate(objectId, graphType, { label: edgeLabel, key: edgeKey, value: edgeValue, source: sourceNode, sourceId: sourceNodeId, target: targetNode, targetId: targetNodeId });
    }

    FormSetupAreaBObjectNew();
    window.updateTable();
    window.reprintGraphMLFile();
  });

}

window.exportGraphObjects = function(event) {
  SJFIJSONExport(window.SJFI_data);
}


window.importGraphObjects = async function(event) {

  const importedData = await SJFIJSONImport(event.target.files[0]);
  if (importedData) {
    window.SJFI_data = importedData;
    updateTable();
    loadGraphSettings();
    updateGraphSettings();
    reprintGraphMLFile();
    storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
  }
}

function ButtonSetupAreaBObjectEditing(debug=false) {
  if (debug) console.log("[DEBUG] graphUI.js - 2. ButtonSetupAreaBObjectEditing() called");
  
  const newObjectOrCLEARButton = document.getElementById('new-object-button');
  newObjectOrCLEARButton.addEventListener('click', () => {
    FormSetupAreaBObjectNew();
  });

  const importFileInput = document.getElementById('import-file');
  importFileInput.addEventListener('change', window.importGraphObjects);

  const importButton = document.getElementById('import-button');
  importButton.addEventListener('click', () => {
    importFileInput.click();
  });

  const exportButton = document.getElementById('export-button');
  exportButton.addEventListener('click', (e) => { // Updated this line
    e.stopPropagation();
    window.exportGraphObjects();
  });


  const saveGraphMLButton = document.getElementById('save-graphml-button');
  saveGraphMLButton.addEventListener('click', (e) => { // Updated this line
    e.stopPropagation();
    window.saveGraphMLFile();
  });


  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function() {
    window.SJFI_data = window.resetLocalStorageByKey(window.SJFI_storageKey);
    // localStorage.clear();
    window.updateTable();
    window.updateGraphSettings();
    window.reprintGraphMLFile();
    window.location.reload();
  });

  const updateGraphSettingsButton = document.getElementById('update-graph-settings-button');
  updateGraphSettingsButton.addEventListener('click',() => {
    window.SJFI_data.graphSettingsTitle = document.getElementById('graph-title').value;
    window.SJFI_data.graphSettingsDirectionality = document.getElementById('graph-directionality').value;

    storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
    window.reprintGraphMLFile();
    alert("Graph settings updated!");
  });
}

function updateTable(debug=false) {
  if (debug) console.log("[DEBUG] graphUI.js - updateTable() called");

  const tableBody = document.getElementById('graph-object-table-body');
  tableBody.innerHTML = '';

  if (window.SJFI_data !== undefined) {
    if (window.SJFI_data.graphObjects !== undefined) {
      if (window.SJFI_data.graphObjects.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = 'No objects';
        cell.colSpan = 5;
        row.appendChild(cell);
        tableBody.appendChild(row);

        return;
      }

    for (const object of window.SJFI_data.graphObjects) {
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
        document.getElementById("edit-header").scrollIntoView();
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

    //RENDER D3.js GRAPH
    d3.select("#graph-svg").selectAll("*").remove();
    // window.SJFI_data.NodesRenderSettings = drawGraph(window.SJFI_data.graphObjects);

    drawGraph(window.SJFI_data.graphObjects);

    // let changes = drawGraph(window.SJFI_data.graphObjects);
    // changes.forEach(change => {
    //     let graphObject = window.SJFI_data.graphObjects.find(o => o.id === change.id && o.type === 'node');
    //     if (graphObject) {
    //         graphObject.x = change.x;
    //         graphObject.y = change.y;
    //     }
    // });
    

    }
  }

}

function updateNodeDropdowns() {
  const sourceNodeDropdown = document.getElementById('source-node');
  const targetNodeDropdown = document.getElementById('target-node');

  sourceNodeDropdown.innerHTML = '';
  targetNodeDropdown.innerHTML = '';

  const nodeObjects = window.SJFI_data.graphObjects.filter(object => object.type === 'node');

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

function FormSetupAreaBObjectNew(debug=false) {
  if (debug) console.log("[DEBUG] graphUI.js - 3. FormSetupAreaBObjectNew() called");

  const form = document.getElementById('graph-object-form');
  form.reset();
  toggleObjectTypeFields();
  const submitButton = document.getElementById('submit-add_object-button');
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

//--------------------
// Graph Properties
//--------------------
window.updateGraphSettings = function(debug = false) {
  if (debug) console.log("[DEBUG] graphUI.js - updateGraphSettings() called");

  const titleInput = document.getElementById('graph-title');
  const directionalitySelect = document.getElementById('graph-directionality');

  if (typeof window.SJFI_data.graphSettingsTitle !== "string"){
    window.SJFI_data.graphSettingsTitle = "";

  } else {
    window.SJFI_data.graphSettingsTitle = titleInput.value;
  }

  if (window.SJFI_data.graphSettingsDirectionality !== "directed" && window.SJFI_data.graphSettingsDirectionality !== "undirected"){
    directionalitySelect.value = "directed"
  } else {
    window.SJFI_data.graphSettingsDirectionality = directionalitySelect.value;
  }

    storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
}

window.loadGraphSettings = function(debug = false) {
  if (debug) console.log("[DEBUG] graphUI.js - loadGraphSettings() called");

  const titleInput = document.getElementById('graph-title');
  const directionalitySelect = document.getElementById('graph-directionality');

  titleInput.value = window.SJFI_data.graphSettingsTitle;
  directionalitySelect.value = window.SJFI_data.graphSettingsDirectionality;
}