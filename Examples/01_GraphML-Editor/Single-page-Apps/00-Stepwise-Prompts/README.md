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
- Did NOT include the edge label



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
- Table shows ID and Type

### Un-requested Results
- Gave incrementing ID for the node

### Undesired
- did not "fix" (but was NOT ASKED TO) for the edgeLabel




. Bug hunting and Table Hacking
------------------------
### Prompt
For the current code:

1) Fix the error: 
```
graphUI.js:22 Uncaught ReferenceError: edgeLabel is not defined
    at HTMLFormElement.<anonymous> (graphUI.js:22:41)
```

2) Add to the table: the label for the nodeLavel or edgeLabel

3) Add a column to the table: EDIT -- it loads the data into the section (1) for the editing

4) Add a column to the table: REMOVE -- it will remove the object from the table

### Results
- 
### Un-requested Results
- 
### Undesired
- The response ENDED without completion


. Continuing a response
------------------------
### Prompt
Finish the response that was just halted

### Results
- 
### Un-requested Results
- Adding the table headers had an exact callout of `<!-- Add this line -->` x2

### Undesired
- It gave "additive" code changes -- but was NOT EXPLICIT where it'd be placed (it was an append action, which the table would have been out of order)

. Adding Editing
------------------------
### Prompt

### Results
- 
### Un-requested Results
- 
### Undesired
- 


. COntinue that adding of Editing functions
------------------------
### Prompt
The above code accomplished:
I. Change the code to have the "Add Object" button be changed to "Update Object"  when an "Edit Button" is pressed.
II. Have the "Add Object" button return (1) on page load, 
III. Have the "Add Object" button return ( (2) when the drop down for 'Select New Object Type:' is selected,

Finish what NOT Implemented:
A) Have the "Add Object" button return when (3) the Edge Label is changed

Also:
B) Add the JavaScript logic that will "update" a given object if/when "Update Object" is clicked (i.e., the current code has a bug, which always adds new objects vs. updating objects that are being edited)


### Results
- 
### Un-requested Results
- 
### Undesired
- 


. "Rebaseline"
------------------------
### Prompt
The next post is not a question, but a statement.

To re-baseline the code track the HTML as:
```
<CODE HERE>
```

### Prompt2
The next post is not a question, but a statement.

To re-baseline the code track the JavaScript files are:
```graphOperations.js
<CODE HERE>

```

```graphUI.js
<CODE HERE>
```

```graphEditing.js
<CODE HERE>
```

### Results
- ChatGPT Responded (for both):
Thank you for providing the updated JavaScript code for the SPA GraphML Editor. This will serve as the new baseline for any further code changes or improvements. If you have any questions or need assistance with implementing additional features or modifications, feel free to ask!

### Un-requested Results
- 
### Undesired
- 


. Editing - re-ask
------------------------
### Prompt
Add the JavaScript logic that will "update" a given object if/when "Update Object" is clicked (i.e., the current code has a bug, which always adds new objects vs. updating objects that are being edited)

### Results
- 
### Un-requested Results
- 
### Undesired
- 

. Bug Hunting: using the UI ID'ed a bug
------------------------
### Prompt
Current Bug: when `Select New Object Type:` has it's drop-down selected -- it DOES NOT reset the form.

### Results
- 
### Un-requested Results
- 
### Undesired
- 


. Adding Editing for ID's
------------------------
### Prompt
Update editing task code to enable users to change stored ID value for the SPA to allow different naming standards/values.

### Results
- 
### Un-requested Results
- 
### Undesired
- 


. Import/Export
------------------------
### Prompt
Another way to describe requirements:
```
<CURRENT CODE>
```

The above functions are in graphUI.js. However, saveFunction() is in "SJFI/lib-localstorage.js". I wish to move "generic" activities for JSON Import/Export into "SJFI/lib-JSON-ImpExp.js" for other JavaScript files to re-use the File IO.
### Results
- 
### Un-requested Results
- 
### Undesired
- 


. Migrating edge objects for XML export
------------------------
### Prompt

