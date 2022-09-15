import React from 'react';
import Grid from '@mui/material/Grid';
import Graph from "./../assets/graph.PNG";
import { Container, Typography } from '@mui/material';
import AsociationMap from '../components/cluster/asociationMap/AsociationMap';

import dataCSVG from "./../data/Delitos_Genero_Preproceso.json";
import dataCSVV from "./../data/Delitos_Violentos_Preprocesado.json";
import { Box } from '@mui/system';

const Results = (props) => {

    return (
        <div style={{ padding: "28px", }}>
            <Grid container alignItems="center" >
                <Grid item xs={12} md={7} lg={8} style={{ textAlign: "center" }}>
                    <img style={{ width: "100%", maxWidth: "600px" }} src={Graph} alt="graph" />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <Container>
                        <Box style={{ backgroundColor: "#800040", color: "white", padding: "18px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
                            <Typography sx={{ fontSize: 18 }} color="white" >
                                Clasificación de los delitos
                            </Typography>
                        </Box>
                        <Box style={{ padding: "18px", border: "1px solid #800040" }}>
                            Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        </Box>
                    </Container>
                </Grid>
            </Grid>
            <br />
            <div >
                <Typography sx={{ fontSize: 24 }} color="black" >
                    Delitos de Género
                </Typography>
                <div style={{ borderBottom: "1.5px solid #800040", backgroundColor: "#800040" }} />
            </div>
            <br />

            <AsociationMap dataMarkers={dataCSVG} type="Genero" />
            <br />
            <div >
                <Typography sx={{ fontSize: 24 }} color="black" >
                    Delitos Violentos
                </Typography>
                <div style={{ borderBottom: "1.5px solid #800040", backgroundColor: "#800040" }} />
            </div>
            <br />
            <AsociationMap dataMarkers={dataCSVV} type="Violentos" />
        </div>
    );
}

export default Results;
