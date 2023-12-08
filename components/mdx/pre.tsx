import type { ReactNode } from "react";

export default function Pre({ children }: { children: ReactNode }) {
  return <pre className="lg:-mx-24 lg:rounded-lg">{children}</pre>;
}
