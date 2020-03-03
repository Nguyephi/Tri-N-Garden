import React, { useState, useEffect } from 'react';
import Row from './Row.js'
import PlantInfo from './PlantInfo.js'
import './garden.css'

const Garden = () => {
  const [plants, setPlants] = useState(Array(4).fill(Array(4).fill(null)))
  const [activePlant, setActivePlant] = useState({
    name: 'Plant Detail',
    rowIdx: -1,
    colIdx: -1,
    planted_on: "",
    _id: "",
    plant: {}
  })

  useEffect(() => {
    getGarden()
  }, [])

  const getGarden = () => {
    fetch('/api/garden')
    .then(res => res.json())
    .then(data => {
      let renderPlants = plants.slice()
      data.forEach(plantData => {
        let renderRow = renderPlants[plantData.rowIdx].slice();
        renderRow[plantData.colIdx] = plantData.plant.name[0].toUpperCase()
        renderPlants[plantData.rowIdx] = renderRow
      })
      setPlants(renderPlants)
    })
  }
  const handlePlantSeed = (colIdx, rowIdx) => {
    if (!plants[rowIdx][colIdx]) {
      setActivePlant({...activePlant, rowIdx, colIdx, _id: ''})
      return
    }
    if (rowIdx > -1 && colIdx > -1)
    fetch(`/api/garden/${rowIdx}/${colIdx}`)
    .then(res => res.json())
    .then(data => {
      data[0].planted_on = data[0].planted_on.split('T')[0]
      setActivePlant(data[0])
    })
  }

  const renderRows = () => {
    return Array(4).fill().map((_, i) => {
      return (
        <div className="garden-row">
          <Row
          rowIdx={i}
          handlePlantSeed={handlePlantSeed}
          row={plants[i]}
          /><br/>
        </div>
      )
    })
  }

  return(
    <div id='garden'>
      <div className='grow-bed-container'>
        <div className='grow-bed'>
          {renderRows()}
        </div>
      </div>
      <div className='plant-detail-container'>
        <PlantInfo
          activePlant={activePlant}
          setActivePlant={setActivePlant}
          getGarden={getGarden}
          plants={plants}
          setPlants={setPlants}
        />
      </div>
    </div>
  )
}

export default Garden;