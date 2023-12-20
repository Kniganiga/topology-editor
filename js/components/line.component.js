import paper from 'paper';

export const lineComponent = ({ start, end, color = 'black', width = 3 }) => {
    const path = new paper.Path();
    path.strokeColor = color;
    path.strokeWidth = width;
    const startPoint = new paper.Point(...start);
    path.moveTo(startPoint);

    path.lineTo(startPoint.add([...end]));
};


/*
1) Может создать компонент не для линии, а сразу для логического элемента?
(Фабрики не очень удобные)


2) Нужен интерфейс, я могу в locode накидать 

3) Надо сделать слои. Для них все есть: в Paper.js есть Scope
*/