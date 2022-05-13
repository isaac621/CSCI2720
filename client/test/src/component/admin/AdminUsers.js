import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Style from "../../static/style"
import AdminNav from "./AdminNav"


export default function AdminUsers(){
    const navigate=useNavigate()
  
    return(
      <>
      
      <div className="back">

      <AdminNav/>
      <Box sx={Style.leftNav} className  = "adminVerNav" id = "adminUserNav">
    
        <Link to="read">Read</Link>
        <Link to="create">Create</Link>
        <Link to="update">Update</Link>
        <Link to="delete">Delete</Link>
      </Box>
      <Box sx={Style.mainSection} className = "adminText" id = "adminUserText">
      
      <Typography sx={{position: 'absolute', top: 0}} variant="h4" color="initial">User Control Panel</Typography>
         <Outlet/>
        </Box>
        </div>
      </>
    );
  }