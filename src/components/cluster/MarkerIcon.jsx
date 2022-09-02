import { Icon, Point } from 'leaflet';

const iconMarker= new Icon({
    iconUrl: require("./../../assets/marker.png"),
    iconRetinaUrl: require("./../../assets/marker.png"),
    iconAnchor: [10, 45], // point of the icon which will correspond to marker's location
    iconSize: new Point(25, 40),
});

export { iconMarker };