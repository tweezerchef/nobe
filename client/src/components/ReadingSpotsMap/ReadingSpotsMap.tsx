import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Places from "./places";
import axios from "axios";
import "../../styles/mapstyles.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface Place {
  id: number;
  Location: string;
  Lat: number;
  Long: number;
}

function ReadingSpotsMap() {
  const [latlng, setLatLng] = useState<LatLngLiteral>();
  const [address, setAddress] = useState<string>("");
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  console.log(savedPlaces)
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);


  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(() => ({ lat: 29.9511, lng: -90.0715 }), []);
  const options = useMemo<MapOptions>(() => ({
    mapId: "89f1db752bd023d1",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      const response = await axios.get('/api/places-to-read/places');
      setSavedPlaces(response.data);
    };
    fetchSavedPlaces();
  }, []);

  const handleMarkerClick = useCallback(() => {
    setShowInfoWindow((prev) => !prev);
  }, []);

  const handlePlaceClick = useCallback((placeId: number) => {
    setSelectedPlace((prev) => (prev === placeId ? null : placeId));
  }, []);

  return (
    <div className="spots-container">
      <div className="controls">
        <h2>Enter your favorite reading spots</h2>
        <Places
          setLatLng={(position: any) => {
            setLatLng(position);
            mapRef.current?.panTo(position);
          }}
          setAddress={setAddress}
        />
      </div>
      <div className="spots-map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {latlng && (
            <Marker
              position={latlng}
              onClick={handleMarkerClick}
              icon={{
                url: "http://maps.google.com/mapfiles/kml/shapes/library_maps.png",
              }}
            >
              {showInfoWindow && (
                <InfoWindow
                  onCloseClick={handleMarkerClick}
                  position={latlng}
                  options={{ maxWidth: 150 }}
                >
                  <div>{address}</div>
                </InfoWindow>
              )}
            </Marker>
          )}
          {savedPlaces?.map((place) => (
            <Marker
              key={place.id}
              // position={new google.maps.LatLng(place.lat, place.lng)}
              position={{ lat: place.Lat, lng: place.Long }}
              icon={{
                url: "http://maps.google.com/mapfiles/kml/shapes/library_maps.png",
              }}
              onClick={() => handlePlaceClick(place.id)}
            >
              {selectedPlace === place.id && (
                <InfoWindow
                  onCloseClick={() => setSelectedPlace(null)}
                  position={{ lat: place.Lat, lng: place.Long }}
                  options={{ maxWidth: 150 }}
                >
                  <div>{place.Location}</div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  )
}

export default ReadingSpotsMap;
