import Link from "next/link";
export default function GlobalNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F8FDFF] px-4 text-center">
      <h1 className="text-9xl font-bold text-[#003A5A]">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800 md:text-4xl">Page Not Found</h2>
      <p className="mt-4 max-w-md text-gray-500">Oops! The page you are looking for doesn't exist.</p>
      <div className="mt-10">
        <Link href="/" className="flex items-center gap-2 rounded-full bg-[#003A5A] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#004d78]">
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
