Note
====

At times when developing, or refactoring (e.g., simplification, new features, or bug hunting), planning phases need to be revisited. 
Especially, when NEW code/changes to code cause logical and syntax errors.

For instance: TIMING in how things are loaded in JavaScript is critical -- and can seemingly be non-deterministic.
WHEN several pomodoros are "burnt" (i.e., no meaningful progress made against a task), then it makes sense to "step backwards".
Understanding HOW the code is designed (e.g., the WBS) may need other/supplementary diagrams.
One such diagram is a State Diagram, which PlantUML supports:

```plantuml
@startuml

title GraphML Editor
state "Load and Restore" as LnR {
  state Load {
     Load: 1. all JavaScript
     Load: 2. default values
  }
  
  state "DOMContentLoaded()" as DOMLoaded {
    DOMLoaded: //Had Errors for functions existing
  }
  
  state "onload()" as PageLoaded {
    PageLoaded : //moved them HERE
    
    state Restore {
      Restore: 1. IF not null, overwrite default values
    }
  }
  
'      // window.addEventListener('DOMContentLoaded', () => { // FIRES BEFORE onload()
'    window.onload = () => {

}

state "Setup UI" as UISetup {
 UISetup: Setup defaults for Forms
}

[*] --> LnR
Load --> DOMLoaded 
DOMLoaded --> PageLoaded
PageLoaded --> Restore

LnR -> UISetup
note right of UISetup
Handwaving specifics...
end note

UISetup --> [*]



@enduml
```

The above diagram helps define and show the loading/execution process of the JavaScript files -- and where the code erred.
Alternatively a sequence diagram could have been used.
