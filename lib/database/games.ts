import { createClient } from '@/lib/supabase/server';
import { Game } from '@/lib/types';

export async function getGames(): Promise<Game[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('game_date', { ascending: false });

  if (error) {
    console.error('Error fetching games:', error);
    return [];
  }

  return data || [];
}

export async function getGameById(id: string): Promise<Game | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching game:', error);
    return null;
  }

  return data;
}

export async function getTeamGames(teamId: string): Promise<Game[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .or(`away_team_id.eq.${teamId},home_team_id.eq.${teamId}`)
    .order('game_date', { ascending: false });

  if (error) {
    console.error('Error fetching team games:', error);
    return [];
  }

  return data || [];
}

export async function createGame(game: Omit<Game, 'id' | 'created_at' | 'updated_at'>): Promise<Game | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('games')
    .insert([game])
    .select()
    .single();

  if (error) {
    console.error('Error creating game:', error);
    return null;
  }

  return data;
}

export async function updateGame(id: string, updates: Partial<Game>): Promise<Game | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('games')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating game:', error);
    return null;
  }

  return data;
}

export async function deleteGame(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting game:', error);
    return false;
  }

  return true;
}
