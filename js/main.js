import paper from 'paper';
import { Layer, project, tool } from 'paper/dist/paper-core';
import { addNewElement, layerComponent,layerStyle } from './components/layerComponent';


let gridPoints = 100;
let filename = 'output.cif';
let params;
const canvas = document.querySelector('#window');
const { width } = canvas.getBoundingClientRect();
console.log(width);
paper.setup(canvas);
paper.view.viewSize = new paper.Size(width - 30, document.body.clientHeight);
const layerMenu = document.getElementById('layerMenu');

function parseCIF(file) {
    console.log('parse');
    let reader = new FileReader();
    reader.readAsText(file);
    layerMenu.querySelector('#layerItems').innerHTML = '';

    let currentElement = '';
    let addText = false;
    reader.onload = function () {
        for (let line of reader.result.replace('\n','').split(';')) {
            line = line.trim();
            if (line[0] === 'L') {
                if (line[2] === 'T') {
                    addText = true;
                    currentElement = line.slice(2);
                } else {
                    addText = false;
                    currentElement = line.slice(2);
                }
            } else if (line.slice(0, 1) === 'DS') {
                params = line.slice(2).trim().split(' ');
            } else if (line[0] === 'P') {
                if (!layerStyle.has(currentElement)) addNewElement(currentElement); 
                    //create a paper js layer if it was not created
                    let currentLayer;
                    if (paper.project.getItem({ name: currentElement, recursive: false }) === null) {
                        currentLayer = new paper.Layer({ name: currentElement });
                        paper.project.addLayer(currentLayer);

                        createLayerToggle(currentElement);
                    } else {
                        currentLayer = paper.project.layers[currentElement];
                    }
                    let coordsList = line.slice(2).split(' ').filter(function (el) { return el != ''; }).map(Number);


                    layerComponent({
                        coordsList: coordsList,
                        addText: addText,
                        type: currentElement,
                        layer: currentLayer,
                        params: params
                    });
            }
        }
    };
    reader.onerror = function () {
        console.log(reader.error);
    };
}

let drawGridLines = function (num_rectangles_wide, num_rectangles_tall, boundingRect) {
    let width_per_rectangle = boundingRect.width / num_rectangles_wide;
    let height_per_rectangle = boundingRect.height / num_rectangles_tall;
    for (let i = 0; i <= num_rectangles_wide; i++) {
        let xPos = boundingRect.left + i * width_per_rectangle;
        let topPoint = new paper.Point(xPos, boundingRect.top);
        let bottomPoint = new paper.Point(xPos, boundingRect.bottom);
        let aLine = new paper.Path.Line(topPoint, bottomPoint);
        aLine.strokeColor = 'black';
    }
    for (let i = 0; i <= num_rectangles_tall; i++) {
        let yPos = boundingRect.top + i * height_per_rectangle;
        let leftPoint = new paper.Point(boundingRect.left, yPos);
        let rightPoint = new paper.Point(boundingRect.right, yPos);
        let aLine = new paper.Path.Line(leftPoint, rightPoint);
        aLine.strokeColor = 'black';
    }
};
function drawGrid(gridSize) {
    let canvasWidth = paper.view.size.width;
    let canvasHeight = paper.view.size.height;

    // Calculate the distance between each line
    let lineDistance = canvasWidth / gridSize;

    // Draw horizontal lines
    for (let i = 0; i <= gridSize; i++) {
        let yPos = i * lineDistance;
        let topPoint = new paper.Point(0, yPos);
        let bottomPoint = new paper.Point(canvasWidth, yPos);
        let line = new paper.Path.Line(topPoint, bottomPoint);
        line.strokeColor = '#dee0df';
        line.strokeWidth = thin_width;
    }

    // Draw vertical lines
    for (let i = 0; i <= gridSize; i++) {
        let xPos = i * lineDistance;
        let leftPoint = new paper.Point(xPos, 0);
        let rightPoint = new paper.Point(xPos, canvasHeight);
        let line = new paper.Path.Line(leftPoint, rightPoint);
        line.strokeColor = '#dee0df';
        line.strokeWidth = thin_width;
    }
    return lineDistance;
}

const cifImport = document.getElementById('importCIF');
cifImport.addEventListener('change', event => {
    console.log(event.target.files[0]);
    paper.project.clear();
    parseCIF(event.target.files[0]);
    cifImport.value = '';
});

layerMenu.addEventListener('click', event => {
    if (paper.project.layers[event.target.id] && event.target.classList.contains('layerItem')) {
        event.target.classList.toggle('disabled');
        paper.project.layers[event.target.id].visible = !event.target.classList.contains('disabled');
    }
});

//Mouse coordinates
const coordWindows = document.getElementById('coordWindow');
function getMouseCoords(event) {
    coordWindows.children[0].innerHTML = 'x: ' + event.point.x.toFixed(1);
    coordWindows.children[1].innerHTML = 'y: ' + event.point.y.toFixed(1);
}

paper.project.view.onMouseMove = getMouseCoords;

//Moving the canvas
let startPoint = new paper.Point([0, 0]);
function getStartCoords(event) {
    startPoint = event.point;
}
function moveCanvas(event) {
    paper.project.view.translate([event.point.x - startPoint.x, event.point.y - startPoint.y]);
}
paper.project.view.onMouseDown = getStartCoords;

paper.project.view.onMouseDrag = moveCanvas;



//Selecting the item

function selectItem(event) {}

//Choosing a tool

const toolMenu = document.getElementById('sideMenu');

let zoomFactor = 1;

let zoomIncrement = 0.05;

document.addEventListener('wheel', event => {
    const increment = -0.01 * Math.log10(Math.abs(event.deltaY)) * Math.sign(event.deltaY);

    const res = paper.project.view.zoom + increment;
    paper.project.view.zoom = res >= 1 ? 1 : res <= 0.05 ? 0.05 : res;
});
//Prevent canvas from scrolling when zooming
canvas.addEventListener('wheel',(event)=>{event.preventDefault();})

toolMenu.addEventListener('click', event => {
    switch (event.target.id) {
        case 'zoomIn':
            zoomFactor += zoomIncrement;
            paper.project.view.zoom = zoomFactor;
            break;
        case 'zoomOut':
            zoomFactor -= zoomIncrement;
            paper.project.view.zoom = zoomFactor;
            break;
        case 'zoomFit':
            // zoom fit
            let max_bound = new paper.Rectangle();

            paper.project.layers.forEach(element => {
                if (element.visible === true) {
                    max_bound = max_bound.unite(element.bounds);
                }
            });

            paper.project.view.scale(paper.project.view.bounds.width / max_bound.width);

            zoomFactor = paper.project.view.zoom;
            paper.project.view.update();

            break;
        case 'select':
            paper.project.view.onMouseMove = selectItem;
    }
});

//toggles are created when the CIF is parsed
function createLayerToggle(name) {
    const layerItem = document.createElement('p');
    layerItem.className = 'layerItem';
    layerItem.id = name;
    layerItem.innerHTML = name;
    layerMenu.querySelector('#layerItems').appendChild(layerItem);
}

//Testing out all components
/*TP({start:[20,20], end : [50,150]});
 
single_joint({center : [100,300], type: 'CMA'});
single_joint({center : [100,350], type: 'CM1'});
dual_joint({start : [150,50], end : [150,100]});
let dist = 50;
for (let f of componentMapping.values()){
    f({start:[100,dist], end:[300,dist]});
    dist+=50;
}*/

//let gridDistance = drawGrid(gridPoints);
