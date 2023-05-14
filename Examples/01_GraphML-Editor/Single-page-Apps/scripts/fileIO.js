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


function setGraphMLContent(defaultGraphML) {
    var graphmlFileElement = document.getElementById("graphml-file");
    graphmlFileElement.innerText = defaultGraphML;
    graphmlFileElement.style.whiteSpace = "pre"; // Preserve whitespace
}

function setGraphMLContentAPPEND(defaultGraphML) {
    var graphmlFileElement = document.getElementById("graphml-file");
    graphmlFileElement.innerText += defaultGraphML;
    graphmlFileElement.style.whiteSpace = "pre"; // Preserve whitespace
} 

//create window function reprintGraphMLFile()
window.reprintGraphMLFile = function(objectId, graphType, data) {
    setGraphMLContent(defaultGraphMLHEADER+"\n");
    setGraphMLContentAPPEND("\n");

    //<KEYS>

    // <GRAPH>
    //OPTIONAL: <graph id="..."
    setGraphMLContentAPPEND('    <graph id="' + window.graphTitle + '" edgedefault="' + window.graphDirectionality + '">');

    // <NODES>

    // <EDGES>

    setGraphMLContentAPPEND(defaultGraphMLFOOTER);
}