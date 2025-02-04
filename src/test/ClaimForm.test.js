import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClaimForm from "../components/ClaimForm"; // Ensure the correct import path
import { createClaim } from "../api";

jest.mock("../api", () => ({
  createClaim: jest.fn(),
}));

describe("ClaimForm Component", () => {
  test("renders input fields and submit button", async () => {
    render(<ClaimForm />);

    // Check if input fields and button exist in the DOM
    expect(await screen.findByPlaceholderText("Description")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Status")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("submits the form with entered values", async () => {
    createClaim.mockResolvedValueOnce();

    render(<ClaimForm />);

    const descriptionInput = screen.getByPlaceholderText("Description");
    const statusInput = screen.getByPlaceholderText("Status");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(descriptionInput, { target: { value: "Test claim" } });
    fireEvent.change(statusInput, { target: { value: "Pending" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createClaim).toHaveBeenCalledWith({
        description: "Test claim",
        status: "Pending",
      });
    });
  });

  test("handles API error", async () => {
    createClaim.mockRejectedValueOnce({ response: { data: { detail: "Error" } } });

    render(<ClaimForm />);

    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Test claim" } });
    fireEvent.change(screen.getByPlaceholderText("Status"), { target: { value: "Pending" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(createClaim).toHaveBeenCalled();
    });
  });
});
