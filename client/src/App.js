import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import Main from './components/Main'
import NavBar from './components/NavBar'
import Login from './components/Login'

const App = () => (
  <Router>
    <div>
      <NavBar />
    </div>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Main />} />
    </Routes>
  </Router>
)

export default App
