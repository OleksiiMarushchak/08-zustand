// app/notes/action/create/page.tsx


import { getCategories } from '@/lib/api';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note or save a draft.',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note or save a draft.',
    url: 'https://08-zustand-nine-omega.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://08-zustand-nine-omega.vercel.app/og-create-note.png',
        width: 1200,
        height: 630,
        alt: 'Create note',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
