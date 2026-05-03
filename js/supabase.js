const supabaseUrl =
  'https://tmnvlccwjojqidtiwvgn.supabase.co';

const supabaseKey =
  'sb_publishable_c8GCxZLqYMiWqTgwSGfZCg_98u03sI6';

window.supabaseClient =
  supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

console.log(window.supabaseClient);