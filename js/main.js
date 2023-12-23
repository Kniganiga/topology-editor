import { PA, NA, PK, NK, SI, M1, M2, thin_width } from './components/lines.js';
import paper from 'paper';
import { TP } from './components/rectangles.js';
import { CPA, CNA, CNE, CM1, CSI, CW, dual_joint, CPK, CPE, CNK } from './components/joints.js';

const componentMapping = new Map([
    ['PA', PA],
    ['NA', NA],
    ['M1', M1],
    ['PK', PK],
    ['NK', NK],
    ['SI', SI],
    ['M1', M1],
    ['M2', M2],
    ['TP', TP],
    ['CPA', CPA],
    ['CPK', CPK],
    ['CPE', CPE],
    ['CNA', CNA],
    ['CNK', CNK],
    ['CNE', CNE],
    ['CSI', CSI],
    ['CM1', CM1],
    ['CW', CW]
    /*
    These are commented out because I havent't seen them anywhere in CIF
    ['CESL1SL2',dual_joint],
    ['CENAPE',dual_joint],
    ['CEPENA',dual_joint],
    ['CEPANE',dual_joint],
    ['CENEPA',dual_joint]*/
]);

var gridPoints = 100;
var filename = 'output.cif';
const canvas = document.querySelector('#window');
const { width, height } = canvas.getBoundingClientRect();

paper.setup(canvas);
paper.view.viewSize = new paper.Size(document.body.clientWidth - 240, document.body.clientHeight);

function parseCIF(file) {
    let reader = new FileReader();
    reader.readAsText(file);

    var currentElement = '';
    var addText = false;

    reader.onload = function () {
        console.log(reader.result);

        for (let line of reader.result.split('\n')) {
            if (line[0] === 'L') {
                if (line[2] === 'T') {
                    addText = true;
                    currentElement = line.slice(3, -2);
                } else {
                    addText = false;
                    currentElement = line.slice(2, -2);
                }
            } else if (line.slice(0, 2) === 'P ') {
                if (componentMapping.has(currentElement)) {
                    //create a paper js layer if it was not created
                    var currentLayer;
                    if (!paper.project[currentElement]) {
                        currentLayer = new paper.Layer({ name: currentElement });
                        paper.project.addLayer(currentLayer);
                    } else {
                        currentLayer = paper.project[currentElement];
                    }

                    let coordsList = line.slice(2).replace(';', '').split(' ').map(Number);

                    componentMapping.get(currentElement)({
                        coordsList: coordsList,
                        addText: addText,
                        type: currentElement,
                        layer: currentLayer
                    });
                } else {
                    // alert('Could not parse ' + currentElement);
                }
            }
        }
    };
    reader.onerror = function () {
        console.log(reader.error);
    };
}
// TODO: finish export
// Remember that there is a lot of data which is in the file and not used for rendering
function exportCIF() {
    var file_data = '';

    return file_data;
}
var drawGridLines = function (num_rectangles_wide, num_rectangles_tall, boundingRect) {
    var width_per_rectangle = boundingRect.width / num_rectangles_wide;
    var height_per_rectangle = boundingRect.height / num_rectangles_tall;
    for (var i = 0; i <= num_rectangles_wide; i++) {
        var xPos = boundingRect.left + i * width_per_rectangle;
        var topPoint = new paper.Point(xPos, boundingRect.top);
        var bottomPoint = new paper.Point(xPos, boundingRect.bottom);
        var aLine = new paper.Path.Line(topPoint, bottomPoint);
        aLine.strokeColor = 'black';
    }
    for (var i = 0; i <= num_rectangles_tall; i++) {
        var yPos = boundingRect.top + i * height_per_rectangle;
        var leftPoint = new paper.Point(boundingRect.left, yPos);
        var rightPoint = new paper.Point(boundingRect.right, yPos);
        var aLine = new paper.Path.Line(leftPoint, rightPoint);
        aLine.strokeColor = 'black';
    }
};
function drawGrid(gridSize) {
    var canvasWidth = canvas.getBoundingClientRect().width;
    var canvasHeight = canvas.getBoundingClientRect().height;

    // Calculate the distance between each line
    var lineDistance = canvasWidth / gridSize;

    // Draw horizontal lines
    for (var i = 0; i <= gridSize; i++) {
        var yPos = i * lineDistance;
        var topPoint = new paper.Point(0, yPos);
        var bottomPoint = new paper.Point(canvasWidth, yPos);
        var line = new paper.Path.Line(topPoint, bottomPoint);
        line.strokeColor = '#dee0df';
        line.strokeWidth = thin_width;
    }

    // Draw vertical lines
    for (var i = 0; i <= gridSize; i++) {
        var xPos = i * lineDistance;
        var leftPoint = new paper.Point(xPos, 0);
        var rightPoint = new paper.Point(xPos, canvasHeight);
        var line = new paper.Path.Line(leftPoint, rightPoint);
        line.strokeColor = '#dee0df';
        line.strokeWidth = thin_width;
    }
    return lineDistance;
}
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        // Others
        var a = document.createElement('a'),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

const cifImport = document.getElementById('importCIF');
cifImport.addEventListener('change', event => {
    console.log(event.target.files[0]);
    parseCIF(event.target.files[0]);
});

const cifExport = document.getElementById('exportCIF');
cifExport.addEventListener('click', event => {
    download(exportCIF(), filename);
});

//Layyer visibility
let layerMenu = document.getElementById('layerMenu');
layerMenu.addEventListener('click', event => {
    if (event.target.classList.has('active')) {
        paper.project[event.target.id].deactivate();
        event.target.classList.remove('active');
    } else {
        paper.project[event.target.id].activate();
        event.target.classList.add('active');
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
var startPoint = new paper.Point([0, 0]);
function getStartCoords(event) {
    startPoint = event.point;
}
function moveCanvas(event) {
    paper.project.view.translate([event.point.x - startPoint.x, event.point.y - startPoint.y]);
}
paper.project.view.onMouseDown = getStartCoords;

paper.project.view.onMouseDrag = moveCanvas;

//Choosing a tool

const toolMenu = document.getElementById('sideMenu');

let zoomFactor = 1;

let zoomIncrement = 0.1;

toolMenu.addEventListener('click', event => {
    console.log(zoomFactor);
    switch (event.target.id) {
        case 'zoomIn':
            zoomFactor += zoomIncrement;
            paper.project.view.zoom = zoomFactor;
            break;
        case 'zoomOut':
            zoomFactor -= zoomIncrement;
            paper.project.view.zoom = zoomFactor;
            break;
        case 'reset':
            console.log('reset');
            break;
        case 'importCIF':
    }
});

//Testing out all components
/*TP({start:[20,20], end : [50,150]});

single_joint({center : [100,300], type: 'CMA'});
single_joint({center : [100,350], type: 'CM1'});
dual_joint({start : [150,50], end : [150,100]});
var dist = 50;
for (let f of componentMapping.values()){
    f({start:[100,dist], end:[300,dist]});
    dist+=50;
}*/

//let gridDistance = drawGrid(gridPoints);
