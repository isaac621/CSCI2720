import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import serverURL from "../../../constant"
import Style from "../../../static/style"

export default function UpdateUser(){
    const [userID, setUserID] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [serverState, setServerState] = useState()

      
    const updateUser = async()=>{
        const jwt=localStorage.getItem('jwt')
        const updateInfo = {"userID"  : userID}
        if(username){
            updateInfo['username'] = username
        }

        if(password){
            updateInfo['password'] = password
        }

        const res = await fetch(`${serverURL}/admin/users/update`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                updateInfo
            })
        })
        if(res.ok){
          setServerState('Update Successfully')
        }
        else{
          setServerState('Update Failed')
        }
            return 
        }
    return(
        <Box sx={Style.formContainer}>
            <Typography variant="h4" color="initial">Update User</Typography>
            <Typography color="initial">Please enter the updated info of the user you want to udpate</Typography>
            <TextField onChange={(e)=>setUserID(e.target.value)} label="User ID"></TextField>
            <TextField onChange={(e)=>setUsername(e.target.value)} label="New Userame"></TextField>
            <TextField onChange={(e)=>setPassword(e.target.value)} label="New Password"></TextField>
            <Button variant="contained" color="secondary" onClick={updateUser} disabled ={!(userID)}>Update</Button>
            <Typography>{serverState}</Typography>
        </Box>
    )
}