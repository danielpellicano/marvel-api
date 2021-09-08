import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

export default function Logo({ href }: any) {
  return (
    <Box cursor="pointer">
      <Link href="/" passHref>
        <Image src={logo} alt="Pessoalize" width="180" />
      </Link>
    </Box>
  );
}
