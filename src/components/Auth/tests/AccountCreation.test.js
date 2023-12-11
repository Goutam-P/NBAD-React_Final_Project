// AccountCreation.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserRegistration from './AccountCreation'; // Import the UserRegistration component

// Mock the authService functions
jest.mock('../services/authService', () => ({
  userRegistration: jest.fn(),
}));

describe('AccountCreation component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders signup form', () => {
    render(<UserRegistration />);
    const signUpHeading = screen.getByRole('heading', { name: 'Customer Registration' });
    const fullNameInput = screen.getByLabelText('Display Name:');
    const usernameInput = screen.getByLabelText('User ID:');
    const passwordInput = screen.getByLabelText('Secure Password:');
    const signUpButton = screen.getByRole('button', { name: 'Register' });

    expect(signUpHeading).toBeInTheDocument();
    expect(fullNameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test('handles signup and displays success message', async () => {
    const mockUserRegistration = jest.fn();
    mockUserRegistration.mockResolvedValue('Success');
    require('../services/authService').userRegistration = mockUserRegistration;

    render(<UserRegistration />);
    userEvent.type(screen.getByLabelText('Display Name:'), 'John Doe');
    userEvent.type(screen.getByLabelText('User ID:'), 'johndoe');
    userEvent.type(screen.getByLabelText('Secure Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Signup successful!')).toBeInTheDocument();
    });
  });

  test('handles signup failure and displays error message', async () => {
    const mockUserRegistration = jest.fn();
    mockUserRegistration.mockRejectedValue(new Error('Registration failed'));
    require('../services/authService').userRegistration = mockUserRegistration;

    render(<UserRegistration />);
    userEvent.type(screen.getByLabelText('Display Name:'), 'John Doe');
    userEvent.type(screen.getByLabelText('User ID:'), 'johndoe');
    userEvent.type(screen.getByLabelText('Secure Password:'), 'invalidpassword');
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Sorry, Signup Failed. Please Give It Another Try')).toBeInTheDocument();
    });
  });
});
