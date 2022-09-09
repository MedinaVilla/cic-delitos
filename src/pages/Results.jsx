import React from 'react';
import Grid from '@mui/material/Grid';
import Graph from "./../assets/graph.PNG";
import { Card } from '@material-ui/core';
import { CardContent, Typography } from '@mui/material';
import AsociationMap from '../components/cluster/asociationMap/AsociationMap';

const Results = () => {
    return (
        <div style={{ padding: "28px", }}>
            <Grid container alignItems="center" >
                <Grid item xs={12} md={7} lg={8} style={{ textAlign: "center" }}>
                    <img style={{ width: "100%", maxWidth: "600px" }} src={Graph} alt="graph" />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                                Clasificación de los delitos
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br/>
            <AsociationMap/>
        </div>
    );
}

export default Results;
