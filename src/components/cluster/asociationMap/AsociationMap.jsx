import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from "./../../../styles/AsociationMap.module.css";
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import { MAPBOX_KEY } from "./../../../config/constants";
import { iconMarker } from '../MarkerIcon';

import axios from "axios";

import * as L from 'leaflet';
import 'leaflet.markercluster';
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

const AsociationMap = ({ markerType }) => {
    const mapRef = useRef(null);
    const [zoom] = useState(11);

    const [markers, setMarkers] = useState([]);
    const [markerSelected, setMarkerSelected] = useState();


    const [transitionOn, setTransitionOn] = useState(false);

    const [showAside, setShowAside] = useState(true);

    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    /* Obrenemos los delitos de genero de nuestra API*/
    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/" + markerType).then((response) => {
                if (response.data) {
                    setMarkers(response.data)
                    setLoadingData(false);
                }

            }).catch((error) => {
                alert(error.message);
                setLoadingData(false);
            })
        }
        fetchData();
    }, [])


    /* Listeners que siempre estara pendiente del cualquier cambio del tamaño del mapa para hacer un RESIZE*/
    useEffect(() => {
        if (transitionOn) {
            const interval = setInterval(() => {
                try {
                    mapRef.current.invalidateSize();
                } catch {
                    clearInterval(interval);
                }
            }, 10);
        }
    }, [transitionOn])

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 200);
        }
    }, [loading])

    /* Convertimos los marcadores en un formato legible para el mapa*/
    const points = markers.map((data, id) => {
        if (!isNaN(data.longitud) && !isNaN(data.latitud)) {
            return ({
                type: "Feature",
                properties: { cluster: false, data: data },
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
                const markers = L.markerClusterGroup({
                    maxClusterRadius: 100,
                    disableClusteringAtZoom: 18,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    chunkedLoading: true
                })

                points.map((point) => {
                    let marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]], { icon: iconMarker })
                    marker.data = point.properties.data
                    marker.addTo(markers);
                })


                markers.on('click', function (marker) {
                    showContentMarkerAside(marker);
                });

                markers.addTo(map.target);

                mapRef.current._layersMaxZoom = 18;
                setLoading(false);
            }, 500
        );
    }

    const showContentMarkerAside = async (marker) => {
        marker.sourceTarget.latlng = marker.latlng;
        if (showAside) { // Si ya estan mostrados los delitos, no hacer ninguna transicion
            setMarkerSelected(marker.sourceTarget.data);
            mapRef.current.flyTo(marker.latlng, 18)
        } else {
            // setShowAside(true);
            mapRef.current.flyTo(marker.latlng, 18)
            setMarkerSelected(marker.sourceTarget.data);
            setTransitionOn(true);
        }
    }

    return (
        <div>
            <div className={loading ? [styles.hidden] : styles.wrapper}>
                <div className={styles.mapContainer}>
                    {!loadingData ? <MapContainer
                        preferCanvas={true}
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
                    </MapContainer> : ""}
                </div>

                {
                    <div style={{ marginLeft: "24px" }}>
                        <div className={styles.aside}>
                            <Container >
                                <Box style={{ backgroundColor: "#0E8DD4", color: "white", padding: "18px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
                                    <Typography sx={{ fontSize: 18 }} color="white" >
                                        Reglas de Asociación  {markerSelected ? markerSelected.idCarpeta : ""}
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
