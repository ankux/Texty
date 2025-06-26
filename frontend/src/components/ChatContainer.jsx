import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { useEffect, useRef } from 'react'
import ChatHeader from './CharHeader'
import MessageSkeleton from './skeletons/MessageSkeleton'
import MessageInput from './MessageInput'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
    const {
      messages,
      getMessages,
      isMessagesLoading,
      selectedUser,
      subscribeToMessages,
      unsubscribeFromMessages,
      isTyping,
      subscribeToTyping,
      unsubscribeFromTyping,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageListRef = useRef(null);
    const messageEndRef = useRef(null);
  
    useEffect(() => {
      getMessages(selectedUser._id);
      
      subscribeToMessages();
      subscribeToTyping();

      // cleanup function
      return () => {
        unsubscribeFromMessages();
        unsubscribeFromTyping();
      };
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages, subscribeToTyping, unsubscribeFromTyping]);
  
    useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, isTyping]);
  
    if (isMessagesLoading) {
      return (
        <div className="flex-1 flex flex-col overflow-auto">
          <ChatHeader />
          <MessageSkeleton />
          <MessageInput />
        </div>
      );
    }
  
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
  
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4" ref={messageListRef}>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {isTyping && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img src={selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
                  </div>
                </div>
                <div className="chat-bubble flex items-center gap-1 bg-base-300">
                  <span className="animate-bounce inline-block w-2 h-2 bg-zinc-500 rounded-full" style={{ animationDelay: '0ms' }}></span>
                  <span className="animate-bounce inline-block w-2 h-2 bg-zinc-500 rounded-full" style={{ animationDelay: '150ms' }}></span>
                  <span className="animate-bounce inline-block w-2 h-2 bg-zinc-500 rounded-full" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>
  
        <MessageInput />
      </div>
    );
  };

export default ChatContainer