import { Box, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, Outlet, Route, Router, Routes } from "react-router-dom"
import Style from "../../static/style"
import UserNav from "./UserNav"


export default function UserPage({setTheme, theme}){
  const [themeValue, setThemeValue] = useState(false)  
  const getTheme = async()=>{
    const jwt = localStorage.getItem('jwt')
    const res = await fetch(`${serverURL}/users/theme`, {
         headers: {
            'Authorization': `Bearer ${jwt}`
         }

        }).then(res=>res.json())
        setTheme(res)
        
      }
  
  useEffect(()=>{
    getTheme()
  }, [])

    
    
    
        
    return(
      <>
        <div className="back">
            
            <UserNav setTheme={setTheme} theme={theme}/>
        
            <Box sx={Style.mainSection}>
                <Outlet/>
            </Box>
        </div>
      </>
    );
  }
  