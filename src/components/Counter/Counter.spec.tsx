import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Counter } from "./index";

function customRender(Component) {
  const user = userEvent.setup();
  return { user, ...render(<Component />) };
}

describe("Counter", () => {
  afterEach(() => {
    cleanup();
  });

  const getResultsFromScreen = () => screen.getByTestId("results").textContent;

  it("should add 1 to the counter", async () => {
    const { user } = customRender(Counter);
    const addButton = screen.getByRole("button", { name: /add/i });

    await user.click(addButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("1"));

    await user.click(addButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("2"));
  });

  it("should remove 1 from the counter", async () => {
    const { user } = customRender(Counter);
    const subtractButton = screen.getByRole("button", { name: /subtract/i });

    await user.click(subtractButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("-1"));

    await user.click(subtractButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("-2"));
  });

  it("should Add and Subtract", async () => {
    const { user } = customRender(Counter);
    const addButton = screen.getByRole("button", { name: /add/i });
    const subtractButton = screen.getByRole("button", { name: /subtract/i });

    await user.click(addButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("1"));

    await user.click(subtractButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("0"));
  });

  it("renders the initial state and updates on button click", async () => {
    const { user } = customRender(Counter);

    expect(getResultsFromScreen()).toBe("0");

    const addButton = screen.getByRole("button", { name: /add/i });
    const subtractButton = screen.getByRole("button", { name: /subtract/i });
    const counterInput = screen.getByTestId<HTMLInputElement>("counter");

    await user.click(addButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("1"));

    await user.click(subtractButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("0"));

    await userEvent.clear(counterInput);
    await user.type(counterInput, "5");
    await waitFor(() => expect(counterInput.value).toBe("5"));

    await user.click(addButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("5"));

    await user.click(subtractButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("0"));

    await userEvent.clear(counterInput);
    await user.type(counterInput, "7");
    await waitFor(() => expect(counterInput.value).toBe("7"));

    await user.click(addButton);
    await user.click(addButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("14"));

    await user.click(subtractButton);
    await user.click(subtractButton);
    await user.click(subtractButton);
    await waitFor(() => expect(getResultsFromScreen()).toBe("-7"));
  });
});
