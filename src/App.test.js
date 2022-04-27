import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import App from "./App";

test("renders init app", () => {
  render(<App />);
  const indexDrag = Math.floor(Math.random() * 63);
  const indexDrop = Math.floor(Math.random() * 63);

  //begin test drag drop
  const elementDrag = screen.getByTestId(`itemDrag${indexDrag}`);
  const elementDrop = screen.getByTestId(`itemDrag${indexDrop}`);

  expect(elementDrag).toBeInTheDocument();
  expect(elementDrop).toBeInTheDocument();

  const colorDrag = elementDrag.getAttribute("data-testtitle");

  const colorDrop = elementDrop.getAttribute("data-testtitle");
  const dropEvent = createEvent.drop(elementDrop);
  Object.defineProperty(dropEvent, "dataTransfer", {
    value: {
      getData: () => JSON.stringify({ index: indexDrag, color: colorDrag }),
    },
  });
  fireEvent(elementDrop, dropEvent);
  expect(elementDrop).toHaveAttribute("data-testtitle", colorDrag);
  expect(elementDrag).toHaveAttribute("data-testtitle", colorDrop);
});
