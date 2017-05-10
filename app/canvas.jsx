import React from 'react';
import debounce from 'lodash.debounce';

class Canvas extends React.Component {

  componentDidMount() {
    this.updateCanvas();
    this.delayed = debounce(this.updateCanvas, 10, { maxWait: 20, });
  }

  updateCanvas() {
    console.log("updating");
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, 500);
    if(!this.props.strokes.length && !this.props.currentPath.length) return;
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

    const clearCanvas = () => {
      this.props.clearCanvas();
      const ctx = this.refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, window.innerWidth, 500);
    }

    const canvasStyle = {
      height: '500px',
      width: window.innerWidth,
      border: '2px solid #000',
      margin: 0,
      cursor: 'crosshair',
      backgroundColor: 'rgb(250, 250, 250)',
    };

    const clearContainerStyle = {
      height: '50px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }

    const buttonStyle = {
      height: '50px',
      width: '150px',
      backgroundColor: '#00d49b',
      color: '#fff',
      outline: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      alignSelf: 'center',
      borderColor: 'turquoise',
      borderStyle: 'solid',
    }

    return (
      <div>
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
        <div style={ clearContainerStyle }>
          <button style={ buttonStyle } onClick={ clearCanvas }>Clear</button>
        </div>
      </div>
    );
  }
}

export default Canvas;
