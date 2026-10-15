import Link from "next/link";

export default function NotFound() {
  return <section className="container page-section empty-state"><span>🍽️</span><h1>Oops, we couldn't find that page.</h1><p>Let's get you back to something delicious.</p><Link href="/" className="button button-primary">Back home</Link></section>;
}
