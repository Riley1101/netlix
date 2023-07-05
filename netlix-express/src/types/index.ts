import type { ObjectId } from "mongodb";
export interface Movie {
  _id: ObjectId;
  in_process:boolean;
  title: string;
  year: number;
  runtime: number;
  genres?: string[];
  director: string;
  actors?: string[];
  plot: string;
  poster: ObjectId;
  file: ObjectId;
}

export type PosterAcceptMIME = "image/png" | "image/jpeg" | "image/jpg";

export type MovieAcceptMIME = "video/mp4" | "video/mkv" | "video/avi";

export type VideoRange = {
    start: number;
    end: number;
}

export interface File {
  _id: ObjectId;
  url: string;
  originalname: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  type: "poster" | "movie";
}

export interface MovieFile extends File {
  mimetype: MovieAcceptMIME;
}

export interface PosterFile extends File {
  mimetype: PosterAcceptMIME;
}
