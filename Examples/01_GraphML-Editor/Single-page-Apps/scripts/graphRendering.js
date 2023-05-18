// Add a colors object to keep track of node colors
let nodeColors = JSON.parse(localStorage.getItem('nodeColors')) || {};

window.drawGraph = function(graphObjects, debug = false) {
    // Define the dimensions of the SVG
    const width = 1200;
    const height = 800;

    // Get nodes and edges from the graphObjects array
    const nodes = graphObjects.filter(object => object.type === 'node');
    const edges = graphObjects.filter(object => object.type === 'edge');

    // Separate nodes and edges
    const nodeObjects = graphObjects.filter(object => object.type === 'node');
    const edgeObjects = graphObjects.filter(object => object.type === 'edge');

    // Define the SVG
    const svg = d3.select('#graph-svg')
        .attr('width', width)
        .attr('height', height);

    // Create a new array of edges where source and target are node ids
    const links = edgeObjects.map(edge => {
        const sourceNode = nodeObjects.find(node => node.id === edge.sourceId);
        const targetNode = nodeObjects.find(node => node.id === edge.targetId);
        return {
            ...edge,
            source: sourceNode.id, // use node.id instead of nodeObjects.indexOf(sourceNode)
            target: targetNode.id  // use node.id instead of nodeObjects.indexOf(targetNode)
        };
    });

    // Draw edges
    const link = svg.selectAll('.link')
        .data(links) // use links instead of edges
        .join('line')
        .attr('class', 'link')
        .attr('stroke', 'black');
        
    // Define the simulation
    const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(links).id(d => d.id))
        .on('tick', ticked);

    // // Draw nodes
    // const node = svg.selectAll('.node')
    //     .data(nodes)
    //     .join('circle')
    //     .attr('class', 'node')
    //     .attr('r', 20)
    //     .attr('fill', 'lightblue')
    //     .call(drag(simulation));


// Modify the node drawing code to use the color from nodeColors
const node = svg.selectAll('.node')
    .data(nodes)
    .join('circle')
    .attr('class', 'node')
    .attr('r', 20)
    .attr('fill', d => nodeColors[d.id] || 'lightblue') // Use the color from nodeColors if it exists
    .call(drag(simulation))
    .on('contextmenu', function(event, d) { // Add a right-click handler
        event.preventDefault();

        // Show the context menu at the mouse position
        d3.select('#context-menu')
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY}px`)
            .style('display', 'block');

        // Update the color picker when it changes
        d3.select('#color-picker').node().value = nodeColors[d.id] || '#000000';

        // When the color picker value changes, update nodeColors and the node color
        d3.select('#color-picker').on('input', function() {
            nodeColors[d.id] = this.value;
            d3.select(event.currentTarget).style('fill', this.value);
            localStorage.setItem('nodeColors', JSON.stringify(nodeColors));
        });
    });

    // Draw labels - FOR NODES
    const label = svg.selectAll('.label')
        .data(nodes)
        .join('text')
        .attr('class', 'label')
        .text(d => d.label)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

    // Draw edge labels
    const edgeLabel = svg.selectAll('.edgelabel')
        .data(links)
        .join('text')
        .attr('class', 'edgelabel')
        .attr('id', (d, i) => 'edgelabel' + i)
        .attr('dx', 80)
        .attr('dy', 0)
        .attr('font-size', 10)
        .style('fill', '#aaa')
        .text(d => d.label);

    // Update the positions of edge labels in ticked()
    edgeLabel.attr('transform', function(d) {
        if (d.target.x < d.source.x) {
            const bbox = this.getBBox();

            const rx = bbox.x + bbox.width / 2;
            const ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
        } else {
            return 'rotate(0)';
        }
    });

    // Update the positions of the nodes, edges, and labels
    function ticked() {
        node.attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', d => nodeColors[d.id] || 'lightblue');

        node.attr('cx', d => d.x)
            .attr('cy', d => d.y);

        link.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        label.attr('x', d => d.x)
            .attr('y', d => d.y);
    }

    // Get computed styles
    const nodesComputedStyles = window.getComputedStyle(d3.select('.node').node());
    const linksComputedStyles = window.getComputedStyle(d3.select('.link').node());

    // Apply computed styles inline
    d3.selectAll('.node')
        .style('fill', nodesComputedStyles.fill)
        .style('stroke', nodesComputedStyles.stroke)
        .style('stroke-width', nodesComputedStyles.strokeWidth);

    d3.selectAll('.link')
        .style('stroke', linksComputedStyles.stroke)
        .style('stroke-width', linksComputedStyles.strokeWidth);


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

        d3.select('#graph-context-menu')
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY}px`)
            .style('display', 'block');
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


    return nodes;
}




  //MOVE to other buttons?
  document.getElementById('reset-d3-button').addEventListener('click', () => {
    RenderNodes.forEach(node => {
        node.fx = null;
        node.fy = null;
    });
    RenderNodes = drawGraph(graphObjects);
  });

// Now you can export the SVG to a new tab
// Puts graph into a new tab -- but cannot be saved as SVG
// document.getElementById('print-button').addEventListener('click', () => {
//     const svgElement = document.getElementById('graph-svg');
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write('<html><head><title>Print</title>');
//     printWindow.document.write('</head><body>');
//     printWindow.document.write(svgElement.outerHTML);
//     printWindow.document.write('</body></html>');
//     printWindow.document.close();
// });


    // DOES NOT run: -- open in new tab
    // const svgData = new XMLSerializer().serializeToString(svgElement);
    // const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    // const svgUrl = URL.createObjectURL(svgBlob);

    // const img = new Image();

    // img.onload = function() {
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     canvas.width = svgElement.viewBox.baseVal.width;
    //     canvas.height = svgElement.viewBox.baseVal.height;
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //     const pngUrl = canvas.toDataURL('image/png');
    //     window.open(pngUrl, '_blank');
    // };

    // img.src = svgUrl;
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
    RenderNodes.forEach(node => {
      nodePositions[node.id] = { x: node.x, y: node.y };
    });
    localStorage.setItem('nodePositions', JSON.stringify(nodePositions));
  }
  
  // Load node positions from local storage
  function loadNodePositions() {
    const nodePositions = JSON.parse(localStorage.getItem('nodePositions'));
    if (nodePositions) {
      RenderNodes.forEach(node => {
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

    RenderNodes.forEach(node => {
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
        RenderNodes.forEach(node => {
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

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('export-config-button').addEventListener('click', () => {
        saveNodePositionsToFile();
    });
    
    document.getElementById('import-config-button').addEventListener('click', () => {
        document.getElementById('import-config-file').click();
    });
    
    document.getElementById('import-config-file').addEventListener('change', event => {
        const file = event.target.files[0];
        loadNodePositionsFromFile(file);
    });

});
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



