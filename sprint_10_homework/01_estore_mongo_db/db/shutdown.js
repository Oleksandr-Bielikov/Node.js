import { closeClient } from './db.js';

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, closing MongoDB client and exiting');
  try { await closeClient(); } catch (e) { console.error(e); }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, closing MongoDB client and exiting');
  try { await closeClient(); } catch (e) { console.error(e); }
  process.exit(0);
});