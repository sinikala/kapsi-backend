import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import Main from './components/Main'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserParkPage from './components/UserParkPage'

const App = () => (
  <Router>
    <div>
      <NavBar />
    </div>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/parknote/:label' element={<UserParkPage />} />
      <Route path='/' element={<Main />} />
    </Routes>
  </Router>
)

export default App
