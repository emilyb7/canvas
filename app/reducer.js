const defaultState = {
  user: 'emily',
  isDrawing: false,
  strokes: [],
  color: '#000',
  currentStroke: null,
  currentPath: [],
}

const addStroke = (stroke, path) => ({ ...stroke, path: path, });

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_DRAWING_TRUE':
      return {
        ...state,
        isDrawing: true,
        currentStroke: { fromX: action.startX, fromY: action.startY, color: state.color, },
      };
    case 'SET_DRAWING_FALSE':
      if (state.isDrawing === false) return state;
      return {
        ...state,
        isDrawing: false,
        strokes: state.strokes.concat( addStroke(state.currentStroke, state.currentPath)),
        currentStroke: null,
        currentPath: [],
      };
    case 'ADD_TO_PATH':
      return {
        ...state,
        currentPath: state.currentPath.concat([ action.coords, ]),
      }
    case 'PICK_COLOR':
      return {
        ...state,
        color: action.color,
      }
    case 'CLEAR_CANVAS':
      return {
        ...state,
        strokes: [],
      }
    default:
      return state;
  }
}
