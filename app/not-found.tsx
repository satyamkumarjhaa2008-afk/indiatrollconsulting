import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNavbar from "@/components/site-navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNavbar />

      <section
        aria-labelledby="not-found-title"
        className="flex min-h-[70vh] items-center justify-center px-6 py-24 text-center"
      >
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em]">
            404
          </p>
          <h1 id="not-found-title" className="text-4xl font-bold md:text-6xl">
            Page not found
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base opacity-75 md:text-lg">
            The page you requested does not exist or may have moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border px-6 py-3 font-semibold"
          >
            Back to home
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
