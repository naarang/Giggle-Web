import ChatBotChatBox from '@/components/ChatBot/ChatBotChatBox';
import ChatBotInput from '@/components/ChatBot/ChatBotInput';
import UserChatBox from '@/components/ChatBot/UserChatBox';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { CHAT_BOT_INTRODUCE_MESSAGE } from '@/constants/chatbot';
import { ChatItemType } from '@/types/api/chatbot';
import { getCurrentDayAndTime } from '@/utils/getCurrentDateTime';
import { useState } from 'react';

const ChatBotPage = () => {
  const [chatData, setChatData] = useState<ChatItemType[]>([
    CHAT_BOT_INTRODUCE_MESSAGE,
  ]);

  const addChatData = (newChatData: ChatItemType) => {
    setChatData([...chatData, newChatData]);
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="GIGGLE Bot Chat"
      />
      <section className="w-full p-[1.5rem] pb-[9.375rem]">
        <div className="w-full pb-[1.5rem] caption-1 text-[#1E1926] text-center">
          {getCurrentDayAndTime()}
        </div>
        <div className="w-full flex flex-col gap-[1rem]">
          {chatData.map((data, index) =>
            data.isBot ? (
              <ChatBotChatBox key={index} text={data.message} />
            ) : (
              <UserChatBox key={index} text={data.message} />
            ),
          )}
        </div>
      </section>
      <ChatBotInput addChatData={addChatData} />
    </>
  );
};

export default ChatBotPage;
