
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
import { HeartFilled, UnorderedListOutlined, PlusCircleFilled, GooglePlusOutlined } from '@ant-design/icons';

import { Button, Paper, Table, TableBody, TableCell, TableContainer, Card, TableHead, TablePagination, TableRow, Typography, CircularProgress, Box, TextField, CardContent } from "@mui/material";
import { Input, notification } from 'antd';
import Map from './Map';
import Style from '../../static/style';
import serverURL from '../../constant';



function Location() {
    let {locationID} = useParams()
    let navigate = useNavigate()
    const {TextArea} = Input
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUsMnYpECCQOdWUnCb6JY54vZVrGfwp4Y',
        // libraries: ['places'],
    })

   
    const [loading, setLoading] = useState(false)
    const [marker, setMarker] = useState({lat: 0, lng: 0});
    const [fetchedData, setFetchedData] = useState()
    const [tableData, setTableData] = useState()
    const [fetchedList, setFetchedList] = useState([])
    const [comment, setComment] = useState('')
    const zoomLevel = 10

    const fetchLocationAndUserList = async() => {
        const jwt = localStorage.getItem('jwt')
        // console.log(jwt)

        let res = await fetch(`${serverURL}/users/location/get/${locationID}`, {
            headers:{
                'Authorization': `Bearer ${jwt}`
            }
        })
  
        if(res.ok){
            await res.json().then(res=>{
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
                    createData('Wind_kph', res.weather.wind_kph),
                    createData('Wind_dir', res.weather.wind_dir)
                ])
                
            })
        }

       
        setLoading(true);
        res = await fetch(`${serverURL}/users/favorite`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        setLoading(false);

        if (res.ok) {
            await res.json().then(res => {
                console.log("list", res)
                setFetchedList(res)
            })
        }
    }

 
    
    const addFavourite = async () => {
        const jwt = localStorage.getItem('jwt')
        let flag = false;

        // check whether or not the location already existed in favorite list
        _.forEach(fetchedList, (i) => {
            console.log("i>>", i)
            if (i?.locationID === _.toInteger(locationID)) {
                flag = true;
            }
        })

         console.log(flag)

        if (flag) {
            notification.error({ message: 'Location CANNOT be added', description: 'Locations already existed in favourite list!' });
            
        } else {
            notification.success({ message: 'Location is added SUCCESSFULLY' });
            setLoading(true);
            const res = await fetch(`${serverURL}/users/favorite/create/${locationID}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },

                method: "POST"
            })
            setLoading(false);

            if (res.ok) {
                console.log("result", res)
            }
        }
    }

    const createComments = async () => {
        const jwt = localStorage.getItem('jwt')
        setLoading(true);
        const res = await fetch(`${serverURL}/users/comment`, {
            method: "POST",

            body: JSON.stringify({
                locID: _.toInteger(locationID),
                content: comment
            }),

            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        })
        setLoading(false);

        if (res.ok) {
            console.log("result", res)
        }

        // refresh page
        window.location.reload(false)
    }

    function createData(title, value){
        return{
            title: title,
            value: value
        }
    }

    useEffect(() => {
        fetchLocationAndUserList()

    }, [])


    

    if (loading) {
        return null
    }

  return (
      <Box sx={{display: 'flex', alignItems: 'center', gap: 5}}>
        
        {fetchedData ? 
         

        <>

            <TableContainer sx={{height: '530px', width: '350px'}} component={Paper}>
            <Table sx={{ minWidth: 350}} aria-label="simple table">
            
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
            <Map center={marker} zoomLevel={zoomLevel}/>
            <Box sx={Style.buttonContainer}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<HeartFilled />}
                    onClick={addFavourite}
                    >
                        Add Location to Favourite
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<GooglePlusOutlined />}
                    onClick={()=>{
                        navigate('/user/locations', {replace: true})
                    }}
                    >
                        Back to Map
                </Button>
            </Box>
            
            
            
        </Box>
        <Box sx={{position: 'relative'}}>
        
            <Typography variant="h5" color="initial">
                User Comments:
            </Typography>
            <Box sx={{minWidth: '500px', height: '500px', overflowY: 'scroll'}}>

            {
                (fetchedData?.comments)?.map((comments, key) => {
                    console.log('',comments)
                    return (
                        <Card sx={{py: 0.1, my: 1}}>
                            <CardContent>
                                <Typography variant="h6" color="primary.main">Username: {comments.username}</Typography>
                                <Typography variant="body1" color="initial">{comments.content}</Typography>
                                <Typography variant="caption" color="initial">Comment Last Update Time: {comments.updatedAt}</Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
            </Box>
            
            <TextField
                sx={{width: '100%', my: 2}}
                placeholder={'Comments'}
                label={'Add your comments:'}
                onChange={
                    (e) => {
                        setComment(e.target.value)
                    }}
                multiline
                maxRows={4}
                minRows={4}

                />
                <Button 
                    sx={{position: 'absolute', bottom: 0, transform: 'translateX(-100%) translateY(-50%)'}}
                    variant="contained" 
                    color="primary" 
                    startIcon={<PlusCircleFilled />}
                    onClick={createComments}
                    >
                        Comment
                </Button>
        </Box>
        </>:
        <CircularProgress/>
        }
       
      </Box>
    
  )
}

export default Location