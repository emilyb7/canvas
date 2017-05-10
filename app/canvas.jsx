import React from 'react';
import debounce from 'lodash.debounce';

class Canvas extends React.Component {

  componentDidMount() {
    this.updateCanvas();
    this.delayed = debounce(this.updateCanvas, 10, { maxWait: 20, });
  }

  updateCanvas() {
    const lastX = 0;
    const lastY = 0;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.lineWidth = 10;
    ctx.LineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.miterLimit = 2;
    const allStrokes = this.props.strokes
      .concat([ { ...this.props.currentStroke, path: this.props.currentPath}, ]);
    allStrokes.forEach(stroke => {
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.moveTo(stroke.fromX, stroke.fromY);
      stroke.path.forEach(({ x, y, }) => {
        ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }

  render() {

    const draw = ({ nativeEvent, }) => {
      if (!this.props.isDrawing) return;
      this.props.addToPath({ x: nativeEvent.offsetX, y: nativeEvent.offsetY, });
      this.delayed();
    }

    const canvasStyle = {
      height: '500px',
      width: window.innerWidth,
      border: '2px solid #000',
      margin: 0,
      cursor: 'crosshair',
      backgroundColor: 'rgb(250, 250, 250)',
    };

    return (
      <canvas
        ref="canvas"
        width={ window.innerWidth }
        height={ 500 }
        style={ canvasStyle }
        onMouseMove={ draw }
        onMouseDown={ this.props.setDrawingTrue }
        onMouseUp={ this.props.setDrawingFalse }
        onMouseLeave={ this.props.setDrawingFalse }
      ></canvas>
    );
  }
}

export default Canvas;
