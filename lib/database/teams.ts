import { createClient } from '@/lib/supabase/server';
import { Team } from '@/lib/types';

export async function getTeams(): Promise<Team[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching teams:', error);
    return [];
  }

  return data || [];
}

export async function getTeamById(id: string): Promise<Team | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching team:', error);
    return null;
  }

  return data;
}

export async function createTeam(team: Omit<Team, 'id' | 'created_at' | 'updated_at'>): Promise<Team | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .insert([team])
    .select()
    .single();

  if (error) {
    console.error('Error creating team:', error);
    return null;
  }

  return data;
}

export async function updateTeam(id: string, updates: Partial<Team>): Promise<Team | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating team:', error);
    return null;
  }

  return data;
}

export async function deleteTeam(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting team:', error);
    return false;
  }

  return true;
}
