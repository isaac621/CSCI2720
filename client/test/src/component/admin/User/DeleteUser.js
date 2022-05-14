import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import serverURL from "../../../constant"
import Style from "../../../static/style"

export default function DeleteUser(){
    const [userID, setUserID] = useState()
    const [serverState, setServerState] = useState()

    const deleteUser = async()=>{
        const jwt=localStorage.getItem('jwt')
        const res = await fetch(`${serverURL}/admin/users/delete`, {
          method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                "userID"  : userID,
            })
        })
        if(res.ok){
          setServerState('Delete Successfully')
        }
        else{
          setServerState('Delete Failed')
        }
        
      }
    return(
        <Box sx={Style.formContainer}>
            <Typography variant="h4" color="initial">Delete User</Typography>
            <Typography color="initial">Please enter the ID of the user you want to delete</Typography>
            <TextField onChange={(e)=>setUserID(e.target.value)} label="User ID"></TextField>
            <Button variant="contained" color="secondary" onClick={deleteUser}>Delete</Button>
            <Typography>{serverState}</Typography>
        </Box>
    )
}