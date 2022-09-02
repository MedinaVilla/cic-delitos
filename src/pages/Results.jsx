import React from 'react';
import Grid from '@mui/material/Grid';
import Graph from "./../assets/graph.PNG";

const Results = () => {
    return (
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <img style={{width:"100%"}} src={Graph} alt="graph"/>
                </Grid>
                <Grid item xs={4}>
                    <div>

                    </div>
                </Grid>
            </Grid>
    );
}

export default Results;
