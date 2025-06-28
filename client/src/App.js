import ParkOfficersPage from "./pages/ParkOfficersPage/ParkOfficersPage";
import ProtocolsPage from "./pages/ProtocolsPage/ProtocolsPage";
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage";
import styles from './App.module.scss'


function App() {
  return (
    <BrowserRouter>
      <nav className={styles['nav-list']}>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/officers'>Officers</Link></li>
          <li><Link to='protocols'>Protocols</Link></li>
        </ul>
      </nav>

     <Routes>
    <Route path="/" element={<HomePage/>}/>
      <Route path="/officers" element={<ParkOfficersPage/>}/>
      <Route path="/protocols" element={<ProtocolsPage/>}/>
      <Route path="/protocols/:parkOfficerId/:parkOfficerFullName" element={<ProtocolsPage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
