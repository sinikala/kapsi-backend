import { useSelector } from 'react-redux'

const ParkNote = () => {
  const park = useSelector(state => state.activePark)

  return (
    <div> muistiinpanot {park.label}</div>
  )

}

export default ParkNote