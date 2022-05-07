import { useSelector } from 'react-redux'

const ParkComments = () => {
  const park = useSelector(state => state.activePark)

  return (
    <div> Muiden käyttäjien kommentit kohteesta {park.label}</div>
  )

}

export default ParkComments