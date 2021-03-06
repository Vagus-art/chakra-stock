import React from "react";
import { Stack } from "@chakra-ui/core";


//abstraccion de contenedor de filtros, agrega paddings y margenes estilizados a los dropdowns y barras de busqueda
const FilterStack: React.FC = ({ children }) => {
  return (
    <Stack
      spacing={1}
      shouldWrapChildren={true}
      my="5px"
      p="10px"
      bg="white"
      rounded="md"
      shadow="md"
    >
      {children}
    </Stack>
  );
};

export default FilterStack;
