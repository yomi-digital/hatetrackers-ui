export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  _id: string;
  link: string;
  screenshot: string;
  timestamp: number;
  user: string;
  upvotes: number;
  upvoted?: boolean;
}
