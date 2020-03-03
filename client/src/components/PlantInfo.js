import React, { useEffect, useState } from 'react';
import './plantInfo.css'

const PlantInfo = ({ plants, setPlants, getGarden, setActivePlant, activePlant, activePlant: {_id, name, rowIdx, colIdx, stage,  planted_on, plant }}) => {

  const [plantList, setPlantList] = useState([])
  useEffect(() => {
    getPlantList()
  }, [])

  const getPlantList = () => {
    fetch('/api/plant')
    .then(res => res.json())
    .then(data => {
      let plantListCopy = plantList.slice()
      data.forEach(plant => {
        plantListCopy.push({
          _id: plant._id,
          name: plant.name
        })
      })
      setPlantList(plantListCopy)
    })
  }

  const renderPlantOptions = () => {
    return plantList.map(plant => <option value={plant._id}>{plant.name}</option>)
  }

  const handleGardenForm = (e) => {
    e.preventDefault()
    const newGarden = {
      name: e.target.name.value,
      plant: e.target['plant-type'].value,
      stage: e.target.stage.value,
      rowIdx: Number(rowIdx),
      colIdx: Number(colIdx)
    }
    fetch('/api/garden', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGarden)
    })
    .then(res => res.json())
    .then(data => {
      console.log('dataaaaaaaaa',data)
      data.planted_on = data.planted_on.split('T')[0]
      setActivePlant(data)
      getGarden()
    })
  }

  const handleDeleteGarden = (id, rowIdx, colIdx) => {
    fetch('/api/garden/' + id, {
      method: "DELETE"
    })
    .then(res => {
      if (res.status === 200) {
        let renderPlants = plants.slice()
        let renderRow = renderPlants[rowIdx].slice();
        renderRow[colIdx] = null
        renderPlants[rowIdx] = renderRow
        setPlants(renderPlants)
        setActivePlant({...activePlant, _id:'', name: 'Plant Detail', rowIdx, colIdx})
      }
    })
  }

  if (_id.length > 0) {
    return (
    <div>
      <h2 className='project-name'>{name}</h2>
      <hr style={{marginBottom: '10px'}} />
      {stage > 0 && <p>Stage: {stage}</p>}
      {rowIdx > -1 && colIdx > -1 && <p>Garden Location: {rowIdx}, {colIdx}</p>}
      {planted_on.length > 0 && <p>Planted on : {planted_on}</p>}
      {Object.keys(plant).length > 0 &&
      <div>
        <h3 className='plant-name'>{plant.name}</h3>
        <p>Botanical name: {plant.botanical_name}</p>
        <p>Plan type: {plant.plant_type}</p>
        <p>Sun exposure: {plant.sun_exposure}</p>
        <p>Soil type: {plant.soil_type}</p>
        <p>Soil ph: {plant.soil_ph}</p>
        <p>Best time to grow: {plant.best_start_season}</p>
      </div>}
      <button onClick={() => handleDeleteGarden(_id, rowIdx, colIdx)}>Delete Garden</button>
    </div>
    )
  } else if (colIdx === -1 && rowIdx === -1) {
    return (
      <h2>Click on grow bed to start!</h2>
    )

  } else {
    return (
    <form id='project-form' onSubmit={(e) => handleGardenForm(e)}>
      <label htmlFor='project-name'>Project Name: </label>
      <input name='name' id='project-name' />
      <label htmlFor="plant-type">Pick a plant:</label>
      <select id="plant-type" name="plant-type">
        {renderPlantOptions()}
      </select>
      <label htmlFor='stage'>Stage (1-6): </label>
      <input name='stage' id='stage' type='number' min='1' max='6' />
      {rowIdx > -1 && colIdx > -1 && <p>Grow location: {rowIdx} x {colIdx}</p>}
      <button>Submit</button>
    </form>
    )
  }
};

export default PlantInfo;