import {paper} from 'paper';
import { width, thin_width} from './lines';

export const single_joint = ({center, type}) => {
    const radius = 5;
    var circle_path = new paper.Path.Circle(new paper.Point(center),radius);
    //CM1 means it is a metall joint and it needs to be rendered differently
    if (type == "CM1"){
        circle_path.fillColor = 'white';
        circle_path.strokeColor = '#00FFFF';
        circle_path.strokeWidth = width;
    }
    else{
        circle_path.fillColor = 'black';
    }
    
};

export const dual_joint = ({start, end}) => {

    var outer_rect = new paper.Rectangle(new paper.Point(start[0]-2,start[1]-5), new paper.Point(end[0]+2,end[1]+5));
    var outer_rect_path = new paper.Path.Rectangle(outer_rect);
    outer_rect_path.strokeColor = 'black';
    outer_rect_path.strokeWidth = thin_width;
    
};