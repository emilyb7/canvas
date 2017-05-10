import React from 'react';
import { connect, } from 'react-redux';

import Canvas from './canvas.jsx';
import ColorPalette from './color_palette.jsx';


const App = props => {

  const appStyle = {
    fontFamily: 'monospace',
    backgroundColor: 'pink',
    margin: 0,
    height: '100%',
    width: '100%',
  };

  const gameStyle = {
    position: 'relative',
    height: '500px',
  };

  const titleStyle = {
    height: '50px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }

  return (
    <div style={ appStyle }>
      <div className="app-title" style={ titleStyle }>
        <h1>Canvas things</h1>
      </div>
      <div className="game">
        <Canvas
          setDrawingTrue={ props.setDrawingTrue }
          setDrawingFalse={ props.setDrawingFalse }
          isDrawing={ props.isDrawing }
          strokes={ props.strokes }
          color={ props.color }
          addToPath={ props.addToPath }
          currentStroke={ props.currentStroke }
          currentPath={ props.currentPath }
          clearCanvas={ props.clearCanvas }
        />
        <ColorPalette pickColor={ props.pickColor } color={ props.color }/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  isDrawing: state.isDrawing,
  strokes: state.strokes,
  color: state.color,
  currentStroke: state.currentStroke,
  currentPath: state.currentPath,
});

const actions = {
  setDrawingTrue: (event) => ({
    type: 'SET_DRAWING_TRUE',
    startX: event.nativeEvent.offsetX,
    startY: event.nativeEvent.offsetY,
  }),
  setDrawingFalse: () => ({
    type: 'SET_DRAWING_FALSE',
  }),
  pickColor: (color) => ({
    type: 'PICK_COLOR',
    color: color,
  }),
  addToPath: (coords) => ({
    type: 'ADD_TO_PATH',
    coords: coords,
  }),
  clearCanvas: () => ({
    type: 'CLEAR_CANVAS',
  }),
};


export default connect(mapStateToProps, actions)(App);
