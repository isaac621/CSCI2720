import React from 'react'
import Map from './Map'

function LocationsMap() {
    const center = { lat: 0, lng: 0 }
    const zoomLevel = 2

    return (
        <div styles={{ marginLeft: 15, marginRight: 15 }}>
            <Map center={center}
                   zoomLevel={zoomLevel} 
            />
        </div>
    )
}

export default LocationsMap