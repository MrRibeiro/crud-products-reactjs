/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, IconButton, Typography } from "@mui/material";

import Input from "../../components/Input";
import { LoginProps } from "../../contexts/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import ContentPage from "../ContentPage";

import { BoxStyled } from "./styles";

const Template = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginProps>();
  const { Login, hasError } = useAuth();
  const onSubmit: SubmitHandler<LoginProps> = (data) => Login(data);

  const [showPassword, setShowPassword] = useState(false);

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ContentPage>
      <BoxStyled>
        <Typography variant="h6" component="p">
          Olá! Seja bem-vindo.
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ marginBottom: "40px" }}
        >
          Preencha seus dados para efetuar o login!
        </Typography>
        {hasError && (
          <Alert severity="error" sx={{ marginBottom: "40px" }}>
            Email ou senha incorretos!
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field: { onChange, value } }) => (
              <Input
                type="email"
                label="Email"
                width="100%"
                value={value}
                setValue={onChange}
                error={errors.email}
                className="loginInputs"
              />
            )}
          />

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
            render={({ field: { onChange, value } }) => (
              <Input
                type={showPassword ? "text" : "password"}
                label="Senha"
                width="100%"
                value={value}
                setValue={onChange}
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

          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ width: "100%", marginBottom: "24px" }}
          >
            Entrar
          </Button>
        </form>
        <span>
          <Typography variant="caption" gutterBottom>
            Não possui cadastro?{" "}
            <Typography
              variant="overline"
              color="primary"
              onClick={() => navigate("/register")}
              gutterBottom
            >
              Cadastre-se
            </Typography>
          </Typography>
        </span>
      </BoxStyled>
    </ContentPage>
  );
};

export default Template;
