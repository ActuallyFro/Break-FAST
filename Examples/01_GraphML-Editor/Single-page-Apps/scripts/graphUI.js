//---------------------------
// UI
//---------------------------
// Setup UI and Environment
// 0.1 User Interface Setup/Initialization

function OperationsUIObjectsFormSetup() {
  console.log("0.1.1 Initialize User Interface for adding objects");

  const form = document.getElementById('graph-object-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const graphType = document.getElementById('graph-type').value;
      window.addObject(graphType); // Access the addObject() function from graphOperations.js
      updateTable();
  });
}

function OperationsUIObjectsButtonSetup() {
  console.log("0.1.2 Initialize User Interface for adding objects");
  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', resetLocalStorage);
}

function updateTable() {
  console.log("X.X.1 Update table of graph objects"); //This is NOT for setup (0.X), but more of graphOperations 
  const tableBody = document.getElementById('graph-object-table-body'); // Move tableBody definition inside the function
  tableBody.innerHTML = '';

  for (const object of graphObjects) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = object.type;
      row.appendChild(cell);
      tableBody.appendChild(row);
  }
}
