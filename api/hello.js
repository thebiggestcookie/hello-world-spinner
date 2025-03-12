// Example API route
module.exports = (req, res) => {
  res.status(200).json({
    message: 'Hello from Vercel API!',
    timestamp: new Date().toISOString()
  });
};
