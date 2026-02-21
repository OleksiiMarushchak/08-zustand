import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import type { Note } from "../../types/note";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  if (!notes.length) return null;

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <Link href={`/notes/filter/${note.tag}`} className={styles.tag}>
              {note.tag}
            </Link>
            <Link href={`/notes/${note.id}`} className={styles.link} scroll={false}>
              View Details
            </Link>
          
            <button
              className={styles.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
