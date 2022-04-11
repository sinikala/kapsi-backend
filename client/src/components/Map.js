import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Container } from '@mui/material'
import '../app.css'
import theme from '../theme/theme'


import { getAll } from '../services/parks'
import { setActivePark } from '../state/activePark'


const containerStyle = {
  borderRadius: 1,
  border: 2,
  borderColor: theme.palette.primary.main
}


const Map = () => {
  const [parks, setParks] = useState([])

  useEffect(() => {
    getAll()
      .then(response => {
        setParks(response.data)
      })
  }, [])

  const dispatch = useDispatch()
  const activePark = useSelector(state => state.activePark)

  return (
    <Container fixed disableGutters sx={containerStyle}>
      <MapContainer center={[64.225, 27.733333]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parks.map(park => (
          <Marker
            key={park.park}
            position={park.coordinates}
            eventHandlers={{
              click: () => {
                dispatch(setActivePark(park))
              }
            }}
          />
        ))}
        {activePark && (
          <Popup
            position={activePark.coordinates}
            onClose={() => {
              dispatch(setActivePark(null))
            }}
          >
            <div>
              <h2>{activePark.label}</h2>
            </div>
          </Popup>
        )}
      </MapContainer>
    </Container>
  )
}


export default Map
