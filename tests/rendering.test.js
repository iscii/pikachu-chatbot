import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatBotUIComp from '../src/chatbot';

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
  

test('renders chatbot UI with input and send button', () => {
  // Render the ChatBotUIComp component
  render(<ChatBotUIComp />);

  // Check that the input field and send button exist
  const inputElement = screen.getByPlaceholderText(/type a message/i);
  const sendButton = screen.getByText(/send/i);

  expect(inputElement).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();
});
