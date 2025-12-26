import React from "react";
import ProgressCircle from "./progressCircleComponent";
import ProgressBar from "./progressBarComponent";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuPackageCheck } from "react-icons/lu";

const COLORS = {
  gray: "#9ca3af",
  yellow: "#f59e0b",
  orange: "#f97316",
};

const Packed = () => {
  return (
    <>
      <ProgressCircle
        color={COLORS.gray}
        delay={0}
        tooltip="Order not viewed"
      >
        <FaRegEyeSlash className="h-6 w-6" />
      </ProgressCircle>

      <ProgressBar color={COLORS.yellow} delay={700} />

      <ProgressCircle
        color={COLORS.yellow}
        delay={1100}
        tooltip="Order viewed"
      >
        <FaRegEye className="h-6 w-6" />
      </ProgressCircle>

      <ProgressBar color={COLORS.orange} delay={1800} />

      <ProgressCircle
        color={COLORS.orange}
        delay={2200}
        tooltip="Order packed"
      >
        <LuPackageCheck className="h-6 w-6" />
      </ProgressCircle>
    </>
  );
};

export default Packed;
