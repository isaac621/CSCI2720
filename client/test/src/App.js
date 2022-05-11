// import { useState } from "react";

// function App() {



//   return (
//     <div className="App">
//       <Login/>
//     </div>
//   );
// }


// function Login(){
//   const [username, setUsername] = useState()
//   const [password, setPassword] = useState()

//   const [loginState, setLoginState] = useState('Please Login')
//   const [fetchedData, setFetchedData] = useState()

//   const usernameOnChangeHandler = (e)=>{
//     setUsername(e.target.value)
//   }

//   const passwordOnChangeHandler = (e)=>{
//     setPassword(e.target.value)
//   }

//   const loginOnClickHandler = async()=>{
//     //use await to pause the async function until it fetch the response from server
//     const res = await fetch('http://localhost:3000/users/login',
//     {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': "application/json"
//         },
//         body: JSON.stringify({
//             "username": username,
//             "password": password
//         })
//     })
    
//     //check the status code of the response
//     if(res.ok){
//       setLoginState('Login Successfully')
//       await res.json().then(res=>localStorage.setItem('jwt', res.accessToken)).catch(err=>console.log(err))
//     }
//     else{
//       setLoginState('Login Failed')
//     }
    
//         return 
//     }

//     const fetchDataOnClickHandler = async()=>{
//       const jwt = localStorage.getItem('jwt')
//       console.log(jwt)

//       const res = await fetch('http://localhost:3000/users/location/get/1', {
//           headers:{
//               'Authorization': `Bearer ${jwt}`
//           }
//       })

//       if(res.ok){
//         res.json().then(res=>{
//           console.log(res)
//           setFetchedData(res.info)
//           }
//           )
//       }
//       else{
//         setFetchedData()
//       }
      
//     }

//     const logoutOnClickHandler = ()=>{
//       localStorage.removeItem('jwt')
//     }



//   return(
//     <div>
//       <div>
//         username: user1
//         <br/>
//         password: user1
//       </div>
//       <br/>
//       <label>username</label>
//       <input onChange={usernameOnChangeHandler}/>
//       <br/>
//       <label>password</label>
//       <input onChange={passwordOnChangeHandler}/>
//       <br/>
//       <button onClick={loginOnClickHandler}>Login</button>
//       <br/>
//       <div>
//         {loginState}
//       </div>
//       <br/>
//       <button onClick={logoutOnClickHandler}>logout</button>
//       <br/>
//       <br/>
//       <button onClick={fetchDataOnClickHandler}>Fetch</button>
//       <br/>
//       <div>
//         {fetchedData && 'Full response can be checked in the console'}
//         {fetchedData ? JSON.stringify(fetchedData, null, 4) : 'Please login to fetch the locations'}
//       </div>
//     </div>
//   )
// }
// export default App;

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import _ from 'lodash';
import {
  // useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript
} from '@react-google-maps/api'
import { useRef, useState, useEffect, useMemo} from 'react'
import LoginTest from './components/LoginTest';
import LocationsMap from './components/LocationsMap';
import Location from './components/Location';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginTest />}/>
          <Route path="/map" element={<LocationsMap/>}/>
          <Route path="/location/:locationID" element={<Location/>}/>
          {/* <Route path="/test" element={<Login/>}/> */}
        </Routes>
    </Router>
  )
}

export default App
