import React from 'react';
import './plant.css'

const Plant = ({handlePlantSeed, value, colIdx, rowIdx}) => (
  <button className="plant" onClick={() => handlePlantSeed(colIdx, rowIdx)}>
    {value}
  </button>
)

export default Plant;