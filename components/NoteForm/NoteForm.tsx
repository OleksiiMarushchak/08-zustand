"use client";
// ...existing code...

import styles from './NoteForm.module.css';
import { useNoteStore, initialDraft } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NoteFormValues } from '../../types/note';
import { useRouter } from 'next/navigation';

export default function NoteForm() {

  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient();

  // Use draft from store or initialDraft
  const formDraft = draft || initialDraft;

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(formDraft);
  }

  function handleDraftChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setDraft({ ...formDraft, [e.target.name]: e.target.value });
  }

  function handleCancel() {
    router.back();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={styles.input}
          value={formDraft.title}
          onChange={handleDraftChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={styles.textarea}
          value={formDraft.content}
          onChange={handleDraftChange}
          maxLength={500}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={styles.select}
          value={formDraft.tag}
          onChange={handleDraftChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
