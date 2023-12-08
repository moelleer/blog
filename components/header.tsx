import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link
        href="/"
        className="mx-auto h-16 w-16 grid place-content-center rounded-full border-current border-2 text-black dark:text-white"
      >
        JM
      </Link>
    </header>
  );
}
