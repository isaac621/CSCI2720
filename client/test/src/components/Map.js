import {
    Box,
    SkeletonText,
} from '@chakra-ui/react'
import _ from 'lodash';
import {
    // useJsApiLoader,
    GoogleMap,
    Marker,
    useLoadScript
} from '@react-google-maps/api'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Map({center, zoomLevel}) {
    let navigate = useNavigate()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUsMnYpECCQOdWUnCb6JY54vZVrGfwp4Y',
        // libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [fetchedData, setFetchedData] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchLocations = async () => {

        setLoading(true);
        const res = await fetch('http://localhost:3000/users/locations', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
            }
        })
        setLoading(false);

        if (res.ok) {
            res.json().then(res => {
                console.log(res)
                setFetchedData(res)
            })
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    console.log("data", fetchedData)

    if (!isLoaded) {
        return <SkeletonText />
    }

    return (
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    zoom={zoomLevel}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    {

                        fetchedData.map((fetchedData, key) => {
                            console.log(fetchedData.info.latitude)
                            return (<Marker key={key}
                                            position={{ lat: parseFloat(fetchedData.info.latitude), lng: parseFloat(fetchedData.info.longitude) }}
                                            onClick={() => {
                                                navigate(`/location/${fetchedData.locationID}`);
                                            }}
                            />)
                        })
                    }
                </GoogleMap>
            </Box>
    )
}

export default Map