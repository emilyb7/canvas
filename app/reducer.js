const defaultState = {
  user: 'emily',
  isDrawing: false,
  lastX: null,
  lastY: null,
  strokes: [],
  color: '#000',
}

const newStroke = ({ lastX, lastY, }, nextX, nextY, color) => {
  if (!lastX || !lastY) return [];
  return { fromX: lastX, fromY: lastY, toX: nextX, toY: nextY, color: color, };
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_DRAWING_TRUE':
      return { ...state, isDrawing: true, };
    case 'SET_DRAWING_FALSE':
      return { ...state, isDrawing: false, lastX: null, lastY: null, };
    case 'NEW_STROKE':
      return {
        ...state,
        lastX: action.offsetX,
        lastY: action.offsetY,
        strokes: state.strokes.concat(newStroke(state, action.offsetX, action.offsetY, action.color))
      }
    case 'PICK_COLOR':
      return {
        ...state,
        color: action.color,
      }
    default:
      return state;
  }
}
