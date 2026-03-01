// Simple smoke test — verifies the server starts without crashing
const server = require('../server.js');

setTimeout(() => {
  console.log('[TEST] Server loaded successfully ✓');
  server.close(() => {
    console.log('[TEST] Server closed cleanly ✓');
    console.log('[TEST] All tests passed!');
    process.exit(0);
  });
}, 500);