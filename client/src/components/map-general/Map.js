import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Container } from '@mui/material'
import Leaflet from 'leaflet'
import '../../app.css'
import theme from '../../theme/theme'


import { getAll } from '../../services/parks'
import { setActivePark } from '../../state/activePark'


const containerStyle = {
  borderRadius: 1,
  border: 2,
  borderColor: theme.palette.primary.main
}

const MarkerIcon = Leaflet.Icon.extend({
  options: {
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
})

const blueIcon = new MarkerIcon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png' })
const orangeIcon = new MarkerIcon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png' })
//const greenIcon = new MarkerIcon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png' })

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

  const chooseIcon = (label) => {
    if (activePark && activePark.label === label) {
      return orangeIcon
    }
    else {
      return blueIcon
    }
  }

  return (
    <Container fixed disableGutters sx={containerStyle}>
      <MapContainer center={[64.225, 27.733333]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parks.map(park => (
          <Marker
            id='marker'
            key={park.park}
            position={park.coordinates}
            title={park.label}
            icon={chooseIcon(park.label)}
            eventHandlers={{
              click: () => {
                dispatch(setActivePark(park))
              }
            }}
          />
        ))}

      </MapContainer>
    </Container>
  )
}


export default Map