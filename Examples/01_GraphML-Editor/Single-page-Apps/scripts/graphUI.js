//---------------------------
// UI
//---------------------------
// Setup UI and Environment
// 0.1 User Interface Setup/Initialization

function OperationsUIObjectsFormSetup() {
  console.log("#.#.#.# Develop user interface for adding objects");

  const form = document.getElementById('graph-object-form');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const graphType = document.getElementById('graph-type').value;

      if (graphType === 'node') {
          const nodeLabel = document.getElementById('node-label').value;
          addObject(graphType, { label: nodeLabel });
      } else {
          const sourceNode = document.getElementById('source-node').value;
          const targetNode = document.getElementById('target-node').value;
          addObject(graphType, { label: edgeLabel , source: sourceNode, target: targetNode });
      }

      updateTable();
  });
}

function OperationsUIObjectsButtonSetup() {
  console.log("0.1.2 Initialize User Interface for adding objects");
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

    tableBody.appendChild(row);
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