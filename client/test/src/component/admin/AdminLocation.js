import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import { Link, Outlet, Route, Router, Routes } from "react-router-dom"
import serverURL from "../../../constant"
import Style from "../../static/style"
import AdminNav from "./AdminNav"

export default function AdminLocation(){
    
    const [navH, setnavH] = useState()

    const jwt = localStorage.getItem('jwt')
  

  
    const updateLocationData = async()=>{
      const res = await fetch(`${serverURL}/admin/updateLocationsData`, {
          headers:{
              'Authorization': `Bearer ${jwt}`
          }
      })
      if(res.ok){
        res.json().then(res=>{
          console.log(res)  
          })
          window.location.reload()
      }
      else{

      }
  
    }
    
    
    
        
    return(
      <>
      <div className="back">
         
      <AdminNav/>

      <Box sx={Style.leftNav} className  = "adminVerNav" id = "adminLocNav">
    
        <Button variant="contained" onClick={updateLocationData}>Update Data</Button>
        <Link to="read">Read</Link>
        <Link to="create">Create</Link>
        <Link to="update">Update</Link>
        <Link to="delete">Delete</Link>
    
      </Box>

      
      <Box sx={Style.mainSection} className = "adminText" id ="adminLocText">
        <Typography sx={{position: 'absolute', top: 0}} variant="h4" color="initial">Location Control Panel</Typography>
        <Outlet/>
        </Box>
        </div>
      </>
    );
  }
  