
// import React, { useState, useCallback } from 'react'
// import {useNavigate} from 'react-router-dom'; 
// import { CircularProgress } from '@mui/material';
// import Style from '../../static/style';
// import Map, {Marker} from 'react-map-gl';




export default function LocationsMap({locations, isBusy}) {
    // console.log('render')
    // let navigate = useNavigate();
    // const center = { lat: 22.302711, lng: 114.177216 }
    
    // const [map, setMap] = useState(null)

    // console.log('', locations)



    // return (
    //     <Map
    //     initialViewState={{
    //       longitude: -100,
    //       latitude: 40,
    //       zoom: 3.5
    //     }}
    //     mapStyle="mapbox://styles/mapbox/streets-v9"
    //   >
    //     <Marker longitude={-100} latitude={40} anchor="bottom" >
    //       <img src="./pin.png" />
    //     </Marker>
    //   </Map>
    // )
                // <GoogleMap
                //     center={center}
                    
                    
                //     mapContainerStyle={Style.mapContainer}
                //     options={{
                //         zoomControl: false,
                //         streetViewControl: false,
                //         mapTypeControl: false,
                //         fullscreenControl: false,
                //         minZoom: 1,
                //         maxZoom: 6,
                       
                //     }}
                //     zoom ={1}
                //     onLoad={onLoad}
                   
                // >
                //  <Marker position={{ lat: -34.397, lng: 150.644 }} />
                //     {/* {   
                //         locations.length > 0 && 
                //         locations.map((location, key) => (<Marker key={key}
                //                             position={{ 
                //                                 lat: parseFloat(location.info.latitude), 
                //                                 lng: parseFloat(location.info.longitude)}}
                //                             onLoad={markerOnLoad}
                //                             // onClick={() => {
                //                             //     navigate(`/location/${location.locationID}`);
                //                             // }}
                //             />)
                //         )
                //     } */}
                // </GoogleMap>



}

