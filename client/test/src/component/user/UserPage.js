import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import { Link, Outlet, Route, Router, Routes } from "react-router-dom"
import Style from "../../static/style"
import UserNav from "./UserNav"


export default function UserPage(){
    
    const [navH, setnavH] = useState()

    const jwt = localStorage.getItem('jwt')
  


    
    
    
        
    return(
      <>
        <div className="back">
            
            <UserNav/>
        
            <Box sx={Style.mainSection}>
                <Outlet/>
            </Box>
        </div>
      </>
    );
  }
  