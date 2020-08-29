import React, { ReactText, useEffect } from "react";
import { FilterStack } from "../../components/Layout";
import { useForm, ValidationOptions, Controller } from "react-hook-form";
import {
  FormControl,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Button,
  Flex,
  Box,
  Stack,
  NumberInput,
  SliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/core";
import { FilterDropdown } from "../../components/Layout";
import {
  OrderProduct,
  MinifiedProduct,
  Order,
} from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IOrderProductsFormProps {
  clickedItem: Order;
  isOpen: boolean;
  onClose: () => void;
  fetchOrderProductsByOrderId: (order_id: number) => void;
  orderProducts: OrderProduct[] | null;
  minifiedProductsList: MinifiedProduct[] | null;
  fetchMinifiedProductsList: () => void;
  fetchProductCategories: () => void;
  categories: MenuOption[] | null;
  onFormSubmit: (values: Record<string, any>) => void;
  deleteFunction?: (id: number) => void;
}

const OrderProductsForm: React.FC<IOrderProductsFormProps> = ({
  isOpen,
  onClose,
  onFormSubmit,
  deleteFunction,
  fetchOrderProductsByOrderId,
  orderProducts,
  minifiedProductsList,
  fetchMinifiedProductsList,
  fetchProductCategories,
  categories,
  clickedItem: {
    order_id,
    contact: { name },
  },
}) => {
  useEffect(() => {
    if (order_id) {
      fetchOrderProductsByOrderId(order_id);
    }
    fetchMinifiedProductsList();
    fetchProductCategories();
  }, [
    fetchMinifiedProductsList,
    fetchProductCategories,
    fetchOrderProductsByOrderId,
    order_id,
  ]);

  const {
    register,
    handleSubmit,
    formState,
    errors,
    control,
    getValues,
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    onFormSubmit(values);
    onClose();
  });

  //esto lo tengo que registrar con un controller, pero ahora esta para figurar
  const [value, setValue] = React.useState(0);
  const handleChange = (value: any) => setValue(parseInt(value));

  const onDelete = (
    deleteFieldName: string,
    deleteFunction: (id: number) => void
  ) => {
    const itemID = getValues(deleteFieldName);
    deleteFunction(itemID);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{`Productos del pedido de ${name}`}</DrawerHeader>
        <DrawerBody>
          <Box>
            {orderProducts &&
              orderProducts.map((product: OrderProduct) => (
                <Text>{product.product_version.name}</Text>
              ))}
          </Box>
          {/* ESTA MINIFUNCION EN EL FORMCONTROL BUSCA SI TIENE ERRORES EL OBJETO, HACIENDO TYPECASTING A BOOLEAN TODAS SUS PROPIEDADES */}
          <FormControl
            isInvalid={Object.values(errors).find((value) => !!value)}
          >
            <form onSubmit={onSubmit}>
              <FilterStack>
                <Stack justify="center">
                  <Box>
                    <Controller
                      defaultValue={1}
                      control={control}
                      name="categoria"
                      as={({ onChange, value, name }) => (
                        <FilterDropdown
                          menu={
                            categories
                              ? categories
                              : [{ name: "...", value: 1 }]
                          }
                          onChange={(e) => onChange(e.target.value)}
                          defaultValue={value}
                          name={name}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Controller
                      defaultValue={1}
                      control={control}
                      name="producto"
                      as={({ onChange, value, name }) => (
                        <FilterDropdown
                          menu={
                            minifiedProductsList
                              ? minifiedProductsList.map(
                                  ({ name, product_id }) => ({
                                    name,
                                    value: product_id,
                                  })
                                )
                              : [{ name: "...", value: 1 }]
                          }
                          onChange={(e) => onChange(e.target.value)}
                          defaultValue={value}
                          name={name}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Flex mr={3} mb={5}>
                      <NumberInput
                        maxW="100px"
                        mr="2rem"
                        value={value}
                        onChange={(n: ReactText) => handleChange(n)}
                      />
                      <Slider
                        max={30}
                        min={1}
                        flex="1"
                        value={value}
                        onChange={(n: ReactText) => handleChange(n)}
                      >
                        <SliderTrack />
                        <SliderFilledTrack />
                        <SliderThumb
                          fontSize="sm"
                          width="32px"
                          height="20px"
                          children={value}
                        />
                      </Slider>
                    </Flex>
                  </Box>
                  {/* <Button
                    variantColor="red"
                    isLoading={formState.isSubmitting}
                    onClick={() => alert("delete")}
                    float="right"
                  >
                    Borrar
                  </Button> */}
                </Stack>
                <Button
                  variantColor="teal"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  float="right"
                >
                  Agregar
                </Button>
              </FilterStack>
            </form>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderProductsForm;
