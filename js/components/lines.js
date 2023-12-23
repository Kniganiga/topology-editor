import paper from 'paper';


export const width = 2;
export const bold_width = 10;
export const thin_width = 1;

export const PA = ( {coordsList,addText, type ="PA", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'red';
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
    path.strokeColor = 'blue';
    path.strokeWidth = width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
    
};
export const PK = ({coordsList,addText, type ="NA", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'blue';
    const segmentLength=5;
    path.strokeWidth = width;
    path.name = "PK";

    const distance = path.length;
    console.log(distance);
    const interval = 50; // Define the interval in pixels
    const arrowCount = Math.floor(distance / interval);
    const arrowSize =10;
    for (var i = 1; i <= arrowCount-1; i++) {
        var t = i *interval;
        var head_point = path.getPointAt(t+arrowSize);
        var tail_point = path.getPointAt(t);
        var vector = tail_point.subtract(head_point);
        var arrow_path = new paper.Path();
        console.log((vector.rotate(30)+head_point));
        arrow_path.add(vector.rotate(30).add(head_point), head_point,vector.rotate(-30).add(head_point));
        arrow_path.strokeWidth = path.strokeWidth;
        arrow_path.strokeColor = path.strokeColor;
}

};


export const NK = ({ start, end}) => {
    const path = new paper.Path();
    path.add(new paper.Point(start), new paper.Point(end));
    path.strokeColor = 'red';
    const segmentLength=5;
    path.strokeWidth = width;
    path.name = "NK";

    const distance = path.length;
    console.log(distance);
    const interval = 50; // Define the interval in pixels
    const arrowCount = Math.floor(distance / interval);
    const arrowSize =10;
    for (var i = 1; i <= arrowCount-1; i++) {
        var t = i *interval;
        var head_point = path.getPointAt(t+arrowSize);
        var tail_point = path.getPointAt(t);
        var vector = tail_point.subtract(head_point);
        var arrow_path = new paper.Path();
        console.log((vector.rotate(30)+head_point));
        arrow_path.add(vector.rotate(30).add(head_point), head_point,vector.rotate(-30).add(head_point));
        arrow_path.strokeWidth = path.strokeWidth;
        arrow_path.strokeColor = path.strokeColor;

        

        
}

};


 


export const SI = ({coordsList,addText, type ="SI", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'green';
    path.strokeWidth = bold_width;
    path.name = type;
    path.parent = layer;
    path.closed = true;

};


export const M1 = ({coordsList,addText, type ="M1", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'black';
    path.strokeWidth = thin_width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
};



export const M2 = ({coordsList,addText, type ="M2", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'cyan';
    path.strokeWidth = width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
};
