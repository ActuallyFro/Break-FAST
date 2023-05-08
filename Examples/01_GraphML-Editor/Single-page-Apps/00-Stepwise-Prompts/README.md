Stepwise Prompts used in Development
====================================

1. Converting WBS to SPA
------------------------

Requirements: having the WBSE of needed functions/work units.

### Prompt

Take the following PlantUML WBS:

```
<INSERTED PlantUML WBS>
```

Create an SPA of HTML, JavaScript, and CSS. However, take the WBS and create the skeleton/function templates (that simply show console.log( <WBS#> )), to enable subsequent development.

### Results
1. HTML - SPA
2. main.js with a large portion of the code

2. Splitting up the single .js file 
-----------------------------------

Requirements: loaded main.js (reused in the chat)

### Prompt

Split up the main.js file. Have it call sub-javascript files of appropriately grouped areas.

### Results
1. Three .js files that regroup the code into logical areas.
2. Files:
   1. `<script src="graphOperations.js"></script>`
   2. `<script src="graphEditing.js"></script>`
   3. `<script src="fileIO.js"></script>`




3. Finishing the SPA JavaScript functions 
------------------------

### Prompt
Finish the code that was started above:
```
<JavaScript code from PROMPT #1>
```

Starting from the second from the bottom row.

### Results
Provided the remainder and FileIO functions.


4. Finish the missing sections 
------------------------------

### Prompt

Finish the missing sections:
```
// 1.2.1 Implement Edit Node feature
// Reuse editNodeUI() and editNodeLogic() from 1.1.2


// 1.2.1 Implement Edit Node feature
// Reuse editNodeUI() and editNodeLogic() from 1.1.2
```

### Results

```
function editNodeUI() {
  console.log("1.1.2.1 Develop user interface for editing nodes");
}

function editNodeLogic() {
  console.log("1.1.2.2 Implement logic for editing nodes in graph");
}
```

5. SPA Features: Updating HTML and JavaScript
------------------------

### Prompt

For the HTML:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPA GraphML Editor</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Add your HTML elements here -->

    <script src="graphOperations.js"></script>
    <script src="graphEditing.js"></script>
    <script src="fileIO.js"></script>
</body>
</html>
```
Keep an array of Graph Objects in Javascript.

Two part HTML areas: (I) Object Add Area (i.e., a form), (II) Table that displays the current list of Objects (generated from the Objects).

Task: Add needed source code (HTML/CSS/JavaScript) that adds  a <form> selection to (a) first select a graph type (i.e., node, edge),  (b) upon submit it will add to the array, and (c).


### Results
- Updated HTML

### Un-requested Results
- Provided styles.css

### Undesired
- Added NEW main.js

. Breakout of code into sub-files
------------------------

### Prompt
```graphUI.js
//Variables
const graphObjects = [];
```

```graphOperations.js
function addObject(graphType) {
  graphObjects.push({ type: graphType });
}
```

The HTML loads:
```
    <script src="./scripts/graphUI.js"></script>
    <script src="./scripts/fileIO.js"></script>

    <script src="./scripts/graphOperations.js"></script>
    <script src="./scripts/graphEditing.js"></script>
```

Fix the code for the addObject() call to leverage the graphObjects[] when the HTML button is pressed.

### Results
- Provided breakout of the code

### Un-requested Results
- gave 'export' for functions

### Undesired
- tried to make a NEW JavaScript file

. Breakout of code into sub-files -- added guidance
------------------------

### Prompt
How to have included libraries access the following array:
```
    <script>
      const graphObjects = [];

    </script>

    <script src="./scripts/graphUI.js"></script>
    <script src="./scripts/fileIO.js"></script>

    <script src="./scripts/graphOperations.js"></script>
    <script src="./scripts/graphEditing.js"></script>
```

DO NOT ADD a main.js

### Results
- provided: `you can attach the array to the window object in the index.html file. `

### Un-requested Results
- 

### Undesired
- 

. Access Question
------------------------

### Prompt
How to have `graphUI.js`, with the following:

```
//UI Features for Add
function OperationsObjectsFormSetup() {
  console.log("#.#.#.# Develop user interface for adding objects");

  const form = document.getElementById('graph-object-form');
  const tableBody = document.getElementById('graph-object-table-body');
  
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const graphType = document.getElementById('graph-type').value;
      addObject(graphType);
      updateTable();
  });
}
```

Access the addObject() function in `graphOperations.js`?

### Results
- `attach the addObject function to the window object`
- showed how to access the objects: `window.addObject()`

### Un-requested Results
- 

### Undesired
- 



. Debugging references
------------------------

### Prompt
Fix the following code:
```graphUI.js
function updateTable() {
  tableBody.innerHTML = '';
  for (const object of graphObjects) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = object.type;
      row.appendChild(cell);
      tableBody.appendChild(row);
  }
}
```

Current Error:
```
 Uncaught ReferenceError: tableBody is not defined
    updateTable http://127.0.0.1:8000/scripts/graphUI.js:5
    OperationsObjectsFormSetup http://127.0.0.1:8000/scripts/graphUI.js:26
    OperationsObjectsFormSetup http://127.0.0.1:8000/scripts/graphUI.js:22
    <anonymous> http://127.0.0.1:8000/?:40
