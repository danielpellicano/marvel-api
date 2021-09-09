import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Box cursor="pointer">
      <Link href="/">
        <Image src={logo} alt="Marvel" width="180" />
      </Link>
    </Box>
  );
}
