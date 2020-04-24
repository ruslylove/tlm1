import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import map_marker from '../assets/images/map_marker.png'

const PointGraphic = (props) => {

    const [graphic, setGraphic] = useState(null);
    useEffect(() => {

        loadModules(['esri/Graphic']).then(([Graphic]) => {
            var point = {
                type: "point",
                longitude: props.long,
                latitude: props.lat,
            };

            var simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 30, 30],  // orange
                outline: {
                    color: [255, 255, 255], // white
                    width: 1
                }
            };

            var symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: map_marker,
                width: "64px",
                height: "64px"
            };

            var graphic = new Graphic({
                geometry: point,
                symbol: symbol,
            });

            setGraphic(graphic);
            props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, []);

    return null;

}

export default PointGraphic;