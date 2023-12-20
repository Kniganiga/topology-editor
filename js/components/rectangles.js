import {paper} from 'paper';
import { SI, thin_width, width} from './lines';


export const TP = ({ start, end}) => {
    //Draw a silicon strip
    var tp_group = new paper.Group();
    const si = SI({start: [Math.abs(end[0]-start[0])/2+start[0], start[1]-2], end : [Math.abs(end[0]-start[0])/2+start[0], end[1]+2], group: tp_group });
    //Draw inner blue squares
    var inner_rect = new paper.Rectangle(new paper.Point(start), new paper.Point(end));
    var inner_rect_path = new paper.Path.Rectangle(inner_rect);
    inner_rect_path.strokeColor = 'blue';
    inner_rect_path.strokeWidth = width;
   
    //Draw outer dashed brown square
    var outer_rect = new paper.Rectangle(new paper.Point(start[0]-5,start[1]-5), new paper.Point(end[0]+5,end[1]+5));
    var outer_rect_path = new paper.Path.Rectangle(outer_rect);
    outer_rect_path.strokeColor = 'brown';
    outer_rect_path.strokeWidth = thin_width;
    outer_rect_path.dashArray = [10,12];

    tp_group.addChild(outer_rect_path);
    tp_group.addChild(inner_rect_path);  
    tp_group.name = "TP";
    
};
