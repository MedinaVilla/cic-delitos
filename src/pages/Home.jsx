import React, { useEffect, useRef, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import { MAPBOX_KEY } from "./../config/constants";

import styles from "./../styles/Home.module.css";
import { Alert, CircularProgress } from '@mui/material';
import dataCSV from "./../data/Delitos_Genero_Preproceso.json";

import { iconMarker } from '../components/cluster/MarkerIcon';

import * as L from 'leaflet';
import 'leaflet.markercluster';
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY;

const Home = () => {
    const mapRef = useRef(null);
    const [zoom] = useState(11);

    const [showAside, setShowAside] = useState(false);
    const [markerSelected, setMarkerSelected] = useState();
    const [transitionOn, setTransitionOn] = useState(false);

    const [clusterMarkers, setClusterMarkers] = useState();
    const [loading, setLoading] = useState(true);


    const showContentMarkerAside = async (marker) => {
        marker.layer.feature.properties.crime.latlng = marker.latlng;
        if (showAside) { // Si ya mostrado los delitos, no hacer ninguna transicion
            setMarkerSelected(marker.layer.feature.properties.crime);
            mapRef.current.flyTo(marker.latlng, 18)
        } else {
            // setShowAside(true);
            mapRef.current.flyTo(marker.latlng, 18)
            setMarkerSelected(marker.layer.feature.properties.crime);
            setTransitionOn(true);
        }
    }

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


    const points = dataCSV.map((data, id) => {
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
        <div className={styles.wrapper}>
            <div className={styles.mapContainer}>
                <MapContainer
                    id="mymap"
                    center={[19.432608, -99.133209]}
                    zoom={zoom}
                    ref={mapRef}
                    style={{ height: '100%', width: "100%" }}
                    whenReady={(map) => { renderCluster(map); }
                    }
                >
                    <TileLayer
                        url={mapboxUriTileLayer}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
                {
                    (loading) && <div className={styles.circularProgress}>
                        <CircularProgress color="error" />
                    </div>
                }
            </div>
            <div className={[showAside ? styles.animated : "", styles.aside]} 
                onTransitionEnd={() => {
                    setTransitionOn(false);
                    // mapRef.current.flyTo(markerSelected.latlng, 18)
                }
                }>
                {
                    markerSelected && <div>
                        <div className={styles.container}>
                            <Alert severity="error" icon={false}>
                                El total de delitos cometidos cerca de esta zona es:
                                IdCarpeta: {markerSelected ? markerSelected.idCarpeta : ""}
                            </Alert>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Home;
