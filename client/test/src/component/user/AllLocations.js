// Lin Hechen		1155125125
// Lui Ming Hong		1155126306
// Lau Justin		1155126756
// CHEN ChengYi	1155126781
// Wong Tsz Lok		1155133187
import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import serverURL from "../../constant"
import LoactionTable from "./LocationTable"
import Map from "./Map"


export default function AllLocations(){
    const center = { lat: 0, lng: 0 }
    const zoomLevel = 1
    const [fetchedData, setFetchedData] = useState()
    const [isBusy, setIsBusy] = useState(true)
    const fetchLocations = async() => {
        const jwt = localStorage.getItem('jwt')
       

        const res = await fetch(`${serverURL}/users/locations`, {
            headers:{
                'Authorization': `Bearer ${jwt}`
            }
        })
  
        if(res.ok){
          res.json().then(res=>{
                console.log(res)
                setFetchedData(res)
                setIsBusy(false)
            })
        }      
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    

    return(
        <>
        <Typography variant="h1" color="initial" sx={{mb: 3}}>Weather Box</Typography>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', gap: 10}}>
            
            <LoactionTable/>
            <Map center={center}
                   zoomLevel={zoomLevel} 
                   
            />
        </Box>
        </>
    )
}