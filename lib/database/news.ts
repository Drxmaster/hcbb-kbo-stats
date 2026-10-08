import { createClient } from '@/lib/supabase/server';
import { News } from '@/lib/types';

export async function getNews(): Promise<News[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }

  return data || [];
}

export async function getFeaturedNews(): Promise<News[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }

  return data || [];
}

export async function getNewsById(id: string): Promise<News | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching news article:', error);
    return null;
  }

  return data;
}

export async function createNews(news: Omit<News, 'id' | 'created_at' | 'updated_at'>): Promise<News | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('news')
    .insert([news])
    .select()
    .single();

  if (error) {
    console.error('Error creating news:', error);
    return null;
  }

  return data;
}

export async function updateNews(id: string, updates: Partial<News>): Promise<News | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('news')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating news:', error);
    return null;
  }

  return data;
}

export async function deleteNews(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting news:', error);
    return false;
  }

  return true;
}
