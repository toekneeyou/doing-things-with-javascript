// import { render, fireEvent, screen } from "@testing-library/react";
// import { beforeAll, afterAll, describe, expect, test, vi } from "vitest";
// import Accordion from "./Accordion";

// const observe = vi.fn();
// const unobserve = vi.fn();
// const disconnect = vi.fn();

// const TITLE = "Accordion";

// function Element() {
//   return <div style={{ minHeight: "100px", minWidth: "100px" }} />;
// }

// beforeAll(() => {
//   globalThis.ResizeObserver = vi.fn(() => ({
//     observe,
//     unobserve,
//     disconnect,
//   })) as unknown as typeof ResizeObserver;
// });

// afterAll(() => {
//   vi.clearAllMocks();
// });

// describe("Accordion", () => {
//   test("Accordion Tab should render title", () => {
//     render(
//       <Accordion
//         tab={<Accordion.Tab title={<span>{TITLE}</span>} />}
//         panel={
//           <Accordion.Panel>
//             <Element />
//           </Accordion.Panel>
//         }
//       />,
//     );

//     const accordionTab = screen.getByRole("tab");
//     expect(accordionTab);
//   });

//   test("Accordion Tab should toggle Accordion Panel", () => {
//     render(
//       <Accordion
//         initialIsExpanded={false}
//         tab={<Accordion.Tab title={<span>{TITLE}</span>} />}
//         panel={
//           <Accordion.Panel>
//             <Element />
//           </Accordion.Panel>
//         }
//       />,
//     );

//     const accordionTab = screen.getByRole("tab");

//     // initially collapsed
//     expect(accordionTab).toHaveAttribute("aria-expanded", "false");

//     // expand
//     fireEvent.click(accordionTab);
//     expect(accordionTab).toHaveAttribute("aria-expanded", "true");

//     // collapse again
//     fireEvent.click(accordionTab);
//     expect(accordionTab).toHaveAttribute("aria-expanded", "false");
//   });
// });
