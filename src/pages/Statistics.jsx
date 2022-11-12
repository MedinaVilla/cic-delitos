import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ChartC from '../components/Chart';
import axios from 'axios';



const Statistics = () => {
    const [delitosGDelegacion, setDelitosGDelegacion] = useState();
    const [delitosVDelegacion, setDelitosVDelegacion] = useState();

    const [delitosHour, setDelitosHour] = useState();
    const [delitosEdad, setDelitosEdad] = useState();

    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/delitos_genero/graph1").then((response) => {
                let labels = [];
                let data = [];
                response.data.map((delito) => {
                    labels.push(delito.alcaldiaHecho);
                    data.push(parseInt(delito.count));
                    return true;
                })
                setDelitosGDelegacion({
                    title: "Delitos de género por delegación",
                    info: "Número de delitos de género por delegación en la Ciudad de México",
                    type: "bar",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                backgroundColor: "#800040",
                                borderColor: "#671D1D",
                                borderWidth: 2,
                                data: data
                            }
                        ],

                    },

                });
            }).catch((error) => {
                console.log(error)
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/delitos_genero/graph2").then((response) => {

                let labels = [];
                let data = [];
                console.log(response.data)
                response.data.map((delito) => {
                    labels.push(delito.horaHecho);
                    data.push(parseInt(delito.count));
                    return true;
                })
                setDelitosHour({
                    title: "Delitos de género por hora",
                    info: "Delitos de género cometidos por rango de hora en la Ciudad de México",
                    type: "doughnut",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                borderWidth: 4,
                                data: data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 205, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(201, 203, 207, 1)',

                                    'rgba(225, 99, 132, 1)',
                                    'rgba(215, 159, 64, 1)',
                                    'rgba(185, 205, 86, 1)',
                                    'rgba(155, 192, 192, 1)',
                                    'rgba(125, 162, 235, 1)',
                                    'rgba(103, 102, 255, 1)',
                                    'rgba(21, 203, 207, 1)'
                                ],
                            }
                        ],

                    },
                });

            }).catch((error) => {
                console.log(error)
            })
        }
        fetchData();

    }, [])

    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/delitos_genero/graph3").then((response) => {
                let labels = [];
                let data = [];
                response.data.map((delito) => {
                    labels.push(delito.edad);
                    data.push(parseInt(delito.count));
                    return true;
                })
                setDelitosEdad({
                    title: "Delitos de género por edad",
                    info: "Delitos de género cometidos por rango de edad en años en la Ciudad de México ",
                    type: "doughnut",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                borderWidth: 4,
                                data: data,
                                backgroundColor: [
                                    'rgba(225, 99, 132, 1)',
                                    'rgba(215, 159, 64, 1)',
                                    'rgba(185, 205, 86, 1)',
                                    'rgba(155, 192, 192, 1)',
                                    'rgba(125, 162, 235, 1)',
                                    'rgba(103, 102, 255, 1)',
                                    'rgba(21, 203, 207, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 205, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(201, 203, 207, 1)',
                                ],
                            }
                        ],

                    },
                });

            }).catch((error) => {
                console.log(error)
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/delitos_genero/graph4").then((response) => {
                let labels = [];
                let data = [];
                response.data.map((delito) => {
                    labels.push(delito.alcaldiaHecho);
                    data.push(parseInt(delito.count));
                    return true;
                })
                setDelitosVDelegacion({
                    title: "Delitos violentos por delegación",
                    info: "Número de delitos violentos por delegación en la Ciudad de México",
                    type: "bar",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                backgroundColor: "#FFC000",
                                borderColor: "#FFD700",
                                borderWidth: 2,
                                data: data
                            }
                        ],

                    },

                });
            }).catch((error) => {
                console.log(error)
            })
        }
        fetchData();
    }, [])
    return (
        <Container sx={{ m: "2rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    {delitosGDelegacion && <ChartC title={delitosGDelegacion.title} info={delitosGDelegacion.info} state={delitosGDelegacion.state} type={delitosGDelegacion.type}></ChartC>}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    {delitosVDelegacion && <ChartC title={delitosVDelegacion.title} info={delitosVDelegacion.info} state={delitosVDelegacion.state} type={delitosVDelegacion.type}></ChartC>}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    {delitosHour && <ChartC title={delitosHour.title} info={delitosHour.info} state={delitosHour.state} type={delitosHour.type}></ChartC>}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    {delitosEdad && <ChartC title={delitosEdad.title} info={delitosEdad.info} state={delitosEdad.state} type={delitosEdad.type}></ChartC>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Statistics;
