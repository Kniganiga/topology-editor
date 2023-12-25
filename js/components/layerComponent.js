import paper from 'paper';

export const width = 4;
export const bold_width = 10;
export const thin_width = 2;


export const layerStyle = new Map([
    ['PA', {fillColor:'#9966cc', strokeColor: '#9966cc', strokeWidth:width}],
    ['NA', {fillColor:'blue', strokeColor: 'blue', strokeWidth:width}],
    ['M1', {fillColor:'#c78752', strokeColor: '#c78752', strokeWidth:width}],
    ['PK', {fillColor:'#854c65', strokeColor: '#854c65', strokeWidth:width}],
    ['NK', {fillColor:'#282c34', strokeColor: '#282c34', strokeWidth:width}],
    ['SI', {fillColor:'#228b22', strokeColor: '#228b22', strokeWidth:width}],
    ['M1', {fillColor:'green', strokeColor: 'green', strokeWidth:width}],
    ['M2', {fillColor:'#f0fff0', strokeColor: '#f0fff0', strokeWidth:width}],
    ['TP', {fillColor:'#e0b0ff', strokeColor: '#e0b0ff', strokeWidth:width}],
    ['CPA', {fillColor:'#00556a', strokeColor: '#00556a', strokeWidth:width}],
    ['CPK', {fillColor:'#eeed09', strokeColor: '#eeed09', strokeWidth:width}],
    ['CPE', {fillColor:'#87ceeb', strokeColor: '#87ceeb', strokeWidth:width}],
    ['CNA', {fillColor:'#f9c89b', strokeColor: '#f9c89b', strokeWidth:width}],
    ['CNK', {fillColor:'#f5ce35', strokeColor: '#f5ce35', strokeWidth:width}],
    ['CNE', {fillColor:'#722F37', strokeColor: '#722F37', strokeWidth:width}],
    ['CSI', {fillColor:'#a19d94', strokeColor: '#a19d94', strokeWidth:width}],
    ['CM1', {fillColor:'#00a86b', strokeColor: '#00a86b', strokeWidth:width}],
    ['CW', {fillColor:'transparent', strokeColor: 'black', strokeWidth:width}],
    ['M2A', {fillColor:'transparent', strokeColor: '#f0e68c', strokeWidth:width}],
    ['KN', {fillColor:'transparent', strokeColor: '#ffe5b4', strokeWidth:width}],
    ['KP', {fillColor:'transparent', strokeColor: 'brown', strokeWidth:width}]
]);

export const layerComponent = ( {coordsList, addText, type, layer, params}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    console.log(type);
    path.strokeColor = layerStyle.get(type).strokeColor;
    if (layerStyle.get(type).fillColor!='transparent') path.fillColor = layerStyle.get(type).fillColor;
    path.opacity = 0.5;
    path.strokeWidth = layerStyle.get(type).strokeWidth;
    path.name = type;
    path.parent = layer;
    path.closed = true;
    
};

export function addNewElement(name){
    if (!layerStyle.has(name)){
        const color = "#"+Math.floor(Math.random()*16777215).toString(16);
        console.log(color);
        layerStyle.set(name, {fillColor:color, strokeColor:color, strokeWidth:width});
    }
}
