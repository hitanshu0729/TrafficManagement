import React from 'react';
import {
    MapContainer,
    TileLayer,
    Polygon,
    Marker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data.jsx';
import { Icon } from 'leaflet'; // Import Icon from Leaflet
// import svgd from "./pop.png"

const center = [25.4661412, 81.8840872];
const fancyIcon = new Icon({
    iconUrl: "https://w7.pngwing.com/pngs/8/868/png-transparent-google-maps-hd-logo-thumbnail.png",
    iconSize: [16, 16],
    iconAnchor: [16, 32],
});

export default function MyMap({ data }) {
    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ width: '90%', height: '1600px' }} // Adjusted width to 80%
        >
            <TileLayer
                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=onCCkUs0rMxBBsgJJFlY"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />
            {
                statesData.features.map((state, index) => {
                    const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

                    const addMarker = true;
                    const markerPosition =[22.8046 ,86.2029];

                    return (
                        <React.Fragment key={index}>
                            <Polygon
                                pathOptions={{
                                    fillColor: '#FD8D3C',
                                    fillOpacity: 0.7,
                                    weight: 2,
                                    opacity: 1,
                                    dashArray: 3,
                                    color: 'white'
                                }}
                                positions={coordinates}
                                eventHandlers={{
                                    mouseover: (e) => {
                                        const layer = e.target;
                                        layer.setStyle({
                                            dashArray: "",
                                            fillColor: "#BD0026",
                                            fillOpacity: 0.7,
                                            weight: 2,
                                            opacity: 1,
                                            color: "white",
                                        })
                                    },
                                    mouseout: (e) => {
                                        const layer = e.target;
                                        layer.setStyle({
                                            fillOpacity: 0.7,
                                            weight: 2,
                                            dashArray: "3",
                                            color: 'white',
                                            fillColor: '#FD8D3C'
                                        });
                                    },
                                    click: (e) => {

                                    }
                                }}
                            />
                            {data &&
                                Object.values(data).map((item, index) => (
                                    item.location && item.location[0] && item.location[0]&& ( // Check if Location is defined and has lat/lng properties
                                        <Marker
                                            key={index}
                                            position={[item.location[0], item.location[1]]} // Use lat/lng properties for position
                                        />
                                    )
                                ))
                            }
                        
                        </React.Fragment>
                    );
                })
            }
        </MapContainer>
    );
}