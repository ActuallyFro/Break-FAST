// Add a colors object to keep track of node colors
let nodeColors = JSON.parse(localStorage.getItem('nodeColors')) || {};
let labelColor = localStorage.getItem('labelColor') || 'black';
// let nodeOutlineColor = localStorage.getItem('nodeOutlineColor') || 'black';
let nodeSettings = JSON.parse(localStorage.getItem('nodeSettings')) || {};

// // Initialize new settings
let fontSize = localStorage.getItem('fontSize') || '12';
let offsetX = localStorage.getItem('offsetX') || '0';
let offsetY = localStorage.getItem('offsetY') || '0';
let nodeRadius = localStorage.getItem('nodeRadius') || '20';




window.drawGraph = function(passedGraphObjects, debug = false) {
    // Define the dimensions of the SVG
    const width = 1750;
    const height = 800;

    // const nodes = window.SJFI_data.graphObjects.filter(object => object.type === 'node');
    const nodeObjects = passedGraphObjects.filter(object => object.type === 'node'); //SAME AS LINE ABOVE
    const edgeObjects = passedGraphObjects.filter(object => object.type === 'edge');


    // Define the SVG
    const svg = d3.select('#graph-svg')
        .attr('width', width)
        .attr('height', height)

    // Instead of appending elements directly to the SVG, we append them to a group element.
    const g = svg.append("g");

    // // // Create a new array of edges where source and target are node ids
    // const links = edgeObjects.map(edge => {
    //     const sourceNode = nodeObjects.find(node => node.id === edge.sourceId);
    //     const targetNode = nodeObjects.find(node => node.id === edge.targetId);
    //     return {
    //         ...edge,
    //         source: sourceNode.id, // use node.id instead of nodeObjects.indexOf(sourceNode)
    //         target: targetNode.id  // use node.id instead of nodeObjects.indexOf(targetNode)
    //     };
    // });

///////////////
    // Create a new array of edges where source and target are node ids
    const links = edgeObjects
        .map(edge => {
            const sourceNode = nodeObjects.find(node => node.id === edge.sourceId);
            const targetNode = nodeObjects.find(node => node.id === edge.targetId);

            if (!sourceNode || !targetNode) {
                // Either sourceNode or targetNode couldn't be found,
                // so we return null to exclude this edge from the links array
                return null;
            }

            return {
                ...edge,
                source: sourceNode.id, // use node.id instead of nodeObjects.indexOf(sourceNode)
                target: targetNode.id  // use node.id instead of nodeObjects.indexOf(targetNode)
            };
        })
        .filter(link => link !== null); // filter out the null values
////////////////


    // Define the simulation
    const simulation = d3.forceSimulation(nodeObjects) //replaced nodes
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(links).id(d => d.id))
        .on('tick', ticked);

    // Draw edges (literal line)
    const link = g.selectAll('.link')
        .data(links) // use links instead of edges
        .join('line')
        .attr('class', 'link')
        .attr('stroke', 'black');

    // Modify the node drawing code to use the color from nodeColors
    const node = g.selectAll('.node')
        .data(nodeObjects)
        .join('circle')
        .attr('class', 'node')
        .attr('r', d => nodeSettings[d.id] && nodeSettings[d.id].radius ? nodeSettings[d.id].radius : 20)
        .style('fill', d => nodeColors[d.id] || 'lightblue')
        .style('stroke', labelColor)
        .call(drag(simulation))
        .on('contextmenu', function(event, d) {
            event.preventDefault();

            d3.select('#context-menu')
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`)
                .style('display', 'block');

            d3.select('#color-picker').node().value = nodeColors[d.id] || '#000000';
            d3.select('#font-size').node().value = nodeSettings[d.id] && nodeSettings[d.id].fontSize ? nodeSettings[d.id].fontSize : '12';
            d3.select('#font-x-offset').node().value = nodeSettings[d.id] && nodeSettings[d.id].offsetX ? nodeSettings[d.id].offsetX : '0';
            d3.select('#font-y-offset').node().value = nodeSettings[d.id] && nodeSettings[d.id].offsetY ? nodeSettings[d.id].offsetY : '0';
            d3.select('#node-radius').node().value = nodeSettings[d.id] && nodeSettings[d.id].radius ? nodeSettings[d.id].radius : '20';

            d3.select('#color-picker').on('input', function() {
                nodeColors[d.id] = this.value;
                d3.select(event.currentTarget).style('fill', this.value);
                localStorage.setItem('nodeColors', JSON.stringify(nodeColors));
            });

            d3.select('#font-size').on('input', function() {
                d3.select(`#label${d.id}`).style('font-size', this.value + 'px');
                nodeSettings[d.id] = nodeSettings[d.id] || {};
                nodeSettings[d.id].fontSize = this.value;
                localStorage.setItem('nodeSettings', JSON.stringify(nodeSettings));
            });

            d3.select('#font-x-offset').on('input', function() {
                d3.select(`#label${d.id}`).attr('dx', this.value);
                nodeSettings[d.id] = nodeSettings[d.id] || {};
                nodeSettings[d.id].offsetX = this.value;
                localStorage.setItem('nodeSettings', JSON.stringify(nodeSettings));
            });

            d3.select('#font-y-offset').on('input', function() {
                d3.select(`#label${d.id}`).attr('dy', this.value);
                nodeSettings[d.id] = nodeSettings[d.id] || {};
                nodeSettings[d.id].offsetY = this.value;
                localStorage.setItem('nodeSettings', JSON.stringify(nodeSettings));
            });

            d3.select('#node-radius').on('input', function() {
                d3.select(event.currentTarget).attr('r', this.value);
                nodeSettings[d.id] = nodeSettings[d.id] || {};
                nodeSettings[d.id].radius = this.value;
                localStorage.setItem('nodeSettings', JSON.stringify(nodeSettings));
            });
        });

    // Draw labels - FOR NODES
    const label = g.selectAll('.label')
        .data(nodeObjects)
        .join('text')
        .attr('class', 'label')
        .text(d => d.label)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .style('fill', labelColor)
        .style('font-size', fontSize + 'px')
        .attr('dx', offsetX)
        .attr('dy', offsetY)
        .attr('text-anchor', 'middle');


    // // Draw edge labels
    const edgeLabel = g.selectAll('.edgelabel')
        .data(links)
        .join('text')
        .attr('class', 'edgelabel')
        .attr('id', (d, i) => 'edgelabel' + i)
        .attr('dx', 0)
        .attr('dy', 0)
        .attr('font-size', 10)
        .style('fill', '#aaa')
        .text(d => d.label);

    // Modify the zoom behavior to transform the group element instead of the SVG element
    const zoom = d3.zoom()
        .scaleExtent([0.1, 10]) // this can be [zoomOutMax, zoomInMax]
        .on('zoom', (event, d) => { 
            g.attr('transform', event.transform);
        });
    svg.call(zoom);

    

    // // Get computed styles
    // const nodesComputedStyles = window.getComputedStyle(d3.select('.node').node());
    // const linksComputedStyles = window.getComputedStyle(d3.select('.link').node());

    // Get computed styles
    const nodeElement = d3.select('.node').node();
    const linkElement = d3.select('.link').node();

    let nodesComputedStyles;
    let linksComputedStyles;

    if (nodeElement) {
        nodesComputedStyles = window.getComputedStyle(nodeElement);
    }

    if (linkElement) {
        linksComputedStyles = window.getComputedStyle(linkElement);
    }

    // Apply computed styles inline
    d3.selectAll('.node')
        .style('fill', nodesComputedStyles.fill)
        .style('stroke', 'black') //or `nodesComputedStyles.stroke`
        .style('stroke-width', nodesComputedStyles.strokeWidth);

    if (linksComputedStyles) {
        d3.selectAll('.link')
            .style('stroke', linksComputedStyles.stroke)
            .style('stroke-width', linksComputedStyles.strokeWidth);
    }

    // Define drag behavior
    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged);
            //.on('end', dragended); <-- resets position VS leaving it
    }

    // On right click on the SVG, show the context menu
    svg.on('contextmenu', function(event) {
        event.preventDefault();
        const menuWidth = document.getElementById('graph-context-menu').offsetWidth;

        d3.select('#graph-context-menu')
            .style('left', `${event.pageX - menuWidth}px`)
            .style('top', `${event.pageY}px`)
            .style('display', 'block');
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            d3.select('#graph-context-menu')
                .style('display', 'none');
        }
    });
    
    // New three-finger touch event -- to close context menu
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length === 3) {
            d3.select('#graph-context-menu')
                .style('display', 'none');
        }
    });
    // Add click event listeners for the context menu buttons
    document.getElementById('toggle-node-labels').addEventListener('click', () => {
        const display = window.getComputedStyle(d3.select('.label').node()).display === 'none' ? 'block' : 'none';
        d3.selectAll('.label').style('display', display);
        localStorage.setItem('nodeLabelsDisplay', display);
    });

    document.getElementById('toggle-edge-labels').addEventListener('click', () => {
        const display = window.getComputedStyle(d3.select('.edgelabel').node()).display === 'none' ? 'block' : 'none';
        d3.selectAll('.edgelabel').style('display', display);
        localStorage.setItem('edgeLabelsDisplay', display);
    });

    document.getElementById('zoom-in-button').addEventListener('click', () => {
        zoom.scaleBy(svg.transition().duration(750), 1.2);  // zoom in
    });
    
    document.getElementById('zoom-out-button').addEventListener('click', () => {
        zoom.scaleBy(svg.transition().duration(750), 0.8);  // zoom out
    });    

    function ticked() {
        node.attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => nodeSettings[d.id] && nodeSettings[d.id].radius ? nodeSettings[d.id].radius : 20)
            .style('fill', d => nodeColors[d.id] || 'lightblue');
    
        link.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
    
        label.attr('x', d => d.x)
            .attr('y', d => d.y)
            .style('font-size', d => nodeSettings[d.id] && nodeSettings[d.id].fontSize ? nodeSettings[d.id].fontSize + 'px' : '12px')
            .attr('dx', d => nodeSettings[d.id] && nodeSettings[d.id].offsetX ? nodeSettings[d.id].offsetX : '0')
            .attr('dy', d => nodeSettings[d.id] && nodeSettings[d.id].offsetY ? nodeSettings[d.id].offsetY : '0');
    
        // Update edge label positions
        edgeLabel.attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em');            
    }    

    return nodeObjects;
}

