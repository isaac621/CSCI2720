import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import Style from "../../../static/style"

export default function UpdateLocation(){
    const [locationID, setLocationID] = useState()
    const [locationName, setLocationName] = useState()
    const [serverState, setServerState] = useState()

      
    const updateLocation = async()=>{
        const jwt=localStorage.getItem('jwt')
        const res = await fetch('http://localhost:3000/admin/location/update',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                "locationID"  : locationID,
                "name": locationName,
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
            <Typography variant="h4" color="initial">Update Location</Typography>
            <Typography>Please enter the location ID you want to replace and its new location name</Typography>
            <TextField onChange={(e)=>setLocationID(e.target.value)} label="Location ID"></TextField>
            <TextField onChange={(e)=>setLocationName(e.target.value)} label="Location Name"></TextField>
            <Button variant="contained" color="secondary" onClick={updateLocation} disabled ={!(locationID && locationName)}>Update</Button>
            <Typography>{serverState}</Typography>
        </Box>
    )
}