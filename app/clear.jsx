import React from 'react';

const Clear = ({ clearCanvas, }) => {

  const componentStyle = {
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
    <div style={ componentStyle }>
      <button style={ buttonStyle } onClick={ clearCanvas }>Clear</button>
    </div>
  )
}

export default Clear;
