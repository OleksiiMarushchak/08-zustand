"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import styles from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";

import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 👉 ВАЖНО: при смене tag сбрасываем страницу
  useEffect(() => {
    setPage(1);
  }, [tag]);

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
    },
    500
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, 12, tag),
    placeholderData: (prev) => prev,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox
          value={searchInput}
          onChange={(value) => {
            setSearchInput(value);
            debouncedSearch(value);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={({ selected }) =>
              setPage(selected + 1)
            }
          />
        )}

        <Link
          className={styles.button}
          href="/notes/action/create"
        >
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
