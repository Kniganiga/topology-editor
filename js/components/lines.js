import paper from 'paper';


export const width = 4;
export const bold_width = 10;
export const thin_width = 2;

export const PA = ( {coordsList,addText, type ="PA", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    //path.strokeColor = 'red';
    path.fillColor = 'red';
    path.opacity = 0.5;
    path.strokeWidth = width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
    
};
export const NA = ( {coordsList,addText, type ="NA", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    //path.strokeColor = 'blue';
    path.fillColor = 'blue';
    path.strokeWidth = width;
    path.name = type;
    path.opacity = 0.5;
    path.parent = layer;
    path.closed = true;
    
};
export const PK = ({coordsList,addText, type ="NA", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
   // path.strokeColor = 'blue';
    path.fillColor = 'blue';
    path.opacity = 0.5
    const segmentLength=5;
    path.strokeWidth = width;
    path.name = "PK";

};


export const NK = ({ start, end}) => {
    const path = new paper.Path();
    path.add(new paper.Point(start), new paper.Point(end));
   // path.strokeColor = 'red';
    path.fillColor = 'red';
    const segmentLength=5;
    path.strokeWidth = width;
    path.opacity = 0.5;
    path.name = "NK";

};


 


export const SI = ({coordsList,addText, type ="SI", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    //path.strokeColor = 'green';
    path.fillColor = 'green';
    path.strokeWidth = bold_width;
    path.name = type;
    path.parent = layer;
    path.opacity = 0.5;
    path.closed = true;

};


export const M1 = ({coordsList,addText, type ="M1", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    //path.strokeColor = 'black';
    path.fillColor = 'gray';
    path.strokeWidth =width;
    path.name = type;
    path.parent = layer;
    path.opacity = 0.5;
    path.closed = true;
};



export const M2 = ({coordsList,addText, type ="M2", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
   // path.strokeColor = 'cyan';
    path.fillColor = 'cyan';
    path.strokeWidth = width;
    path.name = type;
    path.parent = layer;
    path.opacity = 0.5;
    path.closed = true;
};
