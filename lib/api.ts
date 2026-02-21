import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
interface FetchNotesParams {
  search: string;
  page: number;
  perPage: number;
  sortBy: string;
  tag?: string;
}

export async function fetchNotes(
  search: string,
  page: number,
  perPage = 12,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const params: FetchNotesParams = {
    search,
    page,
    perPage,
    sortBy: "created",
  };

  if (tag) {
    params.tag = tag;
  }

  const response: AxiosResponse<{
    notes: Note[];
    totalPages: number;
  }> = await api.get("/notes", {
    params,
  });

  return response.data;
}


export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
  const response: AxiosResponse<Note> =
    await api.post("/notes", note);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> =
    await api.delete(`/notes/${id}`);

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> =
    await api.get(`/notes/${id}`);  
  return response.data;
}