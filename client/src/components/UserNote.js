import { useSelector } from 'react-redux'

const UserNote = () => {
  //const loggedUser = useSelector(state => state.user)
  const park = useSelector(state => state.activePark)

  return (
    <div> Muistiinpanosi kohteesta {park.label}</div>
  )

}

export default UserNote