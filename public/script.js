// File: public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket(`ws://${location.host}`);
    const messages = document.getElementById('messages');
    const input = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    ws.onmessage = (event) => {
        const message = document.createElement('div');
        message.textContent = event.data;
        messages.appendChild(message);
    };

    sendButton.addEventListener('click', () => {
        if (input.value) {
            ws.send(input.value);
            input.value = '';
        }
    });

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value) {
            ws.send(input.value);
            input.value = '';
        }
    });
});
