import "@testing-library/jest-dom";

import React from "react";

import { render, screen } from "@testing-library/react";

import Input from ".";

describe("<Input />", () => {
  it("should render the input", () => {
    render(
      <Input label="Test" value="Test" setValue={jest.fn()} testID="input" />
    );

    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
});