```

### Results
- Move the definition of tableBody inside the updateTable function or make it a global variable.



. LocalStorage Implementation
-----------------------------

### Prompt
For the following HTML code:
```index.html
<HTML CODE>
```

Knowing:
```graphUI.js
function updateTable() {
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
```

Knowing:
```graphOperations.js
window.addObject = function(graphType) {
  window.graphObjects.push({ type: graphType });
}
```

1. Add a saveFunction (runs when  addObject() executes), that stores graphObjects() into 

2. LocalStorage. Also, on page load, check if LocalStorage has objects, then if there are objects: load those into the table/run updateTable.

3. Finally, have a reset button on the bottom of the page that will clear local storage.

### Results

- Provided  MOST of the code as asked

### Un-requested Results
- 

### Undesired
- Moved save function into the wrong .js






. Debugging references
------------------------

### Prompt
For the following HTML code:
```index.html
<CODE REMOVED>
```

Knowing:
```graphUI.js
<CODE REMOVED>
```

Knowing:
```graphOperations.js
<CODE REMOVED>
```

1. Add a saveFunction (runs when  addObject() executes), that stores graphObjects() into 

2. LocalStorage. Also, on page load, check if LocalStorage has objects, then if there are objects: load those into the table/run updateTable.

3. Finally, have a reset button on the bottom of the page that will clear local storage.

### Results
- Gave a edits for HTML button
- Gave fileIO.js edits
- Added to existing "main area <script>"

### Un-requested Results
- changed listeners

### Undesired
- 



. Migration to LocalStorage Functions
-------------------------------------

### Prompt
I) Move all of:
```
function saveFunction() 
function loadGraphObjects() 
function resetLocalStorage() 
```

To fileIO.js.

II) Change the localstroage string ID to "SGE_graphObjects"

III) Fix any reference code/functions due to nesting of functions into fileIO.js.


### Results
- 
### Un-requested Results
- 
### Undesired
- 



. Debug: unaccessible button
----------------------------
### Prompt
Skipped (gave code and error)

### Results
- `element is not available in the DOM ... when function is called. To fix this issue, move the ... element before the script tags...`

### Un-requested Results
- 
### Undesired
- 



. SPA: entering the direct task
------------------------
### Prompt
The current HTML for the SPA is:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPA GraphML Editor</title>
    <link rel="stylesheet" href="./styles/styles.css">
</head>
<body>
    <!-- Add your HTML elements here -->
    <h1>I) Object Adding/Editing</h1>
    <form id="graph-object-form">
        <label for="graph-type">Select New Object Type:</label>
        <select id="graph-type">
            <option value="node">Node</option>
            <option value="edge">Edge</option>
        </select>
        <br>
        <button type="submit">Add Object</button>
    </form>
<hr>
<h1>II) Object Table</h1>
    <table id="graph-object-table">
        <thead>
            <tr>
                <th>Type</th>
            </tr>
        </thead>
        <tbody id="graph-object-table-body">
        </tbody>
    </table>


    <button id="reset-button">Reset</button>


    <script src="./scripts/graphUI.js"></script>
    <script src="./scripts/SJFI/lib-localstorage.js"></script>
    <script src="./scripts/fileIO.js"></script>

    <script src="./scripts/graphOperations.js"></script>
    <script src="./scripts/graphEditing.js"></script>

    <script>
      window.graphObjects = [];
      window.SJFI_storageKey = 'SGE_graphObjects';

      OperationsUIObjectsFormSetup();
      OperationsUIObjectsButtonSetup();

      loadGraphObjects(SJFI_storageKey);
    </script>


</body>
</html>
```
Javascript:
```graphUI.js

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
```

```graphOperations.js
//---------------------------
// Objects
//---------------------------
window.addObject = function(graphType) {
  window.graphObjects.push({ type: graphType });
  saveFunction(window.SJFI_storageKey);
}
```

Add code to (1) add labels to the Add Object Area and (2) update the Object table to 'load' the object into Add Object area to enable add/edit for the SPA to enable core features of the SPA.

### Results
- Provided two step approach
- Gave NEW setup javascript


### Un-requested Results
- JavaScript Object arrays that varied by type
- Gave "switch and show" Javascript (certain fields only show)

### Undesired
- 




. Update the "known" code -- and change the Table
------------------------
### Prompt
Current Reference:

HTML
```index.html
<FULL CODE>
```

```graphOperations.js
window.addObject = function(graphType, data) {
  const objectData = { type: graphType, ...data };
  window.graphObjects.push(objectData);
  saveFunction(window.SJFI_storageKey);
}
```

And:
```graphUI.js
<FULL CODE>
```

Update the Table to show the nodeID or EdgeID.

### Results
- 
### Un-requested Results
- 
### Undesired
- Did NOT include the edge label




. 
------------------------
### Prompt

### Results
- 
### Un-requested Results
- 
### Undesired
- 



. 
------------------------
### Prompt

### Results
- 
### Un-requested Results
- 
### Undesired
- 
