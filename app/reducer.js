const defaultState = {
  user: 'emily',
  isDrawing: false,
  lastX: null,
  lastY: null,
  strokes: [],
}

const newStroke = ({ lastX, lastY, }, nextX, nextY) => {
  if (!lastX || !lastY) return [];
  return { fromX: lastX, fromY: lastY, toX: nextX, toY: nextY, };
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
        strokes: state.strokes.concat(newStroke(state, action.offsetX, action.offsetY))
      }
    default:
      return state;
  }
}
