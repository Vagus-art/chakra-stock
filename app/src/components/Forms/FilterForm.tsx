import React from "react";
import { FilterStack, FilterDropdown } from "../Layout";
import { useForm, Controller } from "react-hook-form";
import { Input, FormControl } from "@chakra-ui/core";

type DropdownFilterOption = {
  name: string;
  value: string;
};

type DropdownFilter = {
  name: string;
  menu: DropdownFilterOption[];
};

type SearchFilter = {
  name: string;
  defaultValue: string;
  placeholder: string;
};

interface filterConfig {
  searchBar?: SearchFilter;
  dropdowns?: DropdownFilter[];
}

interface IFilterFormProps {
  setFilters: (filters: any) => void;
  filtersData: filterConfig;
}

//TOMA UN FUNCION PARA SETEAR LAS VARIABLES DE LOS FILTROS, Y UN OBJETO CON UN POSIBLE SEARCHBAR Y UN ARREGLO DE DROPDOWNS

const FilterForm: React.FC<IFilterFormProps> = ({
  setFilters,
  filtersData,
}) => {
  const { register, handleSubmit, control } = useForm();
  const onSubmit = handleSubmit((filters) => {
    setFilters(filters);
  });
  return (
    <FormControl>
      <form onSubmit={onSubmit} onChange={onSubmit}>
        <FilterStack>
          {filtersData.searchBar && (
            <Input
              name={filtersData.searchBar.name}
              placeholder={filtersData.searchBar.placeholder}
              defaultValue={filtersData.searchBar.defaultValue}
              ref={register}
            />
          )}
          {filtersData.dropdowns &&
            filtersData.dropdowns.map(({ name, menu }) => (
              <Controller
                control={control}
                name={name}
                as={({ onChange, value, name }) => (
                  <FilterDropdown
                    menu={menu}
                    onChange={(e) => onChange(e.target.value)}
                    defaultValue={value}
                    name={name}
                  />
                )}
              />
            ))}
        </FilterStack>
      </form>
    </FormControl>
  );
};

export default FilterForm;