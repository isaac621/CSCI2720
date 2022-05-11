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
import _ from 'lodash';
import {
    // useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    useLoadScript
} from '@react-google-maps/api'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import {useNavigate, useParams} from 'react-router-dom'; 

const center = { lat: 0, lng: 0 }
// const center = { lat: 48.8584, lng: 2.2945 }

function LocationsMap() {
    let navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUsMnYpECCQOdWUnCb6JY54vZVrGfwp4Y',
        // libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [fetchedData, setFetchedData] = useState([])

    const fetchLocations = async() => {
        // const jwt = localStorage.getItem('jwt')
        // console.log(jwt)
  
        const res = await fetch('http://localhost:3000/users/locations', {
            headers:{
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
            }
        })
  
        if(res.ok){
          res.json().then(res=>{
                console.log(res)
                setFetchedData(res)
            })
        }      
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    console.log("data", fetchedData)
    // /** @type React.MutableRefObject<HTMLInputElement> */
    // const originRef = useRef()
    // /** @type React.MutableRefObject<HTMLInputElement> */
    // const destiantionRef = useRef()


    if (!isLoaded) {
        return <SkeletonText />
    }

    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
        >
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    zoom={2}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        // zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    {/* <Marker id={4} key={4} position={{ lat: 0, lng: 0 }} className="fuck"/> */}
                    {

                        fetchedData.map((fetchedData, key) => {
                            console.log(fetchedData.info.latitude)
                            return (<Marker key={key}
                                            position={{ lat: parseFloat(fetchedData.info.latitude), lng: parseFloat(fetchedData.info.longitude) }}
                                            onClick={() => {
                                                // console.log(parseFloat(fetchedData.info.latitude))
                                                // map.panTo({ lat: parseFloat(fetchedData.info.latitude), lng: parseFloat(fetchedData.info.longitude) });
                                                // map.setZoom(10);
                                                // console.log("finger");
                                                navigate(`/location/${fetchedData.locationID}`);
                                            }}
                            />)
                        })
                    }
                </GoogleMap>
            </Box>
        </Flex>
    )
}

export default LocationsMap