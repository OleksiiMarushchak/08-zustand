"use client";
// ...existing code...

import styles from './NoteForm.module.css';
import { useDraftStore } from '@/lib/draftStore';
import { createNote } from '@/lib/api';
import type { NoteFormValues } from '../../types/note';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useDraftStore();

  async function formAction(formData: FormData) {
    const values: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteFormValues['tag'],
    };
    await createNote(values);
    clearDraft();
    // Optionally redirect or show success
  }

  function handleDraftChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={styles.input}
          value={draft.title}
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
          value={draft.content}
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
          value={draft.tag}
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
          onClick={clearDraft}
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
