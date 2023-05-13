
// // 1.3.1 Implement Export GraphML feature
// function exportGraphMLLogic() {
//   console.log("1.3.1.1 Implement logic for exporting graph data to GraphML format");
// }

// function exportGraphMLFeedback() {
//   console.log("1.3.1.2 Incorporate feedback from stakeholders");
// }

// // 1.3.2 Implement Import GraphML feature
// function importGraphMLLogic() {
//   console.log("1.3.2.1 Implement logic for importing GraphML data for editing");
// }

// function importGraphMLFeedback() {
//   console.log("1.3.2.2 Incorporate feedback from stakeholders");
// }

// // 1.3.3 Implement Export JSON feature
// function exportJSONLogic() {
//   console.log("1.3.3.1 Implement logic for exporting graph data to JSON format");
// }

// function exportJSONFeedback() {
//   console.log("1.3.3.2 Incorporate feedback from stakeholders");
// }

// // 1.3.4 Implement Import JSON feature
// function importJSONLogic() {
//   console.log("1.3.4.1 Implement logic for importing JSON data for editing");
// }

// function importJSONFeedback() {
//   console.log("1.3.4.2 Incorporate feedback from stakeholders");
// }

/*
DEFAULT GraphML File:

<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns
      http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">

      <!-- Attribute Keys -->
      <!--     (From 'Recommended Attribute Keys' Above -^ filled in) -->
  
      <graph id="NAME OF GRAPH" edgedefault="undirected|directed">

          <!-- Node Entries -->
          <!--     (Copy & paste FROM 'Entry Table') -->
          
          <!--     Suggest: 'nameNode'; for D3.js Label -->
          <!--     Suggest: 'descriptionNode'; for ul / li listings -->
          <!--     Example: https://actuallyfro.github.io/SpaceEngineersMapping/ -->
          
          <!-- Edge Entries -->
          <!--     (Copy & paste FROM 'Entry Table') -->

      </graph>
</graphml>
*/


//store a default, graphml template as a variable
window.defaultGraphML = `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns
        http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">
        <!-- Attribute Keys -->
        <!--     (From 'Recommended Attribute Keys' Above -^ filled in) -->
    
        <graph id="NAME OF GRAPH" edgedefault="undirected|directed">
  
            <!-- Node Entries -->
            <!--     (Copy & paste FROM 'Entry Table') -->
            
            <!--     Suggest: 'nameNode'; for D3.js Label -->
            <!--     Suggest: 'descriptionNode'; for ul / li listings -->
            <!--     Example: https://actuallyfro.github.io/SpaceEngineersMapping/ -->
            
            <!-- Edge Entries -->
            <!--     (Copy & paste FROM 'Entry Table') -->
  
        </graph>
  </graphml>`;
