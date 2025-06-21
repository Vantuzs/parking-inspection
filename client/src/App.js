import ParkOfficersPage from "./pages/ParkOfficersPage/ParkOfficersPage";
import ProtocolsPage from "./pages/ProtocolsPage/ProtocolsPage";
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import styles from './App.module.scss'


function App() {
  return (
    <BrowserRouter>
      <nav className={styles['nav-list']}>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='protocols'>Protocols</Link></li>
        </ul>
      </nav>

     <Routes>
      <Route path="/" element={<ParkOfficersPage/>}/>
      <Route path="/protocols" element={<ProtocolsPage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
