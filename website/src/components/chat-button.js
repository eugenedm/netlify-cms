import React from 'react';
import styled from '@emotion/styled';

const ChatLink = styled.a`
  z-index: 100;
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`;

function ChatButton() {
  return (
    <ChatLink href="/" target="_blank" rel="noopener noreferrer">
     
    </ChatLink>
  );
}

export default ChatButton;
