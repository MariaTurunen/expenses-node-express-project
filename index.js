// Entrypoint of the application
//
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Start listener For console to see if backend is right port
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port.. ${PORT}`);
});
