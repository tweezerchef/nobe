import { useLoadScript } from '@react-google-maps/api';
import { useParams } from 'react-router';
import ReadingSpotsMap from '../components/ReadingSpotsMap/ReadingSpotsMap';

function ReadingSpots() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });
  const { linkPlaceId } = useParams<{ linkPlaceId: string }>();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {linkPlaceId ? <ReadingSpotsMap linkPlaceId={linkPlaceId} /> : <ReadingSpotsMap />}
      {' '}

    </div>
  );
}

export default ReadingSpots;
