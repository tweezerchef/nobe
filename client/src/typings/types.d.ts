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
