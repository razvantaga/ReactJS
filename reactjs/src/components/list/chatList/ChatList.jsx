import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const [input, setInput] = useState("");

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        if (!currentUser || !currentUser.id) return;

        const fetchChats = async () => {
            const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
                const items = res.data().chats || [];

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);
                    const user = userDocSnap.data();
                    return { ...item, user };
                });

                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            });

            return () => {
                unSub();
            };
        };

        fetchChats();
    }, [currentUser]);

    const handleSelect = async (chat) => {
        if (!currentUser) return;

        const userChatsRef = doc(db, "userchats", currentUser.id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        const userChatsData = userChatsSnapshot.data();

        const updatedChats = userChatsData.chats.map((item) => {
            if (item.chatId === chat.chatId) {
                return { ...item, isSeen: true };
            }
            return item;
        });

        try {
            await updateDoc(userChatsRef, {
                chats: updatedChats,
            });
            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }
    };

    const filteredChats = chats.filter( (c) => c.user.username.toLowerCase().includes(input.toLowerCase()))

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="Search" />
                    <input type="text" placeholder="Search" onChange={(e) => setInput(e.target.value)}/>
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt={addMode ? "Minus" : "Plus"}
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>

            {filteredChats.map((chat) => (
                <div
                    className="item"
                    key={chat.chatId}
                    onClick={() => handleSelect(chat)}
                    style={{
                        backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
                    }}
                >
                    <img src={ chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user?.avatar } alt="Avatar" />
                    <div className="texts">
                        <span>{ chat.user.blocked.includes(currentUser.id) ? "User" : chat.user?.username}</span>
                        <p>{chat.lastMessage || "No messages yet"}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
