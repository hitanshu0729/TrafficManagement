import { useRef, useEffect, useState } from "react";

import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "./App.css";

const API_KEY = "zyl5qTjWPtWG4Gi0ALRUdApUIWuA4AAN";
const SAN_FRANCISCO = [ 86.2029,22.8046];

function TomTom({data}) {
  const mapElement = useRef();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  console.log(data);
  useEffect(() => {
    const map = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: SAN_FRANCISCO,
      zoom: 12
    });
    setMap(map);
    return () => map.remove();
  }, []);

  useEffect(() => {
    map && map.on("click", addMarker);
    return () => map && map.off("click", addMarker);
  }, [map, markers]);

  const addMarker = (event) => {
    if (markers.length < 2) {
      console.log(event.lngLat)
      const marker = new tt.Marker().setLngLat(event.lngLat).addTo(map);
      setMarkers((markers) => [...markers, marker]);
    }
  };

  const clear = () => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);

    removeRoute("green");
    removeRoute("red");
  };

  const route = () => {
    if (markers.length < 2) return;

    const key = API_KEY;
    const locations = markers.map((marker) => marker.getLngLat());

    calculateRoute("green", {
      key,
      locations
    });

    calculateRoute("red", {
      key,
      locations,
      travelMode: "truck",
      vehicleLoadType: "otherHazmatExplosive",
      vehicleWeight: 8000
    });
  };

  const calculateRoute = async (color, routeOptions) => {
    try {
      const response = await services.calculateRoute(routeOptions);
      const geojson = response.toGeoJson();

      map.addLayer({
        id: color,
        type: "line",
        source: {
          type: "geojson",
          data: geojson
        },
        paint: {
          "line-color": color,
          "line-width": 6
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeRoute = (id) => {
    map.removeLayer(id);
    map.removeSource(id);
  };

  return (
    <div className="App">
      <div ref={mapElement} className="mapDiv">
        <button className="clearButton" onClick={clear}>
          Clear
        </button>
        <button className="routeButton" onClick={route}>
          Route
        </button>
      </div>
    </div>
  );
}

export default TomTom;