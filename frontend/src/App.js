import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import AllDonations from './pages/AllDonations';
import AllFundrisers from './pages/AllFundrisers';
import AllUsers from './pages/AllUsers';
import Authenticate from './pages/Authenticate';
import FundriserDetails from './pages/FundriserDetails';
import MyFundrisers from './pages/MyFundrisers';
import NewFunding from './pages/NewFunding';
import UpdateFunding from './pages/UpdateFunding';



import { BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
   <div classNmae="App">
    <Navbar/>
    
    <Routes>

<Route path="/landing" element={<Landing />} />
<Route path="/authenticate" element={<Authenticate />} />

<Route path="/" element={<Home />} />
<Route path="/new-fundriser" element={<NewFunding />} />
<Route path='/my-fundrisers' element={<MyFundrisers />} />
<Route path="/fundriser/:id" element={<FundriserDetails />} />
<Route path="/update-fundriser/:id" element={<UpdateFunding />} />

<Route path='/admin' element={<Admin />} />
<Route path='/all-users' element={<AllUsers />} />
<Route path='/fundrisers' element={<AllFundrisers />} />
<Route path='/alldonations' element={<AllDonations />} />


</Routes>

   
   </div>
  );
}

export default App;
