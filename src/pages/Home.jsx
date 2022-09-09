import React, { useEffect, useRef, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import { MAPBOX_KEY } from "./../config/constants";

import axios from "axios";
import ShowMarkersCluster from "./../components/cluster/ShowMarkersCluster";
import styles from "./../styles/Home.module.css";

import { Alert, CircularProgress } from '@mui/material';

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

const Home = () => {
    const mapRef = useRef(null);
    const [zoom] = useState(5);
    const [data, setData] = useState([])

    const [showAside, setShowAside] = useState(false);
    const [markerSelected, setMarkerSelected] = useState();
    const [transitionOn, setTransitionOn] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingMap, setLoadingMap] = useState(true);

    useEffect(() => {
        // DATA fetch
        axios.get("https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10").then((res) => {
            setData(res.data);
            setLoading(false);
        })
    }, [])

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

        return (
            <div className={styles.wrapper}>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={[52.6376, -1.135171]}
                        zoom={zoom}
                        ref={mapRef}
                        style={{ height: '100%', width: "100%" }}
                        whenReady={() => { setLoadingMap(false) }}
                    >
                        <TileLayer
                            url={mapboxUriTileLayer}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <ShowMarkersCluster onClickMarker={showContentMarkerAside} data={data} />
                    </MapContainer>
                    {
                        (loadingMap || loading) && <div className={styles.circularProgress}>
                            <CircularProgress color="error" />
                        </div>
                    }
                </div>
                <div className={showAside ? styles.animated : ""} style={{ transition: "flex-grow 500ms linear", alignContent: "center" }} onTransitionEnd={() => {
                    setTransitionOn(false);
                    mapRef.current.flyTo(markerSelected, 18)
                }
                }>
                    {
                        markerSelected && <div >
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
