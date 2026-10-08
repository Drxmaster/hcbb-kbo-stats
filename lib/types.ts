// Database Types for HCBB KBO Stats

export interface Team {
  id: string;
  name: string;
  city: string;
  logo_url: string | null;
  wins: number;
  losses: number;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  roblox_username: string;
  team_id: string;
  position: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BattingStats {
  id: string;
  player_id: string;
  games_played: number;
  at_bats: number;
  hits: number;
  runs: number;
  home_runs: number;
  rbi: number;
  batting_average: number;
  obp: number;
  slg: number;
  ops: number;
  season: number;
  created_at: string;
  updated_at: string;
}

export interface PitchingStats {
  id: string;
  player_id: string;
  games: number;
  wins: number;
  losses: number;
  era: number;
  innings_pitched: number;
  strikeouts: number;
  walks: number;
  whip: number;
  season: number;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  away_team_id: string;
  home_team_id: string;
  away_score: number | null;
  home_score: number | null;
  status: 'scheduled' | 'in_progress' | 'final';
  game_date: string;
  stadium: string;
  created_at: string;
  updated_at: string;
}

export interface Roster {
  id: string;
  player_id: string;
  team_id: string;
  status: 'active' | 'inactive';
  position: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'announcement' | 'game_recap' | 'player_news' | 'team_news' | 'award' | 'transaction' | 'update';
  featured: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Award {
  id: string;
  player_id: string;
  title: string;
  description: string;
  season: number;
  created_at: string;
  updated_at: string;
}

export interface Administrator {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
}
