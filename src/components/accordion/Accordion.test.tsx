import { render, fireEvent, screen } from "@testing-library/react";
import Accordion from "./Accordion";

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

const TITLE = "Accordion";

function Element() {
  return <div style={{ minHeight: "100px", minWidth: "100px" }} />;
}

describe("Accordion", () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect,
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Accordion Tab should render title", async () => {
    render(
      <Accordion
        tab={<Accordion.Tab title={<span>{TITLE}</span>} />}
        panel={
          <Accordion.Panel>
            <Element />
          </Accordion.Panel>
        }
      />,
    );

    const accordionTab = screen.getByRole("tab");
    expect(accordionTab).toHaveTextContent(TITLE);
  });

  test("Accordion Tab should toggle Accordion Panel", async () => {
    render(
      <Accordion
        initialIsExpanded={false}
        tab={<Accordion.Tab title={<span>{TITLE}</span>} />}
        panel={
          <Accordion.Panel>
            <Element />
          </Accordion.Panel>
        }
      />,
    );
    // expect Panel to not be expanded if initialIsExpanded is false
    const accordionTab = screen.getByRole("tab");
    expect(accordionTab.getAttribute("aria-expanded")).toBe("false");

    // expect Panel to expand when user clicks on tab
    fireEvent.click(accordionTab);
    expect(accordionTab.getAttribute("aria-expanded")).toBe("true");

    // expect Panel to collapse when user clicks on tab again
    fireEvent.click(accordionTab);
    expect(accordionTab.getAttribute("aria-expanded")).toBe("false");
  });
});
