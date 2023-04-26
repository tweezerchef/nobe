import { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api"
// import Places from "./places"
// import "../components/styles/mapstyles.css"
import { SpotContainer, Controls } from "../../pages/style";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


function ReadingSpotsMap() {
  const center = useMemo(() => ({ lat: 40, lng: -80 }), []);


  return <SpotContainer>
    <Controls>What are your favorite reading spots?</Controls>
    <div className="spots-map">
    </div>
  </SpotContainer>
}

export default ReadingSpotsMap;
