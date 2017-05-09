import React from 'react';
import { connect, } from 'react-redux';

import Canvas from './canvas.jsx';


const App = props => {

  return (
    <div>
      <h1>Canvas things</h1>
      <Canvas
        setDrawingTrue={ props.setDrawingTrue }
        setDrawingFalse={ props.setDrawingFalse }
        newStroke={ props.newStroke }
        isDrawing={ props.isDrawing }
        strokes={ props.strokes }
      />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  isDrawing: state.isDrawing,
  strokes: state.strokes,
});

const actions = {
  setDrawingTrue: () => ({
    type: 'SET_DRAWING_TRUE',
  }),
  setDrawingFalse: () => ({
    type: 'SET_DRAWING_FALSE',
  }),
  newStroke: (offsetX, offsetY) => ({
    type: 'NEW_STROKE',
    offsetX: offsetX,
    offsetY: offsetY,
  })
};


export default connect(mapStateToProps, actions)(App);
