import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import serverURL from "../../../../constant"
import Style from "../../../static/style"

export default function CreateUser(){
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [serverState, setServerState] = useState()


    const createUser = async()=>{
        const jwt = localStorage.getItem('jwt')
        const res = await fetch(`${serverURL}/admin/users/create`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        if(res.ok){
          setServerState('Create Successfully')
        }
        else{
          setServerState('Create Failed')
        }
            return 
        }
    
    return(
        <Box sx={Style.formContainer}>
            <Typography variant="h4" color="initial">Create Location</Typography>
            <Typography color="initial">Please enter the username and password of the new user</Typography>
            <TextField onChange={(e)=>setUsername(e.target.value)} label="Username"></TextField>
            <TextField onChange={(e)=>setPassword(e.target.value)} label="Password"></TextField>
            <Button variant="contained" color="secondary" onClick={createUser}>Create</Button>
            <Typography>{serverState}</Typography>
        </Box>
    )
}