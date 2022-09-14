onmessage = function (points, L) {
    const data = {
        type: "FeatureCollection",
        features: points,
    }
    const lightData = L.geoJSON(data, {
        chunkedLoading: true
        // pointToLayer: function (feature, latlng) {
        //     return L.marker(latlng, { icon: iconMarker });
        // },

    });
    console.log("YES")

    const markers = L.markerClusterGroup({
        maxClusterRadius: 200,
        disableClusteringAtZoom: 18,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
    })
    markers.addLayer(lightData);
    console.log("ohoh")

    postMessage(markers);
}