import { useLoadScript } from '@react-google-maps/api';
import ReadingSpotsMap from '../components/ReadingSpotsMap/ReadingSpotsMap';

function ReadingSpots() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ReadingSpotsMap />
    </div>
  );
}

export default ReadingSpots;
