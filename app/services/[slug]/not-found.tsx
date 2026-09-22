import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]">
          Service not found
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">
          We could not find that service
        </h1>
        <p className="mt-5 opacity-75">
          The service URL may be incorrect or the page may have moved.
        </p>
        <Link href="/services/survey-insights" className="mt-8 inline-flex rounded-full border px-6 py-3 font-semibold">
          View our services
        </Link>
      </div>
    </main>
  );
}
