import styles from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://08-zustand-nine-omega.vercel.app/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/404-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found',
      },
    ],
    type: 'article',
  },
};
export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
