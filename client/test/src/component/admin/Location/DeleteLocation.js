import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import serverURL from "../../../constant"
import Style from "../../../static/style"

export default function DeleteLocation(){
    const [locationID, setLocationID] = useState()
    const [serverState, setServerState] = useState()

    const deleteLocation = async()=>{
        const jwt = localStorage.getItem('jwt')
        const res = await fetch(`${serverURL}/admin/location/delete`, {
          method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                "locationID"  : locationID,
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
            <Typography variant="h4" color="initial">Delete Location</Typography>
            <Typography color="initial">Please enter the ID of the location you want to delete</Typography>
            <TextField onChange={(e)=>setLocationID(e.target.value)} label="Location ID"></TextField>
            <Button variant="contained" color="secondary" onClick={deleteLocation}>Delete</Button>
            <Typography>{serverState}</Typography>
        </Box>
    )
}