
import _ from 'lodash';
import {
    // useJsApiLoader,
    GoogleMap,
    Marker,
    useLoadScript
} from '@react-google-maps/api'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Skeleton, Box } from '@mui/material';
import Style from '../../static/style';
import serverURL from '../../constant';

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
        const jwt = localStorage.getItem('jwt')
        setLoading(true);
        const res = await fetch(`${serverURL}/users/locations`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
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
        return <Skeleton/>
    }

    return (
        
        <Box sx={Style.mapContainer}>
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

                        fetchedData?.map((fetchedData, key) => {
                            console.log(fetchedData.info.latitude)
                            return (<Marker key={key}
                                            position={{ lat: parseFloat(fetchedData?.info?.latitude), lng: parseFloat(fetchedData?.info?.longitude) }}
                                            onClick={() => {
                                                navigate(`/user/location/${fetchedData?.locationID}`);
                                            }}
                            />)
                        })
                    }
                </GoogleMap>
            </Box>
    )
}

export default Map