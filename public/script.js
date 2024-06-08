// File: public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket(`ws://${location.host}`);
    const messages = document.getElementById('messages');
    const input = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    ws.onmessage = (event) => {
        try {
            // Parse the incoming message
            const data = JSON.parse(event.data);
            const message = document.createElement('div');
            message.textContent = data.message; // Access the message content
            messages.appendChild(message);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    sendButton.addEventListener('click', () => {
        if (input.value) {
            const message = { message: input.value }; // Create a message object
            ws.send(JSON.stringify(message)); // Send the message as a JSON string
            input.value = '';
        }
    });

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value) {
            const message = { message: input.value }; // Create a message object
            ws.send(JSON.stringify(message)); // Send the message as a JSON string
            input.value = '';
        }
    });
});
