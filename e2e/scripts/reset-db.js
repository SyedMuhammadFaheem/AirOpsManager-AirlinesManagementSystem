// Resets the airport_management_test database from server/schema.aiven.sql + server/seeds.sql.
//
// mysql2 doesn't understand the `DELIMITER` directive (it's a mysql-CLI-only convenience for
// re-delimiting statements so a semicolon inside a trigger body doesn't end the statement early).
// We parse it ourselves: lines outside a DELIMITER block are batched and run as one multi-statement
// query; lines inside a DELIMITER block are batched separately, with the custom delimiter token
// stripped, and run as their own statement (works for both `//` in schema.aiven.sql and `$$` in
// seeds.sql).
require('dotenv').config({ path: require('path').resolve(__dirname, '../../server/.env') });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_NAME = 'airport_management_test';
const SCHEMA_FILE = path.resolve(__dirname, '../../server/schema.aiven.sql');
const SEEDS_FILE = path.resolve(__dirname, '../../server/seeds.sql');

function splitDelimiterBlocks(raw) {
  const lines = raw.split('\n');
  const normalLines = [];
  const triggerBlocks = []; // { delim, lines }
  let currentDelim = null;
  let currentLines = null;

  for (const line of lines) {
    const m = line.trim().match(/^DELIMITER\s+(\S+)/i);
    if (m) {
      const delim = m[1];
      if (delim === ';') {
        if (currentLines) triggerBlocks.push({ delim: currentDelim, lines: currentLines });
        currentDelim = null;
        currentLines = null;
      } else {
        currentDelim = delim;
        currentLines = [];
      }
      continue; // DELIMITER lines themselves are never sent to MySQL
    }
    if (currentLines) currentLines.push(line);
    else normalLines.push(line);
  }
  // Unterminated custom-delimiter block (missing trailing `DELIMITER ;`) — still flush it.
  if (currentLines) triggerBlocks.push({ delim: currentDelim, lines: currentLines });

  return { normalBlock: normalLines.join('\n'), triggerBlocks };
}

async function execSqlFile(conn, filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { normalBlock, triggerBlocks } = splitDelimiterBlocks(raw);

  if (normalBlock.trim()) await conn.query(normalBlock);

  for (const { delim, lines } of triggerBlocks) {
    const escaped = delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const block = lines.join('\n').replace(new RegExp(escaped, 'g'), '');
    if (block.trim()) await conn.query(block);
  }
}

async function main() {
  const connOpts = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  };

  const admin = await mysql.createConnection(connOpts);
  await admin.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\``);
  await admin.query(`CREATE DATABASE \`${DB_NAME}\``);
  await admin.end();

  const conn = await mysql.createConnection({ ...connOpts, database: DB_NAME });
  console.log(`Loading schema from ${SCHEMA_FILE}...`);
  await execSqlFile(conn, SCHEMA_FILE);
  console.log(`Loading seeds from ${SEEDS_FILE}...`);
  await execSqlFile(conn, SEEDS_FILE);
  await conn.end();

  console.log(`Database "${DB_NAME}" reset and seeded successfully.`);
}

main().catch((err) => {
  console.error('DB reset failed:', err);
  process.exit(1);
});