document.getElementById('toggle-label-color').addEventListener('click', () => {
    // Toggle the label color between black and white
    labelColor = labelColor === 'black' ? 'white' : 'black';
    // nodeOutlineColor= nodeOutlineColor === 'black' ? 'black' : 'white';

    // Update the color of the labels and the node stroke
    d3.selectAll('.label').style('fill', labelColor);
    //d3.selectAll('.edgelabel').style('fill', labelColor);
    // d3.selectAll('.node').style('stroke', nodeOutlineColor); // Update the node stroke color

    // Save the label color in localStorage
    localStorage.setItem('labelColor', labelColor);
    // localStorage.setItem('nodeOutlineColor', nodeOutlineColor);
});


  //MOVE to other buttons?
  document.getElementById('reset-d3-button').addEventListener('click', () => {
    window.SJFI_data.NodesRenderSettings.forEach(node => {
        node.fx = null;
        node.fy = null;
    });
    window.SJFI_data.NodesRenderSettings = drawGraph(window.SJFI_data.graphObjects);
  });

    document.getElementById('print-button').addEventListener('click', () => {
        const svgElement = document.getElementById('graph-svg');
        const blob = new Blob([svgElement.outerHTML], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph.svg';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
    
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
    
            const pngUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = 'graph.png';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(pngUrl);
        };
    
        img.src = svgUrl;
        setTimeout(() => URL.revokeObjectURL(url), 100);
    });


//////////////////////////////////////////////////
// Node X/Y save and load -- LOCALSTORAGE

document.getElementById('save-config-button').addEventListener('click', () => {
    saveNodePositions();
    alert('Saved to LocalStorage!');
});

document.getElementById('load-config-button').addEventListener('click', () => {
    loadNodePositions();
    // alert('Loaded from LocalStorage!');
});


// Save node positions to local storage
function saveNodePositions() {
    const nodePositions = {};
    window.SJFI_data.NodesRenderSettings.forEach(node => {
      nodePositions[node.id] = { x: node.x, y: node.y };
    });
    localStorage.setItem('nodePositions', JSON.stringify(nodePositions));
  }
  
  // Load node positions from local storage
  function loadNodePositions() {
    const nodePositions = JSON.parse(localStorage.getItem('nodePositions'));
    if (nodePositions) {
      window.SJFI_data.NodesRenderSettings.forEach(node => {
        const position = nodePositions[node.id];
        if (position) {
          node.fx = position.x;
          node.fy = position.y;
        }
      });
    }
  }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Node X/Y save and load -- LOCALSTORAGE
function saveNodePositionsToFile() {
    const config = {
        nodeData: {},
        labelVisibility: {
            nodeLabels: localStorage.getItem('nodeLabelsDisplay'),
            edgeLabels: localStorage.getItem('edgeLabelsDisplay'),
        },
    };

    window.SJFI_data.NodesRenderSettings.forEach(node => {
        config.nodeData[node.id] = { x: node.x, y: node.y, color: nodeColors[node.id] };
    });

    const data = JSON.stringify(config);
    const file = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'node-data-configuration.json';
    a.click();
}

  
function loadNodePositionsFromFile(file) {
    console.log('Loading node data from file...');
    const reader = new FileReader();
    reader.onload = event => {
        const config = JSON.parse(event.target.result);

        // WHY ARE THESE HERE????
        // // // Load graph objects, title, and directionality
        // // window.graphObjects = config.objects;
        // // window.graphTitle = config.title;
        // // window.graphDirectionality = config.directionality;

        // Load your settings
        nodeColors = config.nodeColors;
        labelColor = config.labelColor;
        nodeSettings = config.nodeSettings;
        fontSize = config.fontSize;
        offsetX = config.offsetX;
        offsetY = config.offsetY;
        nodeRadius = config.nodeRadius;

        // Update localStorage with the new settings
        localStorage.setItem('nodeColors', JSON.stringify(nodeColors));
        localStorage.setItem('labelColor', labelColor);
        localStorage.setItem('nodeSettings', JSON.stringify(nodeSettings));
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('offsetX', offsetX);
        localStorage.setItem('offsetY', offsetY);
        localStorage.setItem('nodeRadius', nodeRadius);

        window.SJFI_data.NodesRenderSettings.forEach(node => {
            const data = config.nodeData[node.id];
            if (data) {
                node.fx = data.x;
                node.fy = data.y;
                if (data.color) {
                    nodeColors[node.id] = data.color;
                }
            }
        });

        if (config.labelVisibility) {
            d3.selectAll('.label').style('display', config.labelVisibility.nodeLabels);
            d3.selectAll('.edgelabel').classed('hidden', config.labelVisibility.edgeLabels === 'none');
            localStorage.setItem('nodeLabelsDisplay', config.labelVisibility.nodeLabels);
            localStorage.setItem('edgeLabelsDisplay', config.labelVisibility.edgeLabels);
        }
    };
    reader.readAsText(file);
}


//   document.addEventListener('DOMContentLoaded', () => {
//     // document.getElementById('export-config-button').addEventListener('click', () => {
//     //     saveNodePositionsToFile();
//     // });
    
//     // document.getElementById('import-config-button').addEventListener('click', () => {
//     //     document.getElementById('import-config-file').click();
//     // });
    
//     // document.getElementById('import-config-file').addEventListener('change', event => {
//     //     const file = event.target.files[0];
//     //     loadNodePositionsFromFile(file);
//     // });

// });
//////////////////////////////////////////////////



// // Modify the ticked function to update the node color
// function ticked() {

//     // rest of your code
// }

// Add an event handler to hide the context menu when you click outside of it
window.addEventListener('click', function(event) {
    const contextMenu = document.getElementById('context-menu');
    if (event.target !== contextMenu && !contextMenu.contains(event.target)) {
        contextMenu.style.display = 'none';
    }
});




///////////////////



