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
    ctx.strokeStyle = this.props.color;
    ctx.lineWidth = 7;
    ctx.LineJoin = 'round';
    this.props.strokes.slice(1).forEach(stroke => {
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.moveTo(stroke.fromX, stroke.fromY);
      ctx.lineTo(stroke.toX, stroke.toY);
      ctx.stroke();
    });
  }

  render() {

    const draw = ({ nativeEvent, }) => {
      if (!this.props.isDrawing) return;
      this.props.newStroke(nativeEvent.offsetX, nativeEvent.offsetY, this.props.color);
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
