import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import { Box, Button, Link, TextField } from '@mui/material';
import Style from '../../static/style';
import serverURL from '../../constant';

export default function AdminLogin({setTheme}){
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
  
    const usernameOnChangeHandler = (e)=>{
      setUsername(e.target.value)
    }
  
    const passwordOnChangeHandler = (e)=>{
      setPassword(e.target.value)
    }
 
    const loginOnClickHandler = async()=>{
      const res = await fetch(`${serverURL}/admin/login`,
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': "application/json"
          },
          body: JSON.stringify({
              "username": username,
              "password": password
          })
      })
      if(res.ok){
        await res.json().then(res=>localStorage.setItem('jwt', res.accessToken)).catch(err=>console.log(err))
        navigate('/admins/location', {replace: true})
      }
          return 
      }

      useEffect(()=>{
        setTheme(false)
      }, [])
        
  
    return(
    
      <Box sx={Style.pageContainer}>
  
            <Box sx={Style.header}>
                <Typography variant="h1" color="primary.darker">Weather Box</Typography>      
            </Box>

          <Box sx={Style.mainSection}>

                <Box sx={Style.loginContainer}>
                <Typography variant="h4" color="secondary.main">Admin Login</Typography>    
                    <TextField onChange={usernameOnChangeHandler} type="text" variant="filled" label="USERNAME" />
                   <TextField onChange={passwordOnChangeHandler} type="text" variant="filled" label="PASSWORD" />

                    
                     <Button variant="contained" onClick={loginOnClickHandler}>Login</Button>  
                     <Link onClick={()=>navigate('/login/user')}> Go to User Login</Link>           

              </Box>
          </Box>
            <Box sx={Style.footer}>
                <p>© 2022 Spring Semester CSCI2720 Building Web Applications GROUP 13</p>
            </Box>
      </Box>
    )
  }

