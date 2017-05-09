import React from 'react';
import debounce from 'lodash.debounce';

class Canvas extends React.Component {

  componentDidMount() {
    this.updateCanvas();
    this.delayed = debounce(this.updateCanvas, 50, { maxWait: 50, });
  }

  updateCanvas() {
    const lastX = 0;
    const lastY = 0;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.beginPath();
    this.props.strokes.slice(1).forEach(stroke => {
      ctx.moveTo(stroke.fromX, stroke.fromY);
      ctx.lineTo(stroke.toX, stroke.toY);
    });

    ctx.stroke();
  }

  render() {

    const draw = ({ nativeEvent, }) => {
      if (!this.props.isDrawing) return;
      this.props.newStroke(nativeEvent.offsetX, nativeEvent.offsetY);
      this.delayed();
    }

    const canvasStyle = {
      height: '500px',
      width: '500px',
      border: '2px solid #000',
      margin: 0,
    };

    return (
      <canvas
        ref="canvas"
        width={ 500 }
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
