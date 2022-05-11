import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import {
    // useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    useLoadScript
} from '@react-google-maps/api'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import {Col, Row} from 'antd';
import {useNavigate, useParams, useLocation} from 'react-router-dom'; 
import _ from 'lodash';

function Location() {
    let {locationID} = useParams()
    console.log(locationID)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUsMnYpECCQOdWUnCb6JY54vZVrGfwp4Y',
        // libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [location, setLocation] = useState([]);
    const [marker, setMarker] = useState({lat: 0, lng: 0});
    const [fetchedData, setFetchedData] = useState({})
    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    //     setMap(map)
    //   }, [])
    
    //   const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null)
    //   }, [])

    const fetchLocation = async() => {
        // const jwt = localStorage.getItem('jwt')
        // console.log(jwt)
  
        const res = await fetch(`http://localhost:3000/users/location/get/${locationID}`, {
            headers:{
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
            }
        })
  
        if(res.ok){
            res.json().then(res=>{
                console.log("test", res)
                console.log("test", res.info.latitude)
                setFetchedData(res)
                setMarker({lat: parseFloat(res.info.latitude), lng: parseFloat(res.info.longitude)})
            })
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [])

    console.log("data", fetchedData)
    console.log("data", marker)

    if (!isLoaded) {
        return <SkeletonText>{console.log("cannot load")}</SkeletonText>
    }

  return (
      <div>
        {/* <Row>
            <Col span={12}>
                <GoogleMap
                        center={marker}
                        zoom={7}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            // zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={map => setMap(map)}
                    >
                        <Marker id={1} key={1} position={marker} className="fuck"/>
                        {
                            // markers.map((markers, i) => (
                            //   <Marker key={i} position={{lat: markers.latitude, lng: markers.longitude}} />
                            // ))
                                markers.map((markers, key) => {
                                    console.log(markers.latitude)
                                    return (<Marker key={key}
                                        position={{ lat: _.toInteger(markers.latitude), lng: _.toInteger(markers.longitude) }}
                                        onClick={() => {
                                            map.panTo({ lat: _.toInteger(markers.latitude), lng: _.toInteger(markers.longitude) });
                                            map.setZoom(7);
                                            setSelectedID(markers.locationID);
                                            console.log("finger");
                                            navigate("/location");
                                        }}
                                    />)
                                })
                        }
                </GoogleMap>
            </Col>
            <Col span={12}>
                ABC
            </Col>
        </Row> */}

        {/* <GoogleMap
            center={marker}
            zoom={10}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
                // zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
        >
            <Marker key={0} position={marker}/>
        </GoogleMap> */}
        <div>
            Location ID: {fetchedData.locationID}
        </div>
        <div>
            Location Name: {fetchedData.info.name}
        </div>
        <div>
            Location Latitude: {fetchedData.info.latitude}
        </div>
        <div>
            Location Longitude: {fetchedData.info.longitude}
        </div>
        <div>
            humidity: {fetchedData.weather.humidity}
        </div>
        <div>
            precip_mm: {fetchedData.weather.precip_mm}
        </div>
        <div>
            temp_c: {fetchedData.weather.temp_c}
        </div>
        <div>
            vis_km: {fetchedData.weather.vis_km}
        </div>
        <div>
            wind_kph: {fetchedData.weather.wind_kph}
        </div>
        <br/>
        <div>
            User Comments:
        </div>
        {
            (fetchedData.comments).map((comments, key) => {
                console.log(comments)
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
        {/* <form action="http://localhost:3000/event" method="post">

            <label for="eventname">Event name</label>
            <input type="text" id="eventname" name="name">
            <br>

            <label for="locid">Location ID</label>
            <input type="text" id="locid" name="locId">
            <br>

            <label for="eventquota">Event quota</label>
            <input type="text" id="eventquota" name="eventquota">
            <br>
            <br>
            <input type="submit">
        </form> */}
      </div>
  )
}

export default Location