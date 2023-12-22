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


function parseCIF(file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
    console.log(reader.result);
        for (let line of reader.result.split("\n")) {
            if (componentMapping.has(line.slice(0,2))){
                const params = line.slice(3).split(' ').map(Number);
                console.log("params =",params)
                componentMapping.get(line.slice(0,2))({start:[params[0],params[1]], end:[params[2],params[3]]});
            }
            else if (['CPA', 'CPK', 'CPE', 'CNA', 'CNK', 'CNE', 'CSI', 'CM1'].includes(line.slice(0,3))){
                const params = line.slice(4).split(' ').map(Number);
                single_joint({center:[params[0],params[1]],type:line.slice(0,3)});
            }
            else if  (line.slice(0,2) ==  'CW'){
                const params = line.slice(3).split(' ').map(Number);
                single_joint({center:[params[0],params[1]],type:line.slice(0,2)});
            }
            else if (['CENAPE','CEPENA','CEPANE','CENEPA'].includes(line.slice(0,6))){
                const params = line.slice(7).split(' ').map(Number);
                dual_joint({start:[params[0], params[1]], end:[params[2], params[3]],type:line.slice(0,6)});
            }
        }
    }
    reader.onerror = function() {
        console.log(reader.error);
      };


}

function exportCIF(){
    var file_data = "";
    let layer = paper.project.activeLayer.children
        for (var i =0;i<layer.length;i++){
            if (layer[i].name != null){
                console.log(layer[i]);
                if (layer[i].name =='TP'){
                    file_data+="DS\nLAYER "+paper.project.activeLayer.id + "\n" + layer[i].name + " ";
                    // Transistor
                    file_data+=layer[i].children[2].firstSegment.point.x + " "+ layer[i].children[2].firstSegment.point.y+ " " +layer[i].children[2].lastSegment.point.x+ " "+layer[i].children[2].lastSegment.point.x+"\nDF\n";
                }
                else if (['CPA', 'CPK', 'CPE', 'CNA', 'CNK', 'CNE', 'CSI', 'CM1', 'CW'].includes(layer[i].name)){
                    file_data+="DS\nLAYER "+layer.id + "\n" + layer[i].name + " ";
                    //Point 
                   file_data+=layer[i].position.x + " " + layer[i].position.y+"\nDF\n";
                }
                else{
                    file_data+="DS\nLAYER "+paper.project.activeLayer.id + "\n" + layer[i].name + " ";
                    //Start and end, first and last segment
                    file_data+=layer[i].firstSegment.point.x + " "+ layer[i].firstSegment.point.y+ " " +layer[i].lastSegment.point.x+ " "+layer[i].lastSegment.point.y+"\nDF\n";
                }
            }
        }
    console.log(file_data);    
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
    console.log(event.target.files[0]);
   parseCIF(event.target.files[0]); 
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

// Функция для обработки события прокрутки колесика мыши
function handleMouseWheel(event) {
  // Определите направление прокрутки
  const delta = Math.sign(event.deltaY);

  // Прокрутка вверх или вниз
  if (delta > 0) {
    // Прокрутка вниз
    window.scrollBy(0, 100); // Измените значение, чтобы задать необходимое расстояние
  } else {
    // Прокрутка вверх
    window.scrollBy(0, -100); // Измените значение, чтобы задать необходимое расстояние
  }

  // Предотвращение стандартного поведения браузера (прокрутка страницы)
  event.preventDefault();
}

// Добавьте обработчик события прокрутки колесика мыши
window.addEventListener('wheel', handleMouseWheel);

// Создаем div элемент для вывода координат
const coordinatesDiv = document.createElement('div');
coordinatesDiv.style.position = 'fixed';
coordinatesDiv.style.bottom = '10px';
coordinatesDiv.style.right = '10px';
coordinatesDiv.style.padding = '5px';
coordinatesDiv.style.background = 'rgba(255, 255, 255, 0.8)';
coordinatesDiv.style.border = '1px solid #ccc';
coordinatesDiv.style.borderRadius = '5px';
document.body.appendChild(coordinatesDiv);

// Функция для обновления координат
function updateMouseCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;
  coordinatesDiv.textContent = `Координаты: X ${x}, Y ${y}`;
}

// Добавляем слушатель события на движение мыши
document.addEventListener('mousemove', updateMouseCoordinates);

// Функция для изменения масштаба
function handleZoom(event) {
  // Проверка, что нажата клавиша Ctrl
  const isCtrlPressed = event.ctrlKey;

  // Изменение масштаба только при удерживании клавиши Ctrl
  if (isCtrlPressed) {
    // Определение направления прокрутки колесика мыши
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;

    // Предотвращение стандартного поведения браузера при прокрутке колесика мыши
    event.preventDefault();

    // Применение изменения масштаба
    changeZoom(zoomFactor);
  }
}

// Добавление слушателя события колесика мыши
document.addEventListener('wheel', handleZoom);
