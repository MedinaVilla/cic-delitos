import React, { useEffect, useRef, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import { MAPBOX_KEY } from "./../config/constants";

import styles from "./../styles/Home.module.css";
import { Alert, CircularProgress } from '@mui/material';
import dataCSV from "./../data/Delitos_Violentos_Preprocesado.json";

import { iconMarker } from '../components/cluster/MarkerIcon';

import * as L from 'leaflet';
import 'leaflet.markercluster';
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY;

const Home = () => {
    const mapRef = useRef(null);
    const [zoom] = useState(7);

    const [showAside, setShowAside] = useState(false);
    const [markerSelected, setMarkerSelected] = useState();
    const [transitionOn, setTransitionOn] = useState(false);

    const [loadingMap, setLoadingMap] = useState(true);

    const showContentMarkerAside = async (coords) => {
        if (showAside) { // Si ya mostrado los delitos, no hacer ninguna transicion
            setMarkerSelected(coords);
            mapRef.current.flyTo(coords, 18)
        } else {
            setShowAside(true);
            setMarkerSelected(coords);
            setTransitionOn(true);
        }
    }

    useEffect(() => {
        if (transitionOn) {
            setInterval(() => {
                mapRef.current.invalidateSize();
            }, 10);
        }
    }, [transitionOn])


    const points = dataCSV.map((data, id) => {
        if (!isNaN(data.longitud) && !isNaN(data.latitud)) {
            return ({
                type: "Feature",
                properties: { cluster: false, crimeId: id, category: data.Delito },
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
            maxClusterRadius: 120,
        }).addLayer(lightData);
        map.target._layersMaxZoom = 16;
        map.target.addLayer(markers);

        markers.on('click', function (a) {
            showContentMarkerAside(a.latlng);
        });

        setLoadingMap(false);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.mapContainer}>
                <MapContainer
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
                    (loadingMap) && <div className={styles.circularProgress}>
                        <CircularProgress color="error" />
                    </div>
                }
            </div>
            <div className={showAside ? styles.animated : ""} style={{ transition: "flex-grow 200ms linear ", maxWidth: "35vw", alignContent: "center" }} onTransitionEnd={() => {
                setTransitionOn(false);
                mapRef.current.flyTo(markerSelected, 18)
            }
            }>
                {
                    markerSelected && <div>
                        <div className={styles.container}>
                            <Alert severity="error" icon={false}>
                                El total de delitos cometidos cerca de esta zona es: {markerSelected.toString()}
                            </Alert>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Home;
