import { createClient } from '@/lib/supabase/server';
import { Player, BattingStats, PitchingStats } from '@/lib/types';

export async function getPlayers(): Promise<Player[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('roblox_username');

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return data || [];
}

export async function getPlayersByTeam(teamId: string): Promise<Player[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('team_id', teamId)
    .order('roblox_username');

  if (error) {
    console.error('Error fetching team players:', error);
    return [];
  }

  return data || [];
}

export async function getPlayerById(id: string): Promise<Player | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching player:', error);
    return null;
  }

  return data;
}

export async function createPlayer(player: Omit<Player, 'id' | 'created_at' | 'updated_at'>): Promise<Player | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .insert([player])
    .select()
    .single();

  if (error) {
    console.error('Error creating player:', error);
    return null;
  }

  return data;
}

export async function updatePlayer(id: string, updates: Partial<Player>): Promise<Player | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating player:', error);
    return null;
  }

  return data;
}

export async function deletePlayer(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting player:', error);
    return false;
  }

  return true;
}

export async function getPlayerBattingStats(playerId: string, season?: number): Promise<BattingStats | null> {
  const supabase = await createClient();
  let query = supabase
    .from('batting_stats')
    .select('*')
    .eq('player_id', playerId);

  if (season) {
    query = query.eq('season', season);
  }

  const { data, error } = await query.single();

  if (error) {
    console.error('Error fetching batting stats:', error);
    return null;
  }

  return data;
}

export async function getPlayerPitchingStats(playerId: string, season?: number): Promise<PitchingStats | null> {
  const supabase = await createClient();
  let query = supabase
    .from('pitching_stats')
    .select('*')
    .eq('player_id', playerId);

  if (season) {
    query = query.eq('season', season);
  }

  const { data, error } = await query.single();

  if (error) {
    console.error('Error fetching pitching stats:', error);
    return null;
  }

  return data;
}

export async function updateBattingStats(id: string, stats: Partial<BattingStats>): Promise<BattingStats | null> {
  const supabase = await createClient();
  
  // Calculate derived stats
  const updated: any = { ...stats, updated_at: new Date().toISOString() };
  
  if (stats.hits !== undefined && stats.at_bats !== undefined) {
    updated.batting_average = stats.at_bats > 0 ? stats.hits / stats.at_bats : 0;
  }
  
  const { data, error } = await supabase
    .from('batting_stats')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating batting stats:', error);
    return null;
  }

  return data;
}

export async function updatePitchingStats(id: string, stats: Partial<PitchingStats>): Promise<PitchingStats | null> {
  const supabase = await createClient();
  
  // Calculate derived stats
  const updated: any = { ...stats, updated_at: new Date().toISOString() };
  
  if (stats.wins !== undefined && stats.losses !== undefined) {
    updated.winPercentage = (stats.wins + stats.losses > 0) 
      ? stats.wins / (stats.wins + stats.losses) 
      : 0;
  }
  
  const { data, error } = await supabase
    .from('pitching_stats')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating pitching stats:', error);
    return null;
  }

  return data;
}
