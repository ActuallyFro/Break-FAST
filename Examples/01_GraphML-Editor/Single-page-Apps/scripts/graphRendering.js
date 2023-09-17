// Add a colors object to keep track of node colors
// let nodeOutlineColor = localStorage.getItem('nodeOutlineColor') || 'black';
// let nodeColors = JSON.parse(localStorage.getItem('nodeColors')) || {};
// let labelColor = localStorage.getItem('labelColor') || 'black';
// let nodeSettings = JSON.parse(localStorage.getItem('nodeSettings')) || {};

let nodeColors = window.SJFI_data?.nodeColors || {};
let labelColor = window.SJFI_data?.labelColor || 'black';
let nodeSettings = window.SJFI_data?.nodeSettings || {};

// // Initialize new settings
let fontSize = localStorage.getItem('fontSize') || '12';
let offsetX = localStorage.getItem('offsetX') || '0';
let offsetY = localStorage.getItem('offsetY') || '0';
// let nodeRadius = localStorage.getItem('nodeRadius') || '20';

function showNodePopup(node, event) {

    const popup = document.getElementById('node-popup');
  
    // // FULL DEBUG content:
    // let popupContent = '';
    // for (const [key, value] of Object.entries(node)) {
    //     popupContent += `<p><strong>${key}:</strong> ${value}</p>`;
    // }
    // popup.innerHTML = popupContent;

    // Render the Node ID name (underlined and bolded, ending in a colon)
    let popupContent = `<p><strong><u>ID: ${node.id}</u></strong></p>`;

    // Render ALL the key/value pairs from the properties object within entries
    const nodeProperties = node.properties || [];
    for (const property of nodeProperties) {
        popupContent += `<p><strong>${property.key}:</strong> ${property.value}</p>`;
    }

    popup.innerHTML = popupContent;

    // Get mouse position
    const mouseX = event.pageX; 
    const mouseY = event.pageY;

    // Float by Mouse code
    // Offset popup to right
    const x = mouseX + 20;
    // Center vertically on mouse
    const y = mouseY - (popup.offsetHeight / 2);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';

    // // Position relative to node
    // const x = node.x; 
    // const y = node.y;
  
    // popup.style.left = x + 'px';
    // popup.style.top = y + 'px';
    
    popup.style.display = 'block';  
}

function hideNodePopup() {
    const popup = document.getElementById('node-popup');
    popup.style.display = 'none';
}

