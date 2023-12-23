import {paper} from 'paper';
import { width, thin_width} from './lines';

export const CPA = ({coordsList,addText, type ="CPA", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.fillColor = 'red';
    path.strokeWidth = thin_width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
};
//arrows
export const CPK = ({coordsList,addText, type ="CPK", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'red';
    path.strokeWidth = thin_width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
};
//what is this shit???
export const CPE = ({coordsList,addText, type ="CPE", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'purple';
    path.strokeWidth = thin_width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
};
export const CNA = ({coordsList,addText, type ="CNA", layer}) => {
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
//arrows
export const CNK = ({coordsList,addText, type ="CNK", layer}) => {
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
//no clue
export const CNE = ({coordsList,addText, type ="CNE", layer}) => {
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
//
export const CSI = ({coordsList,addText, type ="CSI", layer}) => {
    const path = new paper.Path();
    for (let i=0; i<coordsList.length; i+=2){
        path.add(new paper.Point([coordsList[i], coordsList[i+1]]));
    }
    path.strokeColor = 'green';
    path.strokeWidth = thin_width;
    path.name = type;
    path.parent = layer;
    path.closed = true;
};
//
export const CM1 = ({coordsList,addText, type ="CM1", layer}) => {
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
export const CW = ({coordsList,addText, type ="CW", layer}) => {
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

export const dual_joint = ({start, end,type}) => {

    var outer_rect = new paper.Rectangle(new paper.Point(start[0]-2,start[1]-5), new paper.Point(end[0]+2,end[1]+5));
    var outer_rect_path = new paper.Path.Rectangle(outer_rect);
    outer_rect_path.strokeColor = 'black';
    outer_rect_path.strokeWidth = thin_width;

    outer_rect_path.name = ""
    
};
