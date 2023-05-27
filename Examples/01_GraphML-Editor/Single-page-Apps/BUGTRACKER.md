Important, Urgent
=================
- [ ] context Menu's toggle for node and edge labels are not working

Not Important, Urgent
=====================


Important, Not Urgent
=====================
- [ ] The new zoom/click features can cause the window to get stuck
  - (e.g. the "scroll doldrums" -- you can move and zoom the graph, but NOT move up/down the page)
- [ ] Editing edges still says "Add object" vs. Update
  - BUT when it adds, as an overwriting action, it acts as a "Update"
- [ ] User settings for the three context menus (font color. label display for edges/nodes) are not being saved

Not Important, Not Urgent
=========================


SOLVED
======
- [X] Clicking New Object will ADD an object -- ALL form-buttons were treated as "add object"
  - It WILL clear out the object form, but it SHOULD NEVER add objects
  - [X] Scrolled to top of the screen
- [X] When 'edit' is clicked, for an EDGE:
  - graphEditing.js:32 Uncaught TypeError: Cannot read properties of undefined (reading 'id')
    at editObject (graphEditing.js:32:96)
    at HTMLButtonElement.<anonymous> (graphUI.js:174:7)
- [X] Export gives empty data -- Import is assumed to be broken too
- [X] Local storage is assumed to NOT work
- [X] Use of this function to reset storageData DOES NOT execute due to the pass by value vs. pass by reference.
```window.resetLocalStorageByKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetLocalStorageByKey(" + storageKey + ") called");
  localStorage.removeItem(storageKey);
  storageData = [];
};
```
  - Related to {} vs. []
- [X] Pressing 'Add Object' does not clear the form
- [X] Pressing 'New Object' will add a blank node (BUT will clear the settings!)
- [X] Drawn D3.js drawing errors
  - "reset drawing" will NOT clear past objects; Zoom can leave artifact objects
  - Changed node setting do NOT immediately update (e.g., color coding)
- [X] Reset of 'locked position' for the context-menu (i.e., add a button that will reset the x/y lock to allow free movement of the D3.js objects)
- [X] GraphML is NOT properly iterating/rendering information
- [X] Graph Title is not properly loading
- [X] The iteration in fileIO.js MISSES the key attr of 'label'
  - if added as a property, then it will be included for iteration
  - HOWEVER, when label is added, then it is added TWICE in <node> as <data ... label> <data ... label>

