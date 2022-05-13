import { Box, Button, Divider, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Style from "../../static/style";

export default function UserNav({setTheme, theme}){
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt')
    const logoutOnClickHandler = ()=>{
      localStorage.removeItem('jwt')
      navigate('/login/user', {replace: true})

    }

    const [username, setUsername] = useState('')

    const fetchUserName = async() =>{
      
       const res = await fetch('http://localhost:3000/users/username', {
         headers: {
            'Authorization': `Bearer ${jwt}`
         }

        }).then(res=>res.text())
        
      setUsername(res)

    }

    const switchOnClickHandler = async () =>{
      const value = !theme
      setTheme(value)
      await fetch('http://localhost:3000/users/theme', {
        method: 'POST',
         headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           theme: value
         })

        })
    }

    useEffect(()=>{
      fetchUserName()
    }, [])
    return (
      <Box sx={Style.nav} > 
        <Box sx={{position: 'absolute', left: 50, display: 'flex', alignItems: 'center'}}>
          <Typography variant="body1" color="primary.light" >Username: {username} </Typography>
          
            
            <Switch onClick={switchOnClickHandler} checked={theme} />
            <Typography variant="caption" color="initial" >Color Scheme</Typography>
        </Box>
        <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        >
              
                <Button onClick={()=>navigate('/user/locations')} variant="text">
                    All Locations
                </Button>
        



                <Button onClick={()=>navigate('/user/favorite')} variant="text">
                    Favourite
                </Button>
      
                <Button  variant="contained" onClick={logoutOnClickHandler}>
                    Logout
                </Button>
        </Stack>
      </Box>
    );
  }
  