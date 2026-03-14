import * as SQLite from "expo-sqlite";

export async function getDatabase() {
  const db = await SQLite.openDatabaseAsync("trackflix.db");
  return db;
}
