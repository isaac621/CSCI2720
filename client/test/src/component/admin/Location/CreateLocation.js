import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import Style from "../../../static/style"

export default function CreateLocation(){
    const [locationName, setLocationName] = useState()
    const [serverState, setServerState] = useState()

    const createLocation = async()=>{
        const jwt = localStorage.getItem('jwt')
        const res = await fetch('http://localhost:3000/admin/location/create',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                "name": locationName,
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
            <Typography>Please enter the name of the location you want to create</Typography>
            <TextField onChange={(e)=>setLocationName(e.target.value)} label="Location Name"></TextField>
            <Button variant="contained" color="secondary" onClick={createLocation}>Create</Button>
            <Typography>{serverState}</Typography>
        </Box>
    )
}