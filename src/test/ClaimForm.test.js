import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClaimForm from "../components/ClaimForm"; // Adjusted path to correctly reference the component
import axios from "axios";

// Mock axios module
jest.mock("axios");

describe("ClaimForm", () => {
  it("renders the form elements", () => {
    render(<ClaimForm />);

    expect(screen.getByLabelText(/Policy Number:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount:/)).toBeInTheDocument();
    expect(screen.getByText(/Create Claim/)).toBeInTheDocument();
  });

  it("should show error when form is submitted with empty fields", async () => {
    render(<ClaimForm />);

    fireEvent.click(screen.getByText(/Create Claim/));

    await waitFor(() => {
      expect(screen.getByText(/All fields are required./)).toBeInTheDocument();
    });
  });

  it("should fetch policy amount on valid policy number", async () => {
    render(<ClaimForm />);
    const policyNumberInput = screen.getByLabelText(/Policy Number:/);

    // Mocking the successful response of axios
    axios.get.mockResolvedValueOnce({ data: { amount: 1000 } });

    fireEvent.change(policyNumberInput, { target: { value: "123" } });

    await waitFor(() => {
      expect(screen.getByText(/Policy Amount: ₹1000/)).toBeInTheDocument();
    });
  });

  it("should show error when policy number is not found", async () => {
    render(<ClaimForm />);
    const policyNumberInput = screen.getByLabelText(/Policy Number:/);

    // Mocking the error response of axios
    axios.get.mockRejectedValueOnce(new Error("Policy not found"));

    fireEvent.change(policyNumberInput, { target: { value: "999" } });

    await waitFor(() => {
      expect(screen.queryByText(/Policy Amount:/)).toBeNull();
    });
  });

  it("should validate the claim amount against policy amount", async () => {
    render(<ClaimForm />);
    const policyNumberInput = screen.getByLabelText(/Policy Number:/);
    const amountInput = screen.getByLabelText(/Amount:/);

    // Mocking the successful response of axios
    axios.get.mockResolvedValueOnce({ data: { amount: 1000 } });

    fireEvent.change(policyNumberInput, { target: { value: "123" } });

    fireEvent.change(amountInput, { target: { value: "1500" } });

    fireEvent.click(screen.getByText(/Create Claim/));

    await waitFor(() => {
      expect(screen.getByText(/Claim amount cannot exceed policy amount./)).toBeInTheDocument();
    });
  });

  it("should submit the form successfully", async () => {
    render(<ClaimForm />);
    const policyNumberInput = screen.getByLabelText(/Policy Number:/);
    const descriptionInput = screen.getByLabelText(/Description:/);
    const statusInput = screen.getByLabelText(/Status:/);
    const amountInput = screen.getByLabelText(/Amount:/);

    // Mocking the successful response of axios for policy amount
    axios.get.mockResolvedValueOnce({ data: { amount: 1000 } });

    // Mocking the successful post request for claim submission
    axios.post.mockResolvedValueOnce({ status: 200 });

    fireEvent.change(policyNumberInput, { target: { value: "123" } });
    fireEvent.change(descriptionInput, { target: { value: "Test claim description" } });
    fireEvent.change(statusInput, { target: { value: "pending" } });
    fireEvent.change(amountInput, { target: { value: "500" } });

    fireEvent.click(screen.getByText(/Create Claim/));

    await waitFor(() => {
      expect(screen.queryByText(/Claim created successfully!/)).toBeInTheDocument();
    });
  });

  it("should handle API error when submitting the form", async () => {
    render(<ClaimForm />);
    const policyNumberInput = screen.getByLabelText(/Policy Number:/);
    const descriptionInput = screen.getByLabelText(/Description:/);
    const statusInput = screen.getByLabelText(/Status:/);
    const amountInput = screen.getByLabelText(/Amount:/);

    // Mocking the successful response of axios for policy amount
    axios.get.mockResolvedValueOnce({ data: { amount: 1000 } });

    // Mocking the error response for claim creation
    axios.post.mockRejectedValueOnce(new Error("Failed to create claim"));

    fireEvent.change(policyNumberInput, { target: { value: "123" } });
    fireEvent.change(descriptionInput, { target: { value: "Test claim description" } });
    fireEvent.change(statusInput, { target: { value: "pending" } });
    fireEvent.change(amountInput, { target: { value: "500" } });

    fireEvent.click(screen.getByText(/Create Claim/));

    await waitFor(() => {
      expect(screen.getByText(/Failed to create claim./)).toBeInTheDocument();
    });
  });
});
