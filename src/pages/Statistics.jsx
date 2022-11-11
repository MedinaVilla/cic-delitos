import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ChartC from '../components/Chart';
import axios from 'axios';



const Statistics = () => {
    const [delitosDelegacion, setDelitosDelegacion] = useState();
    const [delitosHour, setDelitosHour] = useState();
    const [delitosEdad, setDelitosEdad] = useState();


    const [charts, setCharts] = useState([
        {
            title: "Delitos por delegación",
            info: "Cadencia de delitos por delegación en la Ciudad de México",
            type: "bar",
            state: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: "#1687A7",
                        borderColor: "#000000",
                        borderWidth: 2,
                        data: [65, 34, 34, 34, 34]
                    },

                ]
            }
        },
        {
            title: "Grafica 4",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            type: "doughnut",
            state: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: ["#1C658C", "#398AB9", "#D8D2CB", "#CBAF87", "#E7DEC8"],
                        borderColor: "#000000",
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }
        },
        {
            title: "Grafica 5",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            type: "pie",
            state: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: ["#1C658C", "#398AB9", "#D8D2CB", "#CBAF87", "#E7DEC8"],
                        borderColor: "#000000",
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }
        },
    ])

    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/delitos_genero/graph1").then((response) => {
                let labels = [];
                let data = [];
                response.data.map((delito) => {
                    labels.push(delito.alcaldiaHecho);
                    data.push(parseInt(delito.count));
                })
                setDelitosDelegacion({
                    title: "Delitos por delegación",
                    info: "Cadencia de delitos por delegación en la Ciudad de México",
                    type: "bar",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                backgroundColor: "#800040",
                                borderColor: "#000000",
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
                response.data.map((delito) => {
                    labels.push(delito.rangoHora);
                    data.push(parseInt(delito.count));
                })
                setDelitosHour({
                    title: "Delitos por hora",
                    info: "Delitos cometidos por rango de horas (24 hrs) en la Ciudad de México",
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
                    labels.push(delito.rangoEdad);
                    data.push(parseInt(delito.count));
                })
                setDelitosEdad({
                    title: "Delitos por edad",
                    info: "Delitos cometidos por rango de edades en años en la Ciudad de México ",
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


    return (
        <Container sx={{ m: "2rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    {delitosDelegacion && <ChartC title={delitosDelegacion.title} info={delitosDelegacion.info} state={delitosDelegacion.state} type={delitosDelegacion.type}></ChartC>}
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
