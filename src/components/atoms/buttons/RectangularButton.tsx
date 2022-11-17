import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
}

const RectangularButton = ({
  onClick,
  label,
  variant,
  color,
  size,
  disabled,
}: Props) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default RectangularButton;
