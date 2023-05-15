import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, FormControl, Typography } from "@mui/material";
import { AxiosError } from "axios";

import AlertCustom from "../../components/Alert";
import Input from "../../components/Input";
import { newProduct } from "../../services/product";
import { Product } from "../../types/product";

import { BoxStyled, Container } from "./styles";

const Template = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasSuccess, setHasSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = (data) => {
    newProduct(data)
      .then(() => {
        setHasSuccess(true);
        setSuccessMessage("Produto cadastrado com sucesso!");
      })
      .catch((error: AxiosError) => {
        setHasError(true);
        setErrorMessage(error.response?.data as string);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Container>
        <BoxStyled>
          <div>
            <Typography
              variant="h4"
              component="p"
              sx={{ marginBottom: "32px" }}
            >
              Cadastro de produtos
            </Typography>

            <AlertCustom
              message={errorMessage}
              open={hasError}
              setOpen={setHasError}
              severity="error"
            />

            <AlertCustom
              message={successMessage}
              open={hasSuccess}
              setOpen={setHasSuccess}
              severity="success"
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="nome"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nome"
                      width="100%"
                      value={field.value || ""}
                      setValue={field.onChange}
                      error={errors.nome}
                      className="loginInputs"
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="marca"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Marca"
                      width="100%"
                      value={field.value || ""}
                      setValue={field.onChange}
                      error={errors.marca}
                      className="loginInputs"
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="preco"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Preço"
                      width="100%"
                      value={field.value || ""}
                      setValue={field.onChange}
                      error={errors.preco}
                      className="loginInputs"
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="qt_estoque"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Estoque"
                      width="100%"
                      value={field.value}
                      setValue={field.onChange}
                      error={errors.qt_estoque}
                      className="loginInputs"
                    />
                  )}
                />
              </FormControl>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={!isDirty}
                sx={{ width: "100%" }}
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </BoxStyled>
      </Container>
    </Box>
  );
};

export default Template;
