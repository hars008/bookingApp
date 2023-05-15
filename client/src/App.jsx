import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginSign from './pages/LoginPage'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'

axios.defaults.baseURL="http://localhost:4000";
axios.defaults.withCredentials= true;
function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginSign />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
