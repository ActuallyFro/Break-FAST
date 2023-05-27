Task Statements used in Pomodoro Sprints
========================================

1. Converting WBS to SPA
------------------------
Missed

2. Splitting up the single .js file
-----------------------------------
Missed

- includes extra tasks needed to finish the SPA JavaScript functions


3. SPA Features: Add Node and Edge 
----------------------------------

### Task Statement
Code SPA features (HTML/CSS/JavaScript) to enable GraphML adding of Nodes and Edges to enable a <table > to display current list.


4. SPA Features: Sub-call JS Libraries and Display/Add edits
---------------------

### Task Statement
Tailor source code to sub-call JavaScript Libraries for Display/Add source code (node/edge)

5. SPA Features: Local Storage
-----------------------------

### Task Statement
Add code to enable LocalStorage Saving/Loading (then Reset) to enable data to be stored on page reboot.


6. Library: Move Local Storage to a Library 
-------------------------------------------

### Task Statement
Modify LocalStorage Saving/Loading (then Reset) code to a separate library to enable code reuse for other libraries.

7. Library: FINISH Moving Display/Add to a Library
--------------------------------------------------

### Task Statement
Finish migrating LocalStorage Saving/Loading (then Reset) code to a SJFI (https://github.com/ActuallyFro/SJFI.git) to enable code reuse for other libraries.

8. SPA Features: Add Object Area
-------------------------------

### Task Statement
Modify the SPA HTML/CSS to show separate areas for the Add Object Area and the Current Objects list/table to enable better workflow/presentation of information.

9. SPA Features: Shore up Add Area and Object Table
-------------------------------------------------

### Task Statement
Add code to (1) add labels to the Add Object Area and (2) update the Object table to 'load' the object into Add Object area to enable add/edit for the SPA to enable core features of the SPA.

10. SPA Features: Add Object Area and Object Table (continued)
-------------------------------------------------------------
### Task Statement
Continue updates to (1) Add Object Area and (2) Object table to to enable add/edit for the SPA to enable core features of the SPA.

### Task Status
completed

11. SPA Features: Add Object Area and Object Table (continued)
-------------------------------------------------------------
### Task Statement
Change the add/edit for Edges to NOT be inputs, but dynamic drop downs for the SPA to make user input faster/less prone to error.

12. ID Editing
--------------
### Task Statement
Edit code to allow custom ID's  to make user input faster/less prone to error.

13. Import/Export
----------------
### Task Statement
Update add/edit for Nodes to enable key/value pairs to be added for the SPA to fully store Node data.

<!-- =================== SOME DAYS LATER ===================== -->

14. Prepare for next Sprints
---------------------------
### Task Statement
Review and update documentation on the current structure of the SPA to define next sprint tasks

15. Moving JSON Export/Import to a Library
------------------------------------------
### Task Statement
Migrate code and implemented calls for the JSON import/export of the GraphML Objects into the SJFI

15. Start to implement GraphML XML file
---------------------------------------
### Task Statement
Migrate the old RBGT's Builder2 Template into the SPA so the nodes/edges will be auto-placed into the GraphML XML file.

16. Moving temp code to more permanent function calls
-----------------------------------------------------
### Task Statement
Move existing , or develop new, GraphML/XML template code to enable re-rendering of XML based on user input.

#### .a - Graph Title / directionality

#### .b - evaluate adding drop down setting for directionality

17. BUMPED - New Object Bug
---------------------------
GOT DISTRACTED -- new objects were not directly accessible, after 'edit/view' of existing objects was hit (or NOT until an edited one was 'updated')
### Task Statement
Add a 'new object' button to the index.html page to resolve add/edit/view object bug

18. BUMPED - EDGES cannot support 'weights'
--------------------------------------------
Currently Edges support an ID and a 'label' -- but the Label is a SPECIFIC key/value. Thus if a general attribute of 'distanceBetweenMi' with a float of '2.5', then it PRESENTLY cannot be added to the graph
### Task Statement
Change the edge to a single key/value entry for the add/edit object form to enable the addition of a 'weight' (and other attributes)

19. BUMPED - Plan to Save XML
-----------------------------
Add all text to a variable, such that (at a later time) a user can hit "SAVE GraphML" (like import/export)

### Task Statement
Move/add/edit code of current XML printing to a single variable to enable capabilities of a 'save' button for XML/.graphml file

20. Moving temp code to more permanent function calls
-----------------------------------------------------
### Task Statement
Move existing, or develop new, GraphML/XML template code to enable re-rendering of XML based on user input.

#### .c/d/e - Add loops to XML printing for key|attributes, nodes, and edges 
Modify all/code new capabilities for `GraphMLXMLData` functions to enable printing of graphml <EDGES>

#### Note
Did Edge, then node, then key

21. Display of Graph   
--------------------
### Task Statement
Develop the means (code modifications) to display in the SPA a current graph (nodes + edges) in a "view area" above the editing area.

22. REFACTOR - Merging D3.js Render settings into Global Graph settings
-----------------------------------------------------------------------
### Task Statement
Determine means and methods to move the drawing/rendering settings into the global object/settings for load|save|import|export

23. REFACTOR - Implementing D3.js Render settings into Global Graph settings
---------------------------------------------------------------------------
### Task Statement
Implement new code to leverage settings that store/load D3.js render settings (i.e., presently the graph will NOT hold settings, and resets to a default state on reload).

24. Bug Hunting
---------------
### Task Statement
Identify, update documentation, and attempt to code fixes for software bugs in the GraphML and Import/Export capabilities.