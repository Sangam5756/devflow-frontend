
export type Author = {
  username: string;
};

export type Answer = {
  id: string;
  content: string;
  author: Author;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  isOwner: boolean;
};

export type QuestionData = {
  id: string;
  title: string;
  content: string;
  author: Author;
  likes: number;
  answer: number;
  timestamp: string;
  isLiked: boolean;
  isOwner: boolean;
  answers: Answer[];
};
