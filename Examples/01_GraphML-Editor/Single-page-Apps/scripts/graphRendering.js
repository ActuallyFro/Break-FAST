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
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(links).id(d => d.id))
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
                nodeSettings.fillColor = this.value;
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
                //console.log('[DEBUG] Context Menu LEFT! -- SAVING TO LOCAL STORAGE');
                storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
                drawGraph();  // Refresh graph
            });
            
            d3.select('#context-menu-details').html(`
                <b><u>Node ID:</u> ${d.id}</b><br>
                ${d.properties.map(prop => `${prop.key}: ${prop.value}<br>`).join('')}
                <hr>
            `);                        

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
    
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length === 3) {
            d3.select('#graph-context-menu')
                .style('display', 'none');
        }
    });

    document.getElementById('toggle-node-labels').addEventListener('click', () => {
        const display = window.getComputedStyle(d3.select('.label').node()).display === 'none' ? 'block' : 'none';
        d3.selectAll('.label').style('display', display);
        //localStorage.setItem('nodeLabelsDisplay', display);
    });

    document.getElementById('toggle-edge-labels').addEventListener('click', () => {
        const display = window.getComputedStyle(d3.select('.edgelabel').node()).display === 'none' ? 'block' : 'none';
        d3.selectAll('.edgelabel').style('display', display);
        //localStorage.setItem('edgeLabelsDisplay', display);
    });

    document.getElementById('zoom-in-button').addEventListener('click', () => {
        zoom.scaleBy(svg.transition().duration(750), 1.2);  // zoom in
    });
    
    document.getElementById('zoom-out-button').addEventListener('click', () => {
        zoom.scaleBy(svg.transition().duration(750), 0.8);  // zoom out
    });
     
    function ticked() {
        node.attr('cx', d => (d.x && !isNaN(d.x)) ? d.x : 0)
            .attr('cy', d => (d.y && !isNaN(d.y)) ? d.y : 0)
            .attr('r', d => d.renderSettings[0].radiusSize)
            .style('fill', d => d.renderSettings[0].nodeColor);
    
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
    }
    

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
    //localStorage.setItem('labelColor', labelColor);
    // //localStorage.setItem('nodeOutlineColor', nodeOutlineColor);
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
