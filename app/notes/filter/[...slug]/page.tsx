import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";



type Props = {
  params: { slug: string[] }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const id = slug?.[0] === "all" ? undefined : slug?.[0];
  return {
    title: `Filtered Notes: ${id}`,
    description: `Viewing notes filtered by tag: ${id}`,
    openGraph: {
      title: `Filtered Notes: ${id}`,
      description: `Viewing notes filtered by tag: ${id}`,
      url: `https://08-zustand-nine-omega.vercel.app/filter/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Filtered Notes: ${id}`,
        },
      ],
      type: 'article',
    },
  };
}








export default async function Page({ params }: Props) {
  const { slug } = params;
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
