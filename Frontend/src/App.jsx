import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './auth/login'
import Signup from './auth/signup'
import JobList from './joblist/JobList'
import Home from './HomePage/Home'
import CompanyFormPage from './joblist/CompanyFormPage'

function App() {

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/find-job" element={<JobList />} />
          <Route path="/post-job" element={<CompanyFormPage />} />
        </Routes>
      </main>
    </Router>
  )

}

export default App