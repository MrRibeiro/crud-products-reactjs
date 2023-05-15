import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";

import AlertCustom from "../../components/Alert";
import Input from "../../components/Input";
import { useAppState } from "../../contexts/AppContext";
import { saveUser } from "../../services/user";
import { User } from "../../types/user";
import ContentPage from "../ContentPage";

import { BoxStyled, Header } from "./styles";

const Template = () => {
  const { registerUser, setRegisterUser } = useAppState();

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm<User>({ defaultValues: registerUser! });

  const onSubmit: SubmitHandler<User> = (data) => {
    setHasError(false);
    setRegisterUser({ ...registerUser, ...data });

    saveUser(data).catch((error: AxiosError) => {
      setErrorMessage(error.response?.data as string);
      setHasError(true);
    });
  };

  const handleCEPChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cep = String(event.target.value);

    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        const { logradouro, bairro, localidade, uf } = response.data;

        setValue("street", logradouro);
        setValue("neighborhood", bairro);
        setValue("city", localidade);
        setValue("state", uf);
      } catch (error) {
        console.error("Error fetching address data", error);
      }
    }

    return cep;
  };

  return (
    <ContentPage>
      <BoxStyled>
        <Header>
          <Typography variant="h4" component="p">
            Endereço
          </Typography>
        </Header>

        <AlertCustom
          message={errorMessage}
          open={hasError}
          setOpen={setHasError}
          severity="error"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="cep"
              rules={{
                required: true,
                maxLength: {
                  value: 8,
                  message: "CEP fora do padrão",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("cep")}
                  type="number"
                  label="CEP"
                  value={field.value}
                  error={Boolean(errors.cep)}
                  helperText={errors.cep?.message || ""}
                  className="loginInputs"
                  onChange={handleCEPChange}
                  sx={{ width: "100%" }}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="street"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Logradouro"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.street}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="neighborhood"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Bairro"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.neighborhood}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="city"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Cidade"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.city}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="state"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Estado"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.state}
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
            Confirmar
          </Button>
        </form>
      </BoxStyled>
    </ContentPage>
  );
};

export default Template;
