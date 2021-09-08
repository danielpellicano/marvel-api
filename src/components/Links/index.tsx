import Link from "next/link";
import React from "react";
import { ReactChild } from "toasted-notes/node_modules/@types/react";

interface LinkProps {
  href: string;
  children: ReactChild;
}

export const LinkPage = React.forwardRef(({ href, children }: LinkProps, r) => {
  return (
    <div>
      <Link href={href}>{children}</Link>
    </div>
  );
});
