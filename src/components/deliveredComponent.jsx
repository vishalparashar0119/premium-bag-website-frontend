import React from "react";
import ProgressCircle from "./progressCircleComponent";
import ProgressBar from "./progressBarComponent";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuPackageCheck, LuPackageOpen } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";

const COLORS = {
  gray: "#9ca3af",
  yellow: "#f59e0b",
  orange: "#f97316",
  blue: "#3b82f6",
  green: "#84cc16"
};

const Delivered = () => {
  return (
    <>
      <ProgressCircle color={COLORS.gray} delay={0} tooltip="Order not viewed">
        <FaRegEyeSlash className="h-6 w-6" />
      </ProgressCircle>

      <ProgressBar color={COLORS.yellow} delay={700} />

      <ProgressCircle color={COLORS.yellow} delay={1100} tooltip="Order viewed">
        <FaRegEye className="h-6 w-6" />
      </ProgressCircle>

      <ProgressBar color={COLORS.orange} delay={1800} />

      <ProgressCircle color={COLORS.orange} delay={2200} tooltip="Order packed">
        <LuPackageCheck className="h-6 w-6" />
      </ProgressCircle>

      <ProgressBar color={COLORS.blue} delay={2900} />

      <ProgressCircle color={COLORS.blue} delay={3300} tooltip="Order shipped">
        <MdOutlineLocalShipping className="h-6 w-6" />
      </ProgressCircle>

      <ProgressBar color={COLORS.green} delay={4000} />

      <ProgressCircle color={COLORS.green} delay={4400} tooltip="Order received">
        <LuPackageOpen className="h-6 w-6" />
      </ProgressCircle>
    </>
  );
};

export default Delivered;
