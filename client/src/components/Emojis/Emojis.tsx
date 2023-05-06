/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type EmojiSelectHandler = (emoji: string) => void;

interface Props {
  onSelect: EmojiSelectHandler;
}

function Emojis({ onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emojiObject: EmojiClickData) => {
    onSelect(emojiObject.emoji);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '40px',
      right: 0,
      height: '0px',
      display: 'inline-block',
      zIndex: 9999,
    }}
    >
      <span style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        😀
      </span>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          right: 0,
          zIndex: 9999,
        }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
          />
        </div>
      )}
    </div>
  );
}

export default Emojis;
