import { render, fireEvent, screen } from "@testing-library/react";
import ClickAwayListener from "./ClickAwayListener";

function Element() {
  return <div>element</div>;
}

test("Accordion Tab should render title", async () => {
  const handleClickAway = jest.fn();

  render(
    <ClickAwayListener onClickAway={handleClickAway}>
      <Element />
    </ClickAwayListener>
  );

  // Click inside the component
  fireEvent.mouseDown(screen.getByText("element"));

  // Ensure onClickAway was not called
  expect(handleClickAway).not.toHaveBeenCalled();

  // Click outside the component
  fireEvent.mouseDown(document.body);

  // Ensure onClickAway was called
  expect(handleClickAway).toHaveBeenCalled();
});
