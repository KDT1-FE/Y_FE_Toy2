import React, { useState, useEffect } from 'react';
import { Message } from '@types/Message';
import socket from '../../apis/socket';

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the chat server');
      setIsConnected(true);
    });

    socket.on('disconnect', reason => {
      console.log(`Disconnected: ${reason}`);
      setIsConnected(false);
    });

    socket.on('messages-to-client', (messageObject: Message) => {
      setMessages(prevMessages => [...prevMessages, messageObject]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message-to-client');
    };
  }, []);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    socket.emit('message-to-server', { RequestData: message });
    setMessage('');
  };

  return (
    <>
      <div>Chat</div>
      <p>State: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map(msg => (
          <p key={msg.id}>
            {msg.userId}: {msg.text} -{' '}
            {new Date(msg.createdAt).toLocaleString()}
          </p>
        ))}
      </div>
    </>
  );
}
