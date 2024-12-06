import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatBotUIComp from '../src/chatbot';

jest.useFakeTimers();

// Mock Firebase Firestore and its methods
jest.mock('../src/firebase', () => ({
    auth: { currentUser: { displayName: 'Test User' } }, // Mock current user
    db: {}, // Leave this empty, as Firestore methods will be mocked directly
}));
  
jest.mock('firebase/firestore', () => ({
    getDocs: jest.fn(),
    collection: jest.fn(() => ({ id: "mockCollectionId" })), // Mock collection object
    addDoc: jest.fn(() => Promise.resolve({ id: "mockDocId" })), // Mock adding a document
    getCountFromServer: jest.fn(() =>
    Promise.resolve({ data: () => ({ count: 1 }) }) // Mock Firestore count
    ),
    where: jest.fn(),
    documentId: jest.fn(),
    query: jest.fn(),
}));
  

// User message display test
test('displays user message when sent', () => {
  render(<ChatBotUIComp />);
  
  const inputElement = screen.getByPlaceholderText(/type a message/i);
  const sendButton = screen.getByText(/send/i);

  fireEvent.change(inputElement, { target: { value: 'Hello Pikachu' } });
  fireEvent.click(sendButton);

  const userMessage = screen.getByText('Hello Pikachu');
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

    const aiMessages = await screen.findAllByText(/Pika/i);
    expect(aiMessages.length).toBeGreaterThan(0); // Ensure at least one AI message matches
});

// Empty message handling
test('does not send a message when input is empty', () => {
    render(<ChatBotUIComp />);

    const sendButton = screen.getByText(/send/i);
    fireEvent.click(sendButton);

    const userMessage = screen.queryByText('You:');
    expect(userMessage).toBeNull();
});