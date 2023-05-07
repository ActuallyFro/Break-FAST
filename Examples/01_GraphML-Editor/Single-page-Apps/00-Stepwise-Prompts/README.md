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

. 
------------------------

### Prompt

### Results



. 
------------------------

### Prompt

### Results
