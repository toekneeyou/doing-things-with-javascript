import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Accordion from "./Accordion";

const TITLE = "Accordion";

function AccordionContent() {
  return (
    <ul style={{ height: "100px", width: "100%" }}>
      {[1, 2, 3].map((num) => (
        <li style={{ height: "2rem" }} key={num}>
          {num}
        </li>
      ))}
    </ul>
  );
}

test("Accordion Tab should render title", async () => {
  render(
    <Accordion
      tab={<Accordion.Tab title={<span>{TITLE}</span>} />}
      panel={
        <Accordion.Panel>
          <AccordionContent />
        </Accordion.Panel>
      }
    />
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
          <AccordionContent />
        </Accordion.Panel>
      }
    />
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
