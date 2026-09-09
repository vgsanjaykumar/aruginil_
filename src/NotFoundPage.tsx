import { Link } from "react-router-dom";
import Header from "./features/localfind/shared/components/Header";

export default function NotFoundPage() {
  return (
    <>
     <Header onOpenMenu={() => {}} menuOpen={false} />
        <main className="min-h-screen bg-white flex items-center justify-center px-6">
     
      <div className="w-full max-w-xl text-center">

        <p className="font-syne text-8xl sm:text-9xl font-extrabold tracking-tight text-purple-500">
          404
        </p>

        <h1 className="font-syne mt-6 text-3xl sm:text-4xl font-bold text-neutral-900">
          Page Not Found
        </h1>

        <p className="font-inter mt-4 text-base sm:text-lg leading-7 text-neutral-500">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="font-inter inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="font-inter inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-purple-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-300"
          >
            Go Back
          </button>
        </div>

        <p className="font-inter mt-10 text-sm text-neutral-400">
          Aruginil - Discover Local Businesses Near You
        </p>

      </div>
    </main>
    </>

  );
}