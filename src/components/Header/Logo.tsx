import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import { Box } from "@chakra-ui/react";

import { Animated } from "react-animated-css";

export default function Logo() {
  return (
    <Animated
      animationIn="bounceInLeft"
      animationOut="fadeOut"
      isVisible={true}
    >
      <Box cursor="pointer" className="animate__animated animate__backInDown">
        <Image src={logo} alt="Marvel" width="180" />
      </Box>
    </Animated>
  );
}
