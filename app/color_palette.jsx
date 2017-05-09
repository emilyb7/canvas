import React from 'react';

const palette = Array(10).fill('')
  .map((_, i) => `hsl(${i * 36}, 67%, 60%)`).concat(['#000', '#fff']);

const componentStyle = {
  position: 'absolute',
  width: '44px',
  right: 0,
  top: '52px',
  height: '496px',
  padding: '2px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  backgroundColor: '#e0e6e8',
}

const boxStyle = {
  height: '40px',
  width: '40px',
}

const labelBoxStyle = color => ({
  backgroundColor: color,
  cursor: 'pointer',
  border: '2px solid #8294a2',
  borderColor: '#8294a2 #fff #fff #8294a2',
  borderRadius: '10%',
  height: '38px',
  width: '38px',
});

const labelBoxStyleSelected = color => ({
  ...labelBoxStyle(color), borderColor: '#222',
});

const inputStyle = {
  visibility: 'hidden',
};

class ColorPalette extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ nativeEvent, }) {
    this.props.pickColor(nativeEvent.target.value);
  }

  render() {

    const colorBox = (color) => (
      <div key={ color }  style={ boxStyle } color={ color }>
        <label id={ color } >
          <div
            style={ color === this.props.color
              ? labelBoxStyleSelected(color)
              : labelBoxStyle(color) }
            ></div>
            <input
              type="radio"
              name="color"
              value={ color }
              style={ inputStyle }
              checked={ color === this.props.color }
              onChange={ this.handleChange }
            />
        </label>
      </div>
    )

    return (
      <div style={ componentStyle }>
        { palette.map(colorBox) }

      </div>
    )
  }
}

export default ColorPalette;
