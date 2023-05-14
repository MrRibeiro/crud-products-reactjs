/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import Input from "../../components/Input";
import { useAppState } from "../../contexts/AppContext";
import { User } from "../../types/user";
import ContentPage from "../ContentPage";

import { BoxStyled } from "./styles";

const Template = () => {
  const { registerUser, setRegisterUser } = useAppState();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    setRegisterUser({ ...registerUser, ...data });
    navigate("/education");
  };

  return (
    <ContentPage>
      <BoxStyled>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome"
                width="100%"
                value={value || ""}
                setValue={onChange}
                error={errors.name}
                className="loginInputs"
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Sobrenome"
                width="100%"
                value={value || ""}
                setValue={onChange}
                error={errors.lastName}
                className="loginInputs"
              />
            )}
          />

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
