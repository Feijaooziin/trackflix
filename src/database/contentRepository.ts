import { getDatabase } from "@/database/database";
import { Content } from "@/database/contentTypes";

export async function addContent(content: Content) {
  const db = await getDatabase();

  await db.runAsync(
    `
    INSERT INTO contents
    (title, type, platform, season, episode, duration, progress, status, rating, poster, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATETIME('now'), DATETIME('now'))
    `,
    [
      content.title,
      content.type ?? null,
      content.platform ?? null,
      content.season ?? null,
      content.episode ?? null,
      content.duration ?? null,
      content.progress ?? 0,
      content.status ?? "watching",
      content.rating ?? null,
      content.poster ?? null,
    ],
  );
}

export async function getContents(): Promise<Content[]> {
  const db = await getDatabase();

  const result = await db.getAllAsync<Content>(`
    SELECT * FROM contents
    ORDER BY updated_at DESC
  `);

  return result;
}

export async function getSeries() {
  const data = await getContents();
  return data.filter((item) => item.type === "series");
}

export async function getMovies() {
  const data = await getContents();
  return data.filter((item) => item.type === "movie");
}

export async function updateProgress(id: number, progress: number) {
  const db = await getDatabase();

  await db.runAsync(
    `
    UPDATE contents
    SET progress = ?, updated_at = DATETIME('now')
    WHERE id = ?
    `,
    [progress, id],
  );
}

export async function deleteContent(id: number) {
  const db = await getDatabase();

  await db.runAsync(
    `
    DELETE FROM contents
    WHERE id = ?
    `,
    [id],
  );
}

export async function markAsWatched(id: number) {
  const db = await getDatabase();

  await db.runAsync(
    `
    UPDATE contents
    SET status = 'watched', progress = 100
    WHERE id = ?
    `,
    [id],
  );
}

export async function drop() {
  const db = await getDatabase();
  await db.execAsync(`DROP TABLE IF EXISTS contents;`);
}
