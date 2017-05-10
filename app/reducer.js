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
      return {
        ...state,
        isDrawing: false,
        strokes: state.strokes.concat( addStroke(state.currentStroke, state.currentPath)),
        currentStroke: null,
        currentPath: [],
      };
    case 'ADD_TO_PATH':
    console.log("adding to path", action);
      return {
        ...state,
        currentPath: state.currentPath.concat([ action.coords, ]),
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
