import React from 'react'
import LoginTest from './components/LoginTest';
import LocationsMap from './components/LocationsMap';
import Location from './components/Location';
import FavouriteList from './components/FavouriteList';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginTest />}/>
          <Route path="/map" element={<LocationsMap/>}/>
          <Route path="/location/:locationID" element={<Location/>}/>
          <Route path="/location/favourite" element={<FavouriteList/>}/>
          {/* <Route path="/test" element={<Login/>}/> */}
        </Routes>
    </Router>
  )
}

export default App
