import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import { Box, Button, TextField } from '@mui/material';
import Style from '../../static/style';

export default function UserLogin(){
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
        const res = await fetch('http://localhost:3000/users/login',
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
        navigate('/user/table', {replace: true})
      }
          return 
      }
  

     
      
    return(
    
      <Box sx={Style.pageContainer}>
  
            <Box sx={Style.header}>
                <Typography variant="h1" color="primary.darker">Weather Box</Typography>      
            </Box>

          <Box sx={Style.mainSection}>

                <Box sx={Style.loginContainer} 
                >
                <Typography variant="h4" color="secondary.main">User Login</Typography>    
                    <TextField onChange={usernameOnChangeHandler} type="text" variant="filled" label="USERNAME" required="required"/>
                   <TextField onChange={passwordOnChangeHandler} type="text" variant="filled" label="PASSWORD" required="required"/>


                     <Button variant="contained" onClick={loginOnClickHandler}>Login</Button>          

              </Box>
          </Box>
            <Box sx={Style.footer}>
                <p>© 2022 Spring Semester CSCI2720 Building Web Applications GROUP 13</p>
            </Box>
      </Box>
    )
  }

