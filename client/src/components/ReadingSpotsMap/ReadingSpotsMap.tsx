import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Places from "./places";
import { Card, Button } from '@mui/material';
import axios from "axios";
import "../../styles/mapstyles.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface Place {
  id: number;
  Location: string;
  Lat: number;
  Long: number;
  Description: string;
}

function ReadingSpotsMap() {
  const [latlng, setLatLng] = useState<LatLngLiteral>();
  const [address, setAddress] = useState<string>("");
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  console.log(savedPlaces)
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


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

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleCardClick = useCallback((lat: number, lng: number) => {
    mapRef.current?.panTo({ lat, lng });
  }, []);

  return (
    <div className="spots-container">
      <div className="controls">
        <h2 className="favorite-header">What's your favorite reading spot?</h2>
        <Places
          setLatLng={(position: any) => {
            setLatLng(position);
            mapRef.current?.panTo(position);
          }}
          setAddress={setAddress}
        />
        <h3 className="top-spots-header">Top Spots</h3>
        <div className="cards-container">
          {savedPlaces?.map((place) => (
            <Card key={place.id} onClick={() => handleCardClick(place.Lat, place.Long)}>
              <div>{place.Location}</div>
              {place.Description && <div>{place.Description}</div>}
            </Card>
          ))}
        </div>

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
                  <div>
                    <div>{address}</div>
                    <div>
                      <Button onClick={handleFormOpen}>Add Description</Button>
                      {isFormOpen && (
                        <Card>
          // MUI form here
                        </Card>
                      )}
                    </div>
                  </div>
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
                  <div>
                    <div>{place.Location}</div>
                    <div>
                      <Button onClick={handleFormOpen} size="small">Add Description</Button>
                      {isFormOpen && (
                        <Card>

                        </Card>
                      )}
                    </div>
                  </div>
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