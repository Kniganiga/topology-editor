import {PA, NA, PK, NK, SI, M1, M2, thin_width} from './components/lines.js';
import paper from 'paper';
import {TP} from './components/rectangles.js';
import { single_joint,dual_joint } from './components/joints.js';

const componentMapping = new Map([
    ['PA',PA],
    ['NA',NA],
    ['PK',PK],
    ['NK',NK],
    ['SI',SI],
    ['M1',M1],
    ['M2',M2],
    ['TP',TP],
    
]);

var gridSize = 100;
var filename = "output.cif";
paper.setup(document.querySelector('#window'));


function parseCIF(filename) {
   const lines = fs.readFileSync(filename, 'utf8').split('\n');

   for (let line of lines) {
    line = line.trim();

    if (line.slice(0,3) in componentMapping){
        const params = lines.split(' ').map(Number);
        lines_mapping.get(line.splice(0,3))({start:[params[0],params[1]], end:[params[2],params[3]]});
    }
    if (line.spice(0,5) in ['CPA', 'CPK', 'CPE', 'CNA', 'CNK', 'CNE', 'CSI', 'CM1', 'CW']){
        const params = lines.split(' ').map(Number);
        single_joint({center:[params[0],params[1]]});
    }
    if (line.splice(0,7) in ['CENAPE','CEPENA','CEPANE','CENEPA']){
        const params = lines.split(' ').map(Number);
        dual_joint({start:[params[0], params[1]], end:[params[2], params[3]]});
    }
}
}

function exportCIF(){
    var file_data = "";
    for (let layer in paper.project.getItems({recursive : false})){
        console.log(layer[0]);
        for (let item in layer.getItems({recursive:false})){
            if (item.name != null){
                if (item.name =='TP'){
                    file_data+="DS\nLAYER "+layer.id + "\n" + item.name + " ";
                    // Transistor
                    file_data+=item.name + " "+ item.children[2].firstSegment.point.x + " "+ item.children[2].firstSegment.point.y+ " " +item.children[2].lastSegment.point.x+ " "+item.children[2].lastSegment.point.x;

                }
                else if (item.name in ['CPA', 'CPK', 'CPE', 'CNA', 'CNK', 'CNE', 'CSI', 'CM1', 'CW']){
                    file_data+="DS\nLAYER "+layer.id + "\n" + item.name + " ";
                    //Point 
                   file_data+=item.name + " "+ item.position.x + " " + item.position.y;
                }
                else{
                    file_data+="DS\nLAYER "+layer.id + "\n" + item.name + " ";
                    //Start and end, first and last segment
                    file_data+=item.name + " "+ item.firstSegment.point.x + " "+ item.children[2].firstSegment.point.y+ " " +item.children[2].lastSegment.point.x+ " "+item.children[2].lastSegment.point.x;
                }

            }
    }
    }
    return file_data;
}
var drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {
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
}
function drawGrid(gridSize) {
    var canvasWidth = paper.view.size.width;
    var canvasHeight = paper.view.size.height;
 
    // Calculate the distance between each line
    var lineDistance = canvasWidth / gridSize;
 
    // Draw horizontal lines
    for (var i = 0; i <= gridSize; i++) {
        var yPos = i * lineDistance;
        var topPoint = new paper.Point(0, yPos);
        var bottomPoint = new paper.Point(canvasWidth, yPos);
        var line = new paper.Path.Line(topPoint, bottomPoint);
        line.strokeColor = '#dee0df';
        line.strokeWidth=thin_width;
    }
 
    // Draw vertical lines
    for (var i = 0; i <= gridSize; i++) {
        var xPos = i * lineDistance;
        var leftPoint = new paper.Point(xPos, 0);
        var rightPoint = new paper.Point(xPos, canvasHeight);
        var line = new paper.Path.Line(leftPoint, rightPoint);
        line.strokeColor = '#dee0df';
        line.strokeWidth=thin_width;
    }
}
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

const cifImport = document.getElementById('cifImport');
cifImport.addEventListener('change', (event) => {
   parseCIF(event.target.files); 
});

const cifExport = document.getElementById('cifExport');
cifExport.addEventListener('click', (event) => {
    
    download(exportCIF(), filename);
});


drawGrid(gridSize);

//Testing out all components
TP({start:[20,20], end : [50,50]});
 
single_joint({center : [100,300], type: 'CMA'});
single_joint({center : [100,350], type: 'CM1'});
dual_joint({start : [150,50], end : [150,100]});
var dist = 50;
for (let f of componentMapping.values()){
    f({start:[100,dist], end:[300,dist]});
    dist+=50;
}
