import React from 'react';
import Anexo1 from "./../assets/Anexo1.1.png"
import Anexo2 from "./../assets/Anexo2.1.png"
import Anexo3 from "./../assets/Anexo3.1.png"
import Anexo4 from "./../assets/Anexo4.1.png"
import Anexo5 from "./../assets/Anexo5.1.png"
import Anexo6 from "./../assets/Anexo6.1.png"
import Anexo7 from "./../assets/Anexo7.1.png"
import Anexo8 from "./../assets/Anexo8.1.png"


// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./../styles/Maps.module.css";

const Maps = () => {
    return (
        <div className={styles.container}>
            <Carousel navButtonsAlwaysVisible fullHeightHover={false} height={"80vh"} autoPlay={false}>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo1} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo2} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo3} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo4} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo5} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo6} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo7} />
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo8} />
                </Paper>
            </Carousel>
        </div>
    );
}

export default Maps;
