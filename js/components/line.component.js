import paper from 'paper';

export const lineComponent = ({ start, end, color = 'black', width = 3 }) => {
    const path = new paper.Path();
    path.strokeColor = color;
    path.strokeWidth = width;
    const startPoint = new paper.Point(...start);
    path.moveTo(startPoint);

    path.lineTo(startPoint.add([...end]));
};
