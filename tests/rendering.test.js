import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatBotUIComp from '../src/chatbot';

// Mock authentication
jest.mock('../src/firebase', () => ({
    auth: { currentUser: { displayName: 'Test User' } },  // Mock current user as signed in
    getAuth: jest.fn(),
  }));
  

test('renders chatbot UI with input and send button', () => {
  render(<ChatBotUIComp />);
  
  const inputElement = screen.getByPlaceholderText(/type a message/i);
  const sendButton = screen.getByText(/send/i);

  expect(inputElement).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();
});
