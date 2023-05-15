import "@testing-library/jest-dom";

import React from "react";

import { render, screen } from "@testing-library/react";

import AlertCustom from ".";

describe("<AlertCustom />", () => {
  it("should render the alert", () => {
    render(
      <AlertCustom
        message="Msg de sucesso"
        severity="success"
        testID="alert"
        open
      />
    );

    expect(screen.getByTestId("alert")).toBeInTheDocument();
  });
});
