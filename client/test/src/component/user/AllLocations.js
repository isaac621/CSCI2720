import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import LocationsMap from "./LocationsMap"

export default function AllLocations(){
    const [fetchedData, setFetchedData] = useState()
    const [isBusy, setIsBusy] = useState(true)
    const fetchLocations = async() => {
        const jwt = localStorage.getItem('jwt')
       
  
        const res = await fetch('http://localhost:3000/users/locations', {
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
            
        </>
    )
}