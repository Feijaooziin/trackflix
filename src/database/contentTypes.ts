export type ContentStatus = "watching" | "watched";

export interface Content {
  id?: number;
  title: string;
  type?: string;
  platform?: string;
  season?: number;
  episode?: number;
  duration?: number;
  progress?: number;
  status?: ContentStatus;
  rating?: number;
  poster?: string;
}
