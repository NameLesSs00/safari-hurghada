import Image from "next/image";
import Link from "next/link";

interface BlogDetailHeroProps {
  title: string;
}

export function BlogDetailHero({ title }: BlogDetailHeroProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[200px] w-full sm:h-[250px] lg:h-[350px]">
        <Image
          src="/Blogs/heroSingleBlog.jpg"
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 mx-auto flex w-full max-w-[1280px] flex-col justify-center px-5 sm:px-8 lg:px-0">
          <h1 className="text-center text-2xl font-bold leading-[1.3] text-white drop-shadow-md sm:text-3xl lg:text-4xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-4">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex w-full max-w-[1280px] items-center justify-center px-5 text-[14px] leading-[160%] text-[#6d7280] sm:px-8 lg:px-0 lg:text-base"
        >
          <Link href="/" className="transition-colors hover:text-[var(--color-ocean)]">
            Home
          </Link>
          <span className="mx-2"> &gt; </span>
          <Link href="/blogs" className="transition-colors hover:text-[var(--color-ocean)]">
            Blogs
          </Link>
          <span className="mx-2"> &gt; </span>
          <span className="line-clamp-1 font-medium text-[var(--color-ocean)]">Blog details</span>
        </nav>
      </div>
    </>
  );
}
