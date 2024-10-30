import ChatSubmitIcon from '@/assets/icons/ChatSubmitIcon.svg?react';
import { ChatItemType } from '@/types/api/chatbot';
import { useState } from 'react';

type ChatBotInputProps = {
  addChatData: (chatData: ChatItemType) => void;
};

const ChatBotInput = ({ addChatData }: ChatBotInputProps) => {
  const [text, setText] = useState<string>('');

  const onClickSubmit = (text: string) => {
    if (!text) return;

    const newUserChatData = {
      isBot: false,
      message: text,
    };
    addChatData(newUserChatData);
    setText('');
    // TODO: 채팅 api 호출하기
  };

  return (
    <section className="fixed bottom-0 left-0 w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem] shadow-cardShadow">
      <div className="w-full relative">
        <textarea
          className="w-full h-[3.5rem] py-[1rem] px-[1rem] body-2 text-[#464646] rounded-[0.75rem] border border-[#EBEEF1] resize-none"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          className="absolute right-[1rem] bottom-[1.6rem]"
          onClick={() => onClickSubmit(text)}
        >
          <ChatSubmitIcon />
        </button>
      </div>
    </section>
  );
};

export default ChatBotInput;
