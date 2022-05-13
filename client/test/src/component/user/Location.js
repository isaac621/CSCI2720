
import {
    // useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    useLoadScript
} from '@react-google-maps/api'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'; 
import _ from 'lodash';

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, CircularProgress } from "@mui/material";
import { Box } from '@mui/system';
function Location() {
    let {locationID} = useParams()
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUsMnYpECCQOdWUnCb6JY54vZVrGfwp4Y',
        // libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [location, setLocation] = useState([]);
    const [marker, setMarker] = useState({lat: 0, lng: 0});
    const [fetchedData, setFetchedData] = useState()
    const [tableData, setTableData] = useState()


    const fetchLocation = async() => {
        const jwt = localStorage.getItem('jwt')
        // console.log(jwt)
  
        const res = await fetch(`http://localhost:3000/users/location/get/${locationID}`, {
            headers:{
                'Authorization': `Bearer ${jwt}`
            }
        })
  
        if(res.ok){
            res.json().then(res=>{
                console.log("test", res)
                console.log("test", res.info.latitude)
                setFetchedData(res)
                setMarker({lat: parseFloat(res.info.latitude), lng: parseFloat(res.info.longitude)})
                console.log("data", fetchedData)
                console.log("data", marker)
                setTableData([
                    createData('ID', res.locationID),
                    createData('Name', res.info.name),
                    createData('Latitude', res.info.latitude),
                    createData('Longitude', res.info.longitude),
                    createData('Humidity', res.weather.humidity),
                    createData('Precip_mm', res.weather.precip_mm),
                    createData('Temp_c', res.weather.temp_c),
                    createData('Vis_km', res.weather.vis_km),
                    createData('Wind_kph', res.weather.wind_kph)
                ])
                
            })
        }
    }

    function createData(title, value){
        return{
            title: title,
            value: value
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [])


    

    if (!isLoaded) {
        return <CircularProgress>{console.log("cannot load")}</CircularProgress>
    }

  return (
      <Box sx={{display: 'flex', gap: 5}}>
        
        {fetchedData && 
         

        <>

        <TableContainer component={Paper}>
         <Table sx={{ minWidth: 350 }} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>Title</TableCell>
               <TableCell align="right">Data</TableCell>
               
             </TableRow>
           </TableHead>
           <TableBody>
           {tableData.map((data, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.title}
              </TableCell>
              <TableCell align="right">{data.value}</TableCell>
            </TableRow>
          ))}
           </TableBody>
         </Table>
       </TableContainer>
        <Box>
            
            <div>
                User Comments:
            </div>
            {
                (fetchedData.comments).map((comments, key) => {
                    console.log('',comments)
                    return (
                        <>
                            <br/>
                            <div>
                                Username: {comments.username}
                            </div>
                            <div>
                                Comment Content: {comments.content}
                            </div>
                            <div>
                                Comment Last Update Time: {comments.updatedAt}
                            </div>
                        </>
                    )
                })
            }
            <div>
                Add your comments:
            </div>
        </Box>
        </>
        }
       
      </Box>
    
  )
}

export default Location