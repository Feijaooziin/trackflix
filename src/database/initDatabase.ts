import { getDatabase } from "@/database/database";

export async function initDatabase() {
  try {
    const db = await getDatabase();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS contents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        type TEXT,
        platform TEXT,
        season INTEGER,
        episode INTEGER,
        duration INTEGER,
        progress INTEGER DEFAULT 0,
        status TEXT,
        rating INTEGER,
        poster TEXT
      );
    `);

    console.log("✅ Database initialized");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
}
