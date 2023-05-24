Important, Urgent
=================
- [ ] Export gives empty data -- Import is assumed to be broken too
- [ ] Local storage is assumed to NOT work
- [ ] Drawn D3.js drawing errors
  - "reset drawing" will NOT clear past objects; Zoom can leave artifact objects
  - Changed node setting do NOT immediately update (e.g., color coding)

Not Important, Urgent
=====================


Important, Not Urgent
=====================
- [ ] The new zoom/click features can cause the window to get stuck
  - (e.g. the "scroll doldrums" -- you can move and zoom the graph, but NOT move up/down the page)
- [ ] Pressing 'Add Object' does not clear the form
= [ ] Pressing 'New Object' will add a blank node (BUT will clear the settings!)

Not Important, Not Urgent
=========================
- [ ] Use of this function to reset storageData DOES NOT execute due to the pass by value vs. pass by reference.
```window.resetLocalStorageByKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetLocalStorageByKey(" + storageKey + ") called");
  localStorage.removeItem(storageKey);
  storageData = [];
};
```


SOLVED
======
- [X] Clicking New Object will ADD an object -- ALL form-buttons were treated as "add object"
  - It WILL clear out the object form, but it SHOULD NEVER add objects
  - [X] Scrolled to top of the screen
- [X] When 'edit' is clicked, for an EDGE:
  - graphEditing.js:32 Uncaught TypeError: Cannot read properties of undefined (reading 'id')
    at editObject (graphEditing.js:32:96)
    at HTMLButtonElement.<anonymous> (graphUI.js:174:7)

