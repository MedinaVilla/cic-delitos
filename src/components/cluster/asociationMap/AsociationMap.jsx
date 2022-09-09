import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import ShowMarkersCluster from '../ShowMarkersCluster';
import axios from "axios";
import styles from "./../../../styles/AsociationMap.module.css";
import { Alert, Card, CardContent, CircularProgress, Typography } from '@mui/material';

import { MAPBOX_KEY } from "./../../../config/constants";

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

const AsociationMap = () => {
    const mapRef = useRef(null);
    const [zoom] = useState(5);
    const [data, setData] = useState([])

    const [markerSelected, setMarkerSelected] = useState();

    const [loading, setLoading] = useState(true);
    const [loadingMap, setLoadingMap] = useState(true);

    const showContentMarkerAside = async (coords) => {
        setMarkerSelected(coords);
        mapRef.current.flyTo(coords, 18)
    }

    useEffect(() => {
        // DATA fetch
        axios.get("https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10").then((res) => {
            setData(res.data);
            setLoading(false);
        })
    }, [])

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
            <div>
                {
                    markerSelected && <div >
                        <div className={styles.container}>
                            <Card style={{maxWidth:"40vw"}}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                                        Clasificación de los delitos
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}

export default AsociationMap;
