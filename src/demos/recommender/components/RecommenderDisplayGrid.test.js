import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecommenderDisplayGrid } from "./RecommenderDisplayGrid";

describe("<RecommenderDisplayGrid />", () => {
  test('renders "no search results" when no NFTs are passed', () => {
    render(<RecommenderDisplayGrid />);
    expect(screen.getByText("no search results")).toBeInTheDocument();
  });
});
