// File: public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket(`ws://${location.host}`);
    const messages = document.getElementById('messages');
    const input = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Function to append a new message to the chat window
    const appendMessage = (content) => {
        const message = document.createElement('div');
        message.textContent = content;
        messages.appendChild(message);
    };

    // Handle incoming messages from the WebSocket server
    ws.onmessage = (event) => {
        try {
            // Parse the incoming JSON message
            const data = JSON.parse(event.data);
            // Display the message content
            appendMessage(data.message);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    // Send message on button click
    sendButton.addEventListener('click', () => {
        if (input.value) {
            const message = { message: input.value };
            ws.send(JSON.stringify(message)); // Send message as a JSON string
            input.value = ''; // Clear the input field
        }
    });

    // Send message on pressing 'Enter'
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value) {
            const message = { message: input.value };
            ws.send(JSON.stringify(message)); // Send message as a JSON string
            input.value = ''; // Clear the input field
        }
    });
});
