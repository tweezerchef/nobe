import { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api";
// import Places from "./places"
import "../../styles/mapstyles.css"

import { SpotContainer, Controls, Map, MapContainer } from "../../pages/style";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


function ReadingSpotsMap() {
  const center = useMemo(() => ({ lat: 40, lng: -80 }), []);


  return (
    <div className="spots-container">
      <div className="controls">
        What are your favorite reading spots?
      </div>
      <div className="spots-map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
        ></GoogleMap>
      </div>
    </div>

    // <SpotContainer className="spots-container">
    //   <Controls className="controls">
    //     What are your favorite reading spots?
    //   </Controls>
    //   <Map className="spots-map">
    //     <GoogleMap
    //       zoom={10}
    //       center={center}
    //     ></GoogleMap>
    //   </Map>
    // </SpotContainer>
  )
}

export default ReadingSpotsMap;
