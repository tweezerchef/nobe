import { Friendship } from '@prisma/client';
import Activity from '../../../server/routes/activity';
import DirectMessages from '../../../server/routes/directMessages';
// import { User } from '../hooks/ChatContext';
import UserBooks from '../../../server/routes/userbooks';

interface Discussion {
  id: string;
  Posts: DiscussionPost[];
  title: string;
}
interface DiscussionPost {
  createdAt: ReactNode;
  id: string;
  body: string;
  userId: string;
  discussionId: string;
}
interface Place {
  location: ReactNode;
  nickName: string;
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
  Places_Pictures: any;
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
  text: string;
}
interface User {
  id: string;
  firstName: string;
  userName: string;
  email: string;
  email: string;
  googleId: string;
  lastName: string;
  picture: string;
  token: string;
  latitude: number;
  longitude: number;
  radius: number;
  NotificationCount: number;
  Activity: Activity[];
  clubMembers: ClubMembers[];
  DirectMessages: DirectMessages[];
  Discussion: Discussions[];
  DiscussionUsers: DiscussionUsers[];
  friendships: Friendship[];
  friends: Friendship[]
  LendingTable: LendingTable[];
  Notifications: Notifications[];
  Posts: Posts[];
  PostsUsers: PostsUsers[];
  UserBooks: UserBooks[];
  User_Places: UserPlaces[];
  Conversations: Conversations[];
}
interface UserBook {
  id: string;
  wishlist: any;
  owned: any;
  Books: Book;
  User: User;
}
interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    image: string;
  }
  UserBooks: UserBook[];
  id: string;
  wishlist: boolean;
  owned: boolean;
  image: string;
  title: string;
}
