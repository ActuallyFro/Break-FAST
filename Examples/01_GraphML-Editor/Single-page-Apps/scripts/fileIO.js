//http://graphml.graphdrawing.org/primer/graphml-primer.html#Graph
// window.defaultGraphMLHEADER = `<?xml version="1.0" encoding="UTF-8"?>
// <graphml xmlns="http://graphml.graphdrawing.org/xmlns"
//     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//     xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns
//         http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">

// `;

window.defaultGraphMLHEADER = `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">`;
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

window.defaultGraphMLFOOTER = `    </graph>
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
window.reprintGraphMLFile = function(debug=false) {
    if (debug) { console.log("[DEBUG] fileIO.js - reprintGraphMLFile()"); }
    setGraphMLContent(defaultGraphMLHEADER+"\n");

    //<KEYS>
    setGraphMLContentAPPEND("    <!-- Attribute Keys -->\n");
    // Extract unique keys from node and edge properties
    let uniqueKeys = new Map();

    if (window.SJFI_data.graphObjects) {
        window.SJFI_data.graphObjects.forEach(object => {
            // Check if the properties array exists before trying to iterate over it
            if (object.type === 'node' && object.properties) {
                object.properties.forEach(property => {
                    // Store the unique keys per type
                    if (!uniqueKeys.has(object.type)) {
                        uniqueKeys.set(object.type, new Set());
                    }
                    uniqueKeys.get(object.type).add(property.key);
                });
            } else if (object.type === 'edge') {
                if (!uniqueKeys.has(object.type)) {
                    uniqueKeys.set(object.type, new Set());
                }
                uniqueKeys.get(object.type).add(object.key);
            }
        });
    }

    // Generate key XML for each unique key
    setGraphMLContentAPPEND("        <!-- supported types: boolean|int|long|float|double|string ; DEFAULT == STRING-->\n");
    let graphObjects = window.SJFI_data.graphObjects;
    let uniqueNodeKeys = new Set();
    let uniqueEdgeKeys = new Set();
    
    graphObjects.forEach(obj => {
        if (obj.type === "node") {
            uniqueNodeKeys.add('label');
            obj.properties.forEach(property => {
                if (property.key !== "") {
                    uniqueNodeKeys.add(property.key);
                }
            });
        } else if (obj.type === "edge") {
            uniqueEdgeKeys.add('label');
            if (obj.key !== "") {
                uniqueEdgeKeys.add(obj.key);
            }
        }
    });
    
    uniqueNodeKeys.forEach(key => {
        let keyXML = `        <key attr.name="KEY_NODE_ID_${key}" attr.type="string" for="node" id="${key}"/>\n`;
        setGraphMLContentAPPEND(keyXML);
    });
    
    uniqueEdgeKeys.forEach(key => {
        if (key !== "") {
            let keyXML = `        <key attr.name="KEY_EDGE_ID_${key}" attr.type="string" for="edge" id="${key}"/>\n`;
            setGraphMLContentAPPEND(keyXML);
        }
    });
        
    // <GRAPH>
    //OPTIONAL: <graph id="..."
    setGraphMLContentAPPEND('    <graph id="' + window.SJFI_data.graphSettingsTitle + '" edgedefault="' + window.SJFI_data.graphSettingsDirectionality + '">\n');

    //--------------------------------------------------------------------------------
    setGraphMLContentAPPEND("        <!-- Node Entries -->\n");
    // console.log("[DEBUG] Here are the loaded objects:\n" + window.SJFI_data.graphObjects);

    let nodeObjects = [];
    if (Array.isArray(window.SJFI_data.graphObjects)) {
        nodeObjects = window.SJFI_data.graphObjects.filter(object => object.type === 'node');
    }

    // const nodeObjects = window.SJFI_data.graphObjects.filter(object => object.type === 'node');

    // Iterate over nodeObjects and append node XML for each object
    nodeObjects.forEach((node) => {
        let nodeXML = `            <node id="${node.id}">\n`;

        nodeXML += `                <data key="label">${node.label}</data>\n`;

        // Iterate over the properties of each node
        node.properties.forEach((property) => {
            nodeXML += `                <data key="${property.key}">${property.value}</data>\n`;
        });

        nodeXML += "            </node>\n";

        setGraphMLContentAPPEND(nodeXML);
    });


    //--------------------------------------------------------------------------------
    setGraphMLContentAPPEND("        <!-- Edge Entries -->\n");
    if (window.SJFI_data.graphObjects) {
        const edgeObjects = window.SJFI_data.graphObjects.filter(object => object.type === 'edge');

        // Iterate over edgeObjects and append edge XML for each object
        //source: sourceNode, sourceId: sourceNodeId, target: targetNode, targetNode: targetNodeId 
        edgeObjects.forEach((edge) => {
            let edgeXML = `            <edge id="${edge.id}" source="${edge.sourceId}" target="${edge.targetId}">\n`;

            edgeXML += `                <data key="label">${edge.label}</data>\n`;

            if (edge.key !== "") {
                edgeXML += `                <data key="${edge.key}">${edge.value}</data>\n`;
            }

            edgeXML += "            </edge>\n";

            setGraphMLContentAPPEND(edgeXML);
        });
    }

    setGraphMLContentAPPEND(defaultGraphMLFOOTER);

    renderGraphMLToFileArea();
}



window.saveGraphMLFile = function(event) {
    var blob = new Blob([window.GraphMLXMLData], {type: "application/xml;charset=utf-8"});
    window.SJFIXMLExportText(blob, window.SJFI_data.graphSettingsTitle+".graphml");    
}
