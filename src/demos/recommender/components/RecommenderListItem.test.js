import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RecommenderListItem } from "./RecommenderListItem";

test("renders image and text correctly", () => {
  const mockCollection = {
    image: "https://test.com/image.jpg",
    name: "Test Collection",
  };

  render(<RecommenderListItem collection={mockCollection} />);

  // Check the image
  const imgElement = screen.getByRole("img");
  expect(imgElement).toHaveAttribute("src", mockCollection.image);

  // Check the text
  const textElement = screen.getByText(mockCollection.name);
  expect(textElement).toBeInTheDocument();
});
