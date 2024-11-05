// pages/api/neo4j.js

import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export default async function handler(req, res) {
  try {
    const session = driver.session();

    const result = await session.run(
      'MATCH (n) RETURN n LIMIT 25'
    );

    const records = result.records.map(record => record.get('n'));

    await session.close();

    res.status(200).json({ data: records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await driver.close();
  }
}
