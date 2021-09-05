import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatInput from "./components/ChatInput";
import { selectRoomId } from "./features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import Message from "./components/Message";

function Chat() {
  const chatRef = useRef();
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessage, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessage ? (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessage?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      ) : (
        <NoChatSelected>
          PLEASE SELECT A CHANNEL,but if you don't have any channel, create one
          by clicking on the 'ADD CHANNEL' button on the left bottom of the
          side-bar, then you select it
        </NoChatSelected>
      )}
    </ChatContainer>
  );
}

export default Chat;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  h4 > {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
`;

const ChatContainer = styled.div`
  flex: .2;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
const ChatMessages = styled.div`
  margin-bottom: 200px;
`;
const NoChatSelected = styled.h1`
  display: grid;
  place-items: center;
  height: 100vh;
  font-size: 15px;
  color: #bbb8b8;
  text-align: center;
`;
const ChatBottom = styled.div``;
