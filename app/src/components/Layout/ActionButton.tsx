import React from "react";
import { IconType } from "react-icons/lib";
import { IconButton } from "@chakra-ui/core";

interface IActionButtonProps {
  icon: IconType;
  action: () => void;
  ariaLabel: string;
}

//Boton circular en la esquina inferior derecha de la pantalla

const ActionButton: React.FC<IActionButtonProps> = ({
  icon,
  action,
  ariaLabel,
}) => {
  return (
    <IconButton
      width="70px"
      height="70px"
      fontSize="30px"
      borderRadius="50%"
      aria-label={ariaLabel}
      icon={icon}
      onClick={action}
      position="fixed"
      bottom="15px"
      right="15px"
      isRound
      size="lg"
      variantColor="blue"
    />
  );
};

export default ActionButton;
