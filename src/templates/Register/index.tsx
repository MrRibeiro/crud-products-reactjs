/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import Input from "../../components/Input";
import { useAppState } from "../../contexts/AppContext";
import { User } from "../../types/user";
import ContentPage from "../ContentPage";

import { BoxStyled, Header } from "./styles";

const Template = () => {
  const { registerUser, setRegisterUser } = useAppState();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    setRegisterUser({ ...registerUser, ...data });
    navigate("/confirm");
  };

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ContentPage>
      <BoxStyled>
        <Header>
          <Typography variant="h4" component="p">
            Cadastro
          </Typography>
        </Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="name"
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
                  error={errors.name}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Sobrenome"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.lastName}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="cpf"
              rules={{
                required: true,
                minLength: {
                  value: 11,
                  message: "O CPF deve conter 11 números",
                },
                maxLength: {
                  value: 11,
                  message: "O CPF deve conter 11 números",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="CPF"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.cpf}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="sex-label">Sexo</InputLabel>
            <Controller
              control={control}
              name="sex"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  labelId="sex-label"
                  id="sex-select"
                  label="Sexo"
                  error={Boolean(errors.sex)}
                  onChange={field.onChange}
                  className="loginInputs"
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Feminino</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="birthDate"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Data de Nascimento"
                  value={field.value}
                  onChange={field.onChange}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Não está no formato email",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.email}
                  className="loginInputs"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: "Mínimo de 6 caracteres",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  label="Senha"
                  width="100%"
                  value={field.value || ""}
                  setValue={field.onChange}
                  error={errors.password}
                  className="loginInputs"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={tooglePassword}
                      onMouseDown={tooglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
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
            Avançar
          </Button>
        </form>
      </BoxStyled>
    </ContentPage>
  );
};

export default Template;
