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
    </graph>
</graphml>`;


function setGraphMLContent(defaultGraphML) {
    var graphmlFileElement = document.getElementById("graphml-file");
    // graphmlFileElement.innerText = defaultGraphML;
    window.GraphMLXMLData = defaultGraphML;
    // graphmlFileElement.style.whiteSpace = "pre"; // Preserve whitespace
}

function setGraphMLContentAPPEND(defaultGraphML) {
    var graphmlFileElement = document.getElementById("graphml-file");
    //graphmlFileElement.innerText += defaultGraphML;
    window.GraphMLXMLData += defaultGraphML;
    // graphmlFileElement.style.whiteSpace = "pre"; // Preserve whitespace
} 

function renderGraphMLToFileArea() {
    var graphmlFileElement = document.getElementById("graphml-file");
    graphmlFileElement.innerText = window.GraphMLXMLData;
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
    // const nodeObjects = graphObjects.filter(object => object.type === 'node');

    setGraphMLContentAPPEND("\n\n        <!-- Edge Entries -->\n");
    const edgeObjects = graphObjects.filter(object => object.type === 'edge');

    // Iterate over edgeObjects and append edge XML for each object
    edgeObjects.forEach((edge) => {
        let edgeXML = `
            <edge id="${edge.id}" source="${edge.source}" target="${edge.target}">
                <data key="${edge.key}">${edge.value}</data>
            </edge>`;

        setGraphMLContentAPPEND(edgeXML);
    });


    setGraphMLContentAPPEND(defaultGraphMLFOOTER);

    renderGraphMLToFileArea();
}



window.saveGraphMLFile = function(event) {
    var blob = new Blob([window.GraphMLXMLData], {type: "application/xml;charset=utf-8"});
    window.SJFIXMLExportText(blob, window.graphTitle+".graphml");    
}
