import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ChartC from '../components/Chart';



const Statistics = () => {
    const [charts, setCharts] = useState([
        {
            title: "Grafica 1",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            type: "line",
            state: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: "#CBAF87",
                        borderColor: "#000000",
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }
        },
        {
            title: "Grafica 2",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            type: "bar",
            state: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: "#1687A7",
                        borderColor: "#000000",
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }
        },
        {
            title: "Grafica 3",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            type: "line",
            state: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: "#CBAF87",
                        borderColor: "#000000",
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
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
        {
            title: "Grafica 6",
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
        }
    ])

    return (
        <Container sx={{ m: "2rem" }}>
            <Grid container spacing={2}>
                {charts.map((chart, key) => (
                    <Grid key={key} item xs={12} sm={6} md={4}>
                        <ChartC title={chart.title} info={chart.info} state={chart.state} type={chart.type}></ChartC>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Statistics;
