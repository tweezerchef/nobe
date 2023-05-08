interface Discussion {
  id: string;
  Posts: DiscussionPost[];
  title: string;
}
interface DiscussionPost {
  id: string;
  body: string;
  userId: string;
  discussionId: string;
}
interface Place {
  userPlaces: any;
  User_Places: any;
  place_id: any;
  googlePlaceId: string;
  formatted_address: string;
  adr_address: string;
  photo?: {
    images: {
      large: {
        url: string;
      };
    };
  };
  name: string;
  rating: string;
  num_reviews: number;
  price_level: string;
  ranking: string;
  awards?: Award[];
  cuisine?: Cuisine[];
  address?: string;
  phone?: string;
  web_url: string;
  website: string;
  types: string[];
  reviews: Review[];
  Description_Places: any;
  id: number;
  Location: string;
  Lat: number;
  Long: number;
  Description: string;

}
interface PlaceViewerProps {
  placeId: string;
  savedPlaces: Place[];
}
interface Award {
  images: {
    small: string;
  };
  display_name: string;
}

interface Cuisine {
  name: string;
}
interface Review {
  author_name: string;
  text: string;
}
