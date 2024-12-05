import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatBotUIComp from '../src/chatbot';

jest.useFakeTimers();
// Mock authentication
jest.mock('../src/firebase', () => ({
    auth: { currentUser: { displayName: 'Test User' } },  // Mock current user as signed in
    getAuth: jest.fn(),
  }));
  

// User message display test
test('displays user message when sent', () => {
  render(<ChatBotUIComp />);
  
  const inputElement = screen.getByPlaceholderText(/type a message/i);
  const sendButton = screen.getByText(/send/i);

  fireEvent.change(inputElement, { target: { value: 'Hello Pikachu' } });
  fireEvent.click(sendButton);

  const userMessage = screen.getByText('You: Hello Pikachu');
  expect(userMessage).toBeInTheDocument();
});

// Pikachu Response Test
test('displays AI response after user message', async () => {
    render(<ChatBotUIComp />);
    
    const inputElement = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByText(/send/i);
  
    fireEvent.change(inputElement, { target: { value: 'Hello Pikachu' } });
    fireEvent.click(sendButton);
  
    // Fast-forward the setTimeout
    act(() => {
      jest.runAllTimers();
    });
  
    const aiMessage = await screen.findByText(/Pikachu:/i);
    expect(aiMessage).toBeInTheDocument();
  });

  // Empty message handling
  test('does not send a message when input is empty', () => {
    render(<ChatBotUIComp />);
    
    const sendButton = screen.getByText(/send/i);
    fireEvent.click(sendButton);
  
    const userMessage = screen.queryByText('You:');
    expect(userMessage).toBeNull();
  });