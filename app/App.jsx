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
          newStroke={ props.newStroke }
          isDrawing={ props.isDrawing }
          strokes={ props.strokes }
          color={ props.color }
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
});

const actions = {
  setDrawingTrue: () => ({
    type: 'SET_DRAWING_TRUE',
  }),
  setDrawingFalse: () => ({
    type: 'SET_DRAWING_FALSE',
  }),
  newStroke: (offsetX, offsetY, color) => ({
    type: 'NEW_STROKE',
    offsetX: offsetX,
    offsetY: offsetY,
    color: color,
  }),
  pickColor: (color) => ({
    type: 'PICK_COLOR',
    color: color,
  }),
};


export default connect(mapStateToProps, actions)(App);