window.drawGraph = function(passedGraphObjects, debug = false) {
    const width = 1750;
    const height = 800;

    const svg = d3.select('#graph-svg')
        .attr('width', width)
        .attr('height', height)

    svg.selectAll('*').remove();

    const g = svg.append("g");

    const links = window.SJFI_data.graphObjects
        .filter(object => object.type === 'edge')
        .map(edge => {
            const sourceNode = window.SJFI_data.graphObjects.find(node => node.id === edge.sourceId);
            const targetNode = window.SJFI_data.graphObjects.find(node => node.id === edge.targetId);

            if (!sourceNode || !targetNode) {
                return null;
            }

            return {
                ...edge,
                source: sourceNode.id,
                target: targetNode.id
            };
        })
        .filter(link => link !== null);
    
    const simulation = d3.forceSimulation(window.SJFI_data.graphObjects.filter(object => object.type === 'node'))
        .force('charge', d3.forceManyBody().strength(-0.1))
        .force('collide', d3.forceCollide(30))
        .force('link', d3.forceLink(links).id(d => d.id).strength(0.35))
        .on('tick', ticked);

    const link = g.selectAll('.link')
        .data(links)
        .join('line')
        .attr('class', 'link')
        .attr('stroke', 'black');

        const node = g.selectAll('.node')
        .data(window.SJFI_data.graphObjects.filter(object => object.type === 'node'))
        .join('circle')
        .attr('class', 'node')
        .attr('r', d => d.renderSettings[0].radiusSize)
        .style('fill', d => d.renderSettings[0].nodeColor)
        .style('stroke', d => d.renderSettings[0].outlineColor)
        .each(function(d) {
            d.x = this.cx.baseVal.value;
            d.y = this.cy.baseVal.value;
        })
        .on('contextmenu', function(event, d) {
            event.preventDefault();
    
            d3.select('#context-menu')
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`)
                .style('display', 'block');

            let nodeSettings = window.SJFI_data.graphObjects.find(node => node.id === d.id).renderSettings[0];

            d3.select('#color-picker').node().value = nodeSettings.nodeColor || '#000000';
            d3.select('#font-size').node().value = nodeSettings.labelFontSize || '12';
            d3.select('#font-x-offset').node().value = nodeSettings.labelOffsetX || '0';
            d3.select('#font-y-offset').node().value = nodeSettings.labelOffsetY || '0';
            d3.select('#node-radius').node().value = nodeSettings.radiusSize || '20';
    
            d3.select('#color-picker').on('input', function() {
                nodeSettings.nodeColor = this.value;
                // nodeSettings.fillColor = this.value;
                d3.select(event.currentTarget).style('fill', this.value);
            });
    
            d3.select('#font-size').on('input', function() {
                nodeSettings.labelFontSize = this.value;
                d3.select("#label-" + d.id).style('font-size', this.value + 'px');
                drawGraph();  // Refresh graph
            });
        
            d3.select('#font-x-offset').on('input', function() {
                nodeSettings.labelOffsetX = this.value;
                d3.select("#label-" + d.id).attr('dx', this.value);
                drawGraph();  // Refresh graph
            });
        
            d3.select('#font-y-offset').on('input', function() {
                nodeSettings.labelOffsetY = this.value;
                d3.select("#label-" + d.id).attr('dy', this.value);
                drawGraph();  // Refresh graph
            });
    
            d3.select('#node-radius').on('input', function() {
                nodeSettings.radiusSize = this.value;
                d3.select(event.currentTarget).attr('r', this.value);
            });

            d3.select('#unlock-node-button').on('click', function() {
            /// - if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

            d3.select('#context-menu').on('mouseleave', function() {
                // simulation.alpha(startingAlpha); //CLAUDE
                // simulation.restart(); //CLAUDE
                //console.log('[DEBUG] Context Menu LEFT! -- SAVING TO LOCAL STORAGE');
                storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
                drawGraph();  // Refresh graph
            });


            // ok-to-save-button -- when clicked, save 'nodeSettings' from all 'this'
            //CLAUDE -- START
            d3.select('#ok-to-save-button').on('click', () => {

                // Get current node
                const node = d;
              
                // Get settings
                const color = d3.select('#color-picker').node().value;
                const fontSize = d3.select('#font-size').node().value; 
                const offsetX = d3.select('#font-x-offset').node().value;
                const offsetY = d3.select('#font-y-offset').node().value;
                const radius = d3.select('#node-radius').node().value;
              
                // Update node settings
                const nodeSettings = node.renderSettings[0];
                nodeSettings.nodeColor = color;
                nodeSettings.labelFontSize = fontSize;
                nodeSettings.labelOffsetX = offsetX;
                nodeSettings.labelOffsetY = offsetY;
                nodeSettings.radiusSize = radius;
              

                storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);

                drawGraph();
              
              });
            //CLAUDE -- END            
            
            d3.select('#context-menu-details').html(`
                <b><u>Node ID:</u> ${d.id}</b><br>
                ${d.properties.map(prop => `${prop.key}: ${prop.value}<br>`).join('')}
                <button id="edit-button">Edit</button>
                <hr>
            `);

            d3.select('#context-menu-details').append('div')
                .attr('id', 'connect-edge-div')
                .html(`<u><b>Connect to Edge:</b></u><br>`);

            //Add a dropdown menu to select node to connect to, pulled from all other nodes
            d3.select('#connect-edge-div').append('select')
                .attr('id', 'connect-edge-select')
                .selectAll('option')
                .data(window.SJFI_data.graphObjects.filter(object => object.type === 'node'))
                .enter()
                .append('option')
                .attr('value', d => d.id)
                .text(d => d.label);
            
            d3.select('#context-menu-details').append('div')
                .attr('id', 'connect-edge-div')
                .html(`
                    <button id="connect-edge-button">Add Edge</button>
                    <hr>
                `);

        
            d3.select("#edit-button").on('click', () => {
                editObject(d);
                document.getElementById("edit-header").scrollIntoView();
            });

            d3.select("#connect-edge-button").on('click', () => {
                addObjectEdgeFromContextMenu(d);
                document.getElementById("edit-header").scrollIntoView();
            });


        })
        .call(drag(simulation));
    
    // const nodesData = window.SJFI_data.graphObjects.filter(object => object.type === 'node');
    const nodesData = window.SJFI_data.graphObjects
        .filter(object => object.type === 'node')
        .map(node => ({...node, x: 0, y: 0}));

    const edgesData = window.SJFI_data.graphObjects.filter(object => object.type === 'edge');
    
    const label = g.selectAll('.label')
        .data(window.SJFI_data.graphObjects.filter(object => object.type === 'node'))
        .join('text')
        .attr('class', 'label')
        .text(d => d.label)
        .attr('dx', d => d.renderSettings[0].labelOffsetX)
        .attr('dy', d => d.renderSettings[0].labelOffsetY)
        .style('fill', d => d.renderSettings[0].labelColor)
        .style('font-size', d => `${d.renderSettings[0].labelFontSize}px`)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('text-anchor', 'middle');

    const edgeLabel = g.selectAll('.edgelabel')
        .data(edgesData)
        .join('text')
        .attr('class', 'edgelabel')
        .text(d => d.label)
        .attr('dx', 0)
        .attr('dy', 0)
        .style('fill', d => d.renderSettings[0].labelColor)
        .attr('font-size', d => `${d.renderSettings[0].labelFontSize}px`)
        .attr('id', (d, i) => 'edgelabel' + i);

    const zoom = d3.zoom()
        .scaleExtent([0.1, 10]) // this can be [zoomOutMax, zoomInMax]
        .on('zoom', (event, d) => { 
            g.attr('transform', event.transform);
        });
    svg.call(zoom);
    
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

    d3.selectAll('.node')
        .style('fill', nodesComputedStyles.fill)
        .style('stroke', 'black') //or `nodesComputedStyles.stroke`
        .style('stroke-width', nodesComputedStyles.strokeWidth);

    if (linksComputedStyles) {
        d3.selectAll('.link')
            .style('stroke', linksComputedStyles.stroke)
            .style('stroke-width', linksComputedStyles.strokeWidth);
    }

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
    
        /*
        The robot says:
        Also, note that simulation.alphaTarget(0.3).restart(); and simulation.alphaTarget(0); are used to heat up and cool down the simulation, respectively.
        When the simulation is "heated" (i.e., when alphaTarget is set to a higher value), the forces have a greater impact and nodes move more freely.
        When it's "cooled down" (i.e., when alphaTarget is set to a lower value), the forces have less impact and nodes move less.
        */

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            // console.log('[DEBUG] drag ended -- SAVING TO LOCAL STORAGE');
            // console.log('[DEBUG] nodeSettings', nodeSettings);
            storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
        }
    
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // On right click on the SVG, show the context menu
    svg.on('contextmenu', function(event) {
        event.preventDefault();
        
        const startingAlpha = simulation.alpha(); // CLAUDE
        
        const menuWidth = document.getElementById('graph-context-menu').offsetWidth;

        d3.select('#graph-context-menu')
            .style('left', `${event.pageX - menuWidth}px`)
            .style('top', `${event.pageY}px`)
            .style('display', 'block');
        
        //Find <button id="object-add-node">
        const addNodeButton = document.getElementById('object-add-node');

        //CLAUDE -- START
        // const addNodeButton = document.createElement('button');
        // addNodeButton.id = 'add-node-button'; 
        // addNodeButton.textContent = 'Add Node';
        
        // document.getElementById('graph-context-menu')
        //     .appendChild(addNodeButton);            
        addNodeButton.addEventListener('click', () => {
            addObjectNodeFromRightClickMenu("Node#");
            document.getElementById("edit-header").scrollIntoView();
            
        });
        //CLAUDE -- END
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            d3.select('#graph-context-menu')
                .style('display', 'none');
        }
    });
    
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length === 3) {
            d3.select('#graph-context-menu')
                .style('display', 'none');
        }
    });

    document.getElementById('toggle-node-labels').addEventListener('click', () => {
        const currentDisplay = window.SJFI_data.renderDisplayLabelsNodes;
        const newDisplay = currentDisplay === 'none' ? 'block' : 'none';
        window.SJFI_data.renderDisplayLabelsNodes = newDisplay;
        storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
        drawGraph();
    });

    document.getElementById('toggle-edge-labels').addEventListener('click', () => {
        const currentDisplay = window.SJFI_data.renderDisplayLabelsEdges;
        const newDisplay = currentDisplay === 'none' ? 'block' : 'none';
        window.SJFI_data.renderDisplayLabelsEdges = newDisplay;
        storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
        drawGraph();
    });

    document.getElementById('zoom-in-button').addEventListener('click', () => {
        zoom.scaleBy(svg.transition().duration(750), 1.2);  // zoom in
    });
    
    document.getElementById('zoom-out-button').addEventListener('click', () => {
        zoom.scaleBy(svg.transition().duration(750), 0.8);  // zoom out
    });
     
    function ticked() {
        // if (simulation.alpha() < 0.005) return; //CLAUDE

        node.attr('cx', d => (d.x && !isNaN(d.x)) ? d.x : 0)
            .attr('cy', d => (d.y && !isNaN(d.y)) ? d.y : 0)
            .attr('r', d => d.renderSettings[0].radiusSize)
            .style('fill', d => d.renderSettings[0].nodeColor)
            .on('mouseover', function(event, d) {
                showNodePopup(d, event); 
                console.log('[DEBUG] mouseover -- Trying to render popup');
            })
            .on('mouseout', hideNodePopup);
    
        link.attr('x1', d => (d.source.x && !isNaN(d.source.x)) ? d.source.x : 0)
            .attr('y1', d => (d.source.y && !isNaN(d.source.y)) ? d.source.y : 0)
            .attr('x2', d => (d.target.x && !isNaN(d.target.x)) ? d.target.x : 0)
            .attr('y2', d => (d.target.y && !isNaN(d.target.y)) ? d.target.y : 0);
    
        label.attr('x', d => (d.x && !isNaN(d.x)) ? d.x : 0)
            .attr('y', d => (d.y && !isNaN(d.y)) ? d.y : 0)
            .style('font-size', d => `${d.renderSettings[0].labelFontSize}px`)
            .attr('dx', d => `${d.renderSettings[0].labelOffsetX}`)
            .attr('dy', d => `${d.renderSettings[0].labelOffsetY}`);
    
        edgeLabel.attr('x', d => {
            let edge = links.find(link => link.id === d.id);
            return edge ? (edge.source.x + edge.target.x) / 2 : 0;
        })
            .attr('y', d => {
                let edge = links.find(link => link.id === d.id);
                return edge ? (edge.source.y + edge.target.y) / 2 : 0;
            })
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em');

        d3.selectAll('.label').style('fill', window.SJFI_data.labelColor);
        d3.selectAll('.label').style('display', window.SJFI_data.renderDisplayLabelsNodes);
        d3.selectAll('.edgelabel').style('display', window.SJFI_data.renderDisplayLabelsEdges);        
    }
}

document.getElementById('toggle-label-color').addEventListener('click', () => {
    let flippedLabelColor = window.SJFI_data.labelColor === 'black' ? 'white' : 'black';

    window.SJFI_data.labelColor = flippedLabelColor;
    storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);

    d3.selectAll('.label').style('fill', flippedLabelColor);
    drawGraph();
});

/////////////////////////////////////////////////////////////////////////////////////
//   document.getElementById('reset-d3-button').addEventListener('click', () => {
//     window.SJFI_data.graphObjects.forEach(node => {
//         node.fx = null;
//         node.fy = null;
//     });

//     drawGraph(window.SJFI_data.graphObjects);
//   });

document.getElementById('reset-d3-button').addEventListener('click', () => {
    // Show confirm modal
    $('#confirmModal').modal('show');
});

document.getElementById('confirmResetButton').addEventListener('click', () => {
    window.SJFI_data.graphObjects.forEach(node => {
        node.fx = null;
        node.fy = null;
    });

    drawGraph(window.SJFI_data.graphObjects);

    // Hide confirm modal
    $('#confirmModal').modal('hide');
    storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
});

  /////////////////////////////////////////////////////////////////////////////////////


  

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


window.addEventListener('click', function(event) {
    const contextMenu = document.getElementById('context-menu');
    if (event.target !== contextMenu && !contextMenu.contains(event.target)) {
        contextMenu.style.display = 'none';
        document.getElementById('context-menu-details').innerHTML = '';
    }
});
