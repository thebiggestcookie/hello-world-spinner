// API route for messages CRUD operations
const supabase = require('../utils/supabase');

module.exports = async (req, res) => {
  // Set CORS headers for frontend access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Fetch all messages
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return res.status(200).json(data);
    }
    
    // POST - Create a new message
    if (req.method === 'POST') {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message content is required' });
      }
      
      const { data, error } = await supabase
        .from('messages')
        .insert([{ 
          content: message,
          created_at: new Date()
        }])
        .select();
      
      if (error) throw error;
      
      return res.status(201).json(data[0]);
    }
    
    // Not implemented
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
