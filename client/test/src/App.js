import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './static/2720proj.css';
import './static/LEMONMILK-Regular.otf';
import './static/favicon.ico'


import AdminUsers from "./component/admin/AdminUsers";
import AdminLocation from "./component/admin/AdminLocation";
import { Box, createTheme, Switch, ThemeProvider } from "@mui/material";
import CreateLocation from "./component/admin/Location/CreateLocation";
import DeleteLocation from "./component/admin/Location/DeleteLocation";
import UpdateLocation from "./component/admin/Location/UpdateLocation";
import ReadLocations from "./component/admin/Location/ReadLocations";
import CreateUser from "./component/admin/User/CreateUser";
import DeleteUser from "./component/admin/User/DeleteUser";
import UpdateUser from "./component/admin/User/UpdateUser";
import ReadUsers from "./component/admin/User/ReadUsers";
import AdminLogin from "./component/admin/AdminLogin";
import UserLogin from "./component/user/UserLogin";

import Location from "./component/user/Location";
import UserPage from "./component/user/UserPage";
import AllLocations from "./component/user/AllLocations";
import FavouriteList from "./component/user/FavouriteList";
import Style from "./static/style";




const lightTheme = createTheme({
  palette:{
    primary: {
      light: '#c5e4ff',
      main: '#afc8de',
      dark: '#516f86',
      darker: '#424d56'
    },
    secondary: {
      light: '#f4cd7d',
      main: '#a88d56',
      dark: '#5c4d2f',
      darker: '#282214'
    },
    
    textColor: {
      main: '#070809',
      contrast: '#f3f3f3'
    },

  },
  typography: {
    fontFamily: "Lucida Console"
  }

})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    initial: '#f3f3f3',
    primary: {
      light: '#2f2f2f',
      main: '#afc8de',
      dark: '#516f86',
      darker: '#424d56'
    },
  },
 
})
function App() {

  const [theme, setTheme] = useState(lightTheme)


  return (
    <ThemeProvider theme={theme ? darkTheme: lightTheme}>
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/login/admin" element={<AdminLogin setTheme={setTheme}/>} />
          <Route path="/login/user" element={<UserLogin setTheme={setTheme}/>} />
          <Route path="/" element={<UserLogin setTheme={setTheme}/>} />

          <Route path="/user" element={<UserPage setTheme={setTheme} theme={theme}/>}>
            <Route path="locations" element={<AllLocations/>}/>
            <Route path="location/:locationID" element={<Location/>}/>
            <Route path="favorite" element={<FavouriteList/>}/>
          </Route>

         



          <Route path="/admin/location" element={<AdminLocation/>}>
            <Route path="create" element = {<CreateLocation/>}/>
            <Route path="delete" element = {<DeleteLocation/>}/>
            <Route path="update" element = {<UpdateLocation/>}/>
            <Route path="read" element = {<ReadLocations/>}/>
          </Route>
          <Route path="/admin/users" element={<AdminUsers/>}>
            <Route path="create" element = {<CreateUser/>}/>
            <Route path="delete" element = {<DeleteUser/>}/>
            <Route path="update" element = {<UpdateUser/>}/>
            <Route path="read" element = {<ReadUsers/>}/>

          </Route>
        </Routes>
        </BrowserRouter>
        
      </div>
    </ThemeProvider>
  );
}


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
export default App;
