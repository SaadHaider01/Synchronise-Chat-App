import ChatHeader from "./componenets/chat-header";
import MessageBar from "./componenets/message-bar";
import MessageContainer from "./componenets/message-container";

const ChatContainer = () => {
    return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
        <ChatHeader />
        <MessageContainer />
        <MessageBar />
    </div>
    );
};

export default ChatContainer;