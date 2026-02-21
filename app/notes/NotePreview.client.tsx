"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import styles from "./NotesPage.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal onClose={() => router.back()}><p>Loading...</p></Modal>;
  if (error || !note) return <Modal onClose={() => router.back()}><p>Error loading note</p></Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={styles.previewModal}>
        <h2>{note.title}</h2>
        <p><b>Tag:</b> {note.tag}</p>
        <p>{note.content}</p>
        <p style={{fontSize:12, color:'#888'}}>Created: {note.createdAt}</p>
      </div>
    </Modal>
  );
}