Given the following format for GraphML (.graphml) XML files:
```
//http://graphml.graphdrawing.org/primer/graphml-primer.html#Graph
window.defaultGraphMLHEADER = `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns
        http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">

    <!-- Attribute Keys -->`;

        // <!-- Attribute Keys -->
        // <!--     (From 'Recommended Attribute Keys' Above -^ filled in) -->
    
        // <graph id="NAME OF GRAPH" edgedefault="undirected|directed">
  
        //     <!-- Node Entries -->
        //     <!--     (Copy & paste FROM 'Entry Table') -->
            
        //     <!--     Suggest: 'nameNode'; for D3.js Label -->
        //     <!--     Suggest: 'descriptionNode'; for ul / li listings -->
        //     <!--     Example: https://actuallyfro.github.io/SpaceEngineersMapping/ -->
            
        //     <!-- Edge Entries -->
        //     <!--     (Copy & paste FROM 'Entry Table') -->

//"There is no order defined for the appearance of node and edge elements." This means it CAN mix! --> implies issues for parsing

window.defaultGraphMLFOOTER = `
        <!-- Node Entries -->

        <!-- Edge Entries -->
    </graph>
</graphml>`;
```

the index.html form:
```html
<FORM SNIPPET>
```

And for existing functions of XML-file-prep:
```fileIO.js
<CODE>
```

Add the needed code for looping over edgeObjects in reprintGraphMLFile().


### Results
- DROP IN quality code

### Un-requested Results
- 
### Undesired
- 


. Migrating node objects for XML export
------------------------
### Prompt
Add the appropriate code, now for the nodes. Noting that the nodes can have a series of key/value objects"
```graphEditing.js
  if (object.type === 'node') {
    const nodeLabelInput = document.getElementById('node-label');
    nodeLabelInput.value = object.label;

    const nodeProperties = object.properties || [];
    const nodePropertiesDiv = document.getElementById('node-properties');
    nodePropertiesDiv.innerHTML = '';

    for (const property of nodeProperties) {
      nodePropertiesDiv.appendChild(createPropertyInput(property));
    }
  }
```
### Results
- Minor hacking to, and minor/manual addition of the label to produce the code

### Un-requested Results
- 
### Undesired
- 



. Getting Attribute Keys to Generate
------------------------
### Prompt
For the code thus far, provide the code edits for `reprintGraphMLFile()` (i.e., ### NEEDED CODE HERE ### below) that will loop over the objects, discover keys, and place them before the `setGraphMLContentAPPEND('    <graph id="' + window.graphTitle + '" edgedefault="' + window.graphDirectionality + '">');` line to comply with the GraphML standards.

Present code:
```
<Provided the RUNNING CODE>
```

The data types are UNKNOWN, or not save in the current array, Use the following as a template (i.e., each key will replace the `###data key###` and ###type### content and the rest is re-use) :
```
<key attr.name="GraphML_ID_###data key###" attr.type="boolean|int|long|float|double|string" for="###type###" id="###data key###"><default>MISSING DESCRIPTION</default></key>
```

### Results
- well defined code

### Un-requested Results
- 
### Undesired
- Code Errors

. Fixing error
------------------------
### Prompt
That errors:
```
*.js:66 Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
    at fileIO.js:66:27
    at Array.forEach (<anonymous>)
    at window.reprintGraphMLFile (fileIO.js:65:18)
    at (index):134:9
```

### Results
- Code
- "This code now checks if each object in graphObjects has a properties array before trying to iterate over it. If an object doesn't have a properties array, it just skips over that object. This should prevent the error you were seeing."

### Un-requested Results
- 
### Undesired
- 

. Error Iterations
------------------------
### Prompt
This works for MOST of the data. However, each object has a .type which is NOT the same as the `graphType` (e.g., to find the nodss: `    const nodeObjects = graphObjects.filter(object => object.type === 'node');`)

Update the code for the `for="${graphType}"` to be of the respective object.type.

### Prompt 2
No keys for the edges are provided, only the nodes, in the above code

### Results
- 
### Un-requested Results
- 
### Undesired
- SELF failure to describe issue

. Re-attempt at error description
------------------------
### Prompt
The logical error (bug) still persists.

Know that:
```javascript
...
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
  }
...
```

Specifically for nodes the keys would be nested within the properties of of object, but edges have the key/value "up a level".


### Prompt 2 - Refinement
The code generates:
            <key attr.name="GraphML_ID_key" attr.type="string" for="edge" id="key">
                <default>MISSING DESCRIPTION</default>
            </key>

However, key is generic, and likely skips/overwrites content. Leave nodes alone, but for edges modify the code to leverage the data within the .key value to determine the _key variable for attr.name and id.

### Results
- Finally got desired endstate 
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

. 
------------------------
### Prompt

### Results
- 
### Un-requested Results
- 
### Undesired
- 