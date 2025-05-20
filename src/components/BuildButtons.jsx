import React from 'react';

export default function BuildButtons({ onSoftClick, onMildClick, onRandomClick }) {
  return (
    <div className="btnDiv">
      <button className="buildBtn soft" onClick={onSoftClick}>Soft 🤡</button>
      <button className="buildBtn mild" onClick={onMildClick}>Mild 🥸</button>
      <button className="buildBtn full" onClick={onRandomClick}>Fully Random 🗿</button>
    </div>
  );
}