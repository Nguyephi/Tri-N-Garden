import React from 'react';
import Plant from './Plant.js';

const Row = ({row, rowIdx, handlePlantSeed, status}) => {
  const renderPlant = () => {
    return Array(4).fill().map((_, i) => <Plant value={row[i]} colIdx={i} rowIdx={rowIdx} handlePlantSeed={handlePlantSeed} status={status} />)
  }

  return (
    <>
      {renderPlant()}
    </>
  )
}

export default Row;