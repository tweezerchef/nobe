import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { FixedSizeList } from 'react-window';
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Places from "./places";
import { Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Portal, List, ListItem, ListItemText, ListItemButton, Typography } from '@mui/material';
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
  const [location, setLocation] = useState<string>("");
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [isAddingDescription, setIsAddingDescription] = useState(false);
  const [open, setOpen] = React.useState(false);

  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(() => ({ lat: 29.9511, lng: -90.0715 }), []);
  const options = useMemo<MapOptions>(() => ({
    mapId: "89f1db752bd023d1",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const handleMarkerClick = useCallback(() => {
    setShowInfoWindow((prev) => !prev);
  }, []);

  const handlePlaceClick = useCallback((placeId: number) => {
    setSelectedPlace((prev) => (prev === placeId ? null : placeId));
    setIsFormOpen(false);
    setIsAddingDescription(false);
  }, []);

  const handleCardClick = useCallback((lat: number, lng: number) => {
    mapRef.current?.panTo({ lat, lng });
  }, []);

  const handleFormOpen = () => {
    setIsFormOpen(true);
    setIsAddingDescription(true);
    setOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setIsAddingDescription(false);
    setShowInfoWindow(false);
  };

  const handleFormSubmit = async () => {
    try {
      if (!description) {
        alert("Please enter a description.");
        return;
      }
      await axios.post(`/api/places-to-read/places/${selectedPlace}/description`, { Description: description });
      setDescription("");
      setIsAddingDescription(false);
      setIsFormOpen(false);
      fetchSavedPlaces();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedPlaces = async () => {
    try {
      const response = await axios.get('/api/places-to-read/places');
      setSavedPlaces(response.data);
      // setSelectedPlace(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      const response = await axios.get('/api/places-to-read/places');
      setSavedPlaces(response.data);
    };
    setDescription("");
    fetchSavedPlaces();
  }, [selectedPlace]);

  return (
    <div className="spots-container">
      <div className="controls">
        <h2 className="favorite-header">What's your favorite reading spot?</h2>
        <Places
          setLatLng={(position: any) => {
            setLatLng(position);
            mapRef.current?.panTo(position);
          }}
          setLocation={setLocation}
        />
        <h3 className="top-spots-header">Top Spots</h3>
        <List className="cards-container">
          {savedPlaces?.map((place) => (
            <ListItemButton
              key={place.id}
              onClick={() => handleCardClick(place.Lat, place.Long)}
            >
              <ListItemText primary={<Typography color={"white"}>{place.Location}</Typography>} />
            </ListItemButton>
          ))}
        </List>
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
                  options={{ maxWidth: 250 }}
                >
                  <div>
                    <div className="location">{location}</div>
                    <div>
                      {!isAddingDescription && (
                        <Button onClick={handleFormOpen}>Add Review</Button>
                      )}
                      {isFormOpen && (
                        <Card>
                          <Dialog open={open} fullWidth
                            maxWidth="md">
                            <DialogTitle>Leave This Spot a Review</DialogTitle>
                            <DialogContent>
                              <TextField
                                autoFocus
                                margin="dense"
                                label="Description"
                                fullWidth
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleFormCancel}>Cancel</Button>
                              <Button onClick={handleFormSubmit}>Save</Button>
                            </DialogActions>
                          </Dialog>
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
              // position={new google.maps.LatLng(place.Lat, place.Long)}
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
                  options={{ maxWidth: 250 }}
                >
                  <div>
                    <div className="location">{place.Location}</div>
                    {place.Description && <div className="description">{place.Description}</div>}
                    <div>
                      {!isAddingDescription && (
                        <Button onClick={handleFormOpen}>Add Review</Button>
                      )}
                      {isFormOpen && (
                        <Card>
                          <Dialog open={open} fullWidth
                            maxWidth="md">
                            <DialogTitle>Leave This Spot a Review</DialogTitle>
                            <DialogContent>
                              <TextField
                                autoFocus
                                margin="dense"
                                label="Description"
                                fullWidth
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleFormCancel}>Cancel</Button>
                              <Button onClick={handleFormSubmit}>Save</Button>
                            </DialogActions>
                          </Dialog>
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