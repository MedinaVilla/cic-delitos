import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from "./../../../styles/AsociationMap.module.css";
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import { MAPBOX_KEY } from "./../../../config/constants";
import { iconMarker } from '../MarkerIcon';

import * as L from 'leaflet';
import 'leaflet.markercluster';
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

const AsociationMap = ({ dataMarkers = [] }) => {
    const mapRef = useRef(null);
    const [zoom] = useState(11);

    const [markerSelected, setMarkerSelected] = useState();


    const [transitionOn, setTransitionOn] = useState(false);

    const [showAside, setShowAside] = useState(true);

    const [clusterMarkers, setClusterMarkers] = useState();
    const [loading, setLoading] = useState(true);

    const showContentMarkerAside = async (marker) => {
        if (showAside) { // Si ya mostrado los delitos, no hacer ninguna transicion
            setMarkerSelected(marker.layer.feature.properties.crime);
            mapRef.current.flyTo(marker.latlng, 18)
        } else {
            setShowAside(true);
            console.log(marker)
            setMarkerSelected(marker.layer.feature.properties.crime);
            setTransitionOn(true);
        }
    }


    const points = dataMarkers.map((data, id) => {
        if (!isNaN(data.longitud) && !isNaN(data.latitud)) {
            return ({
                type: "Feature",
                properties: { cluster: false, crime: data },
                geometry: {
                    type: "Point",
                    coordinates: [
                        parseFloat(data.longitud),
                        parseFloat(data.latitud),
                    ],
                },
            })
        } else return {}
    });

    const renderCluster = (map) => {
        setTimeout(
            () => {
                const data = {
                    type: "FeatureCollection",
                    features: points,
                }
                const lightData = L.geoJSON(data, {
                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng, { icon: iconMarker });
                    },

                });

                const markers = L.markerClusterGroup({
                    maxClusterRadius: 100,
                    disableClusteringAtZoom: 18,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false, 
                }).addLayer(lightData);

                markers.on('click', function (marker) {
                    showContentMarkerAside(marker);
                });

                setClusterMarkers(markers);
            }, 500
        );
    }

    useEffect(() => {
        if (clusterMarkers && mapRef) {
            mapRef.current._layersMaxZoom = 18;
            mapRef.current.addLayer(clusterMarkers);

            setLoading(false);
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 200);
        }
    }, [clusterMarkers, mapRef])


    return (
        <div>
            <div className={loading ? [styles.hidden] : styles.wrapper}>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={[19.432608, -99.133209]}
                        zoom={zoom}
                        ref={mapRef}
                        style={{ height: '100%', width: "100%" }}
                        whenReady={(map) => { renderCluster(map) }}
                    >
                        <TileLayer
                            url={mapboxUriTileLayer}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer>
                </div>

                {
                    <div style={{ marginLeft: "24px" }}>
                        <div className={styles.aside}>
                            <Container >
                                <Box style={{ backgroundColor: "#0E8DD4", color: "white", padding: "18px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
                                    <Typography sx={{ fontSize: 18 }} color="white" >
                                        Reglas de Asociación  {markerSelected? markerSelected.idCarpeta:""}
                                    </Typography>
                                </Box>
                                <Box style={{ padding: "18px", border: "1px solid #E7E7E7" }}>
                                    Cras mattis consectetur purus sit amet fermentum.
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                </Box>
                            </Container>
                        </div>
                    </div>
                }
            </div >
            {
                (loading) && <div className={styles.circularProgress}>
                    <CircularProgress color="error" />
                </div>
            }
        </div>
    );
}

export default AsociationMap;
