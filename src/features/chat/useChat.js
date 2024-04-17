import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  getDoc,
  doc,
  and,
  onSnapshot,
  or,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import {
  Navigate,
  resolvePath,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import useState from "react-usestateref";
import useStateRef from "react-usestateref";

const UseChat = () => {
  const [new_messages, setNewMessages] = useState([]);
  const [new_chats, setNewChats] = useState([]);
  const [messages, setMessages, messages_ref] = useState([]);
  const [chat_list, setChatList] = useState(null);
  const [chatroom_list, setChatroomList, chatroom_list_ref] = useState(null);
  const [chat_name, setChatName] = useState("");
  const [chatroom, setChatroom, chatroom_ref] = useState(null);
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [new_recipient, setNewRecipient] = useState(null);
  const [sending_message, setSendingMessage, sending_message_ref] =
    useStateRef(false);
  const messages_end_ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatroom != null) {
      console.log(chatroom);
      getChatroomMessages(chatroom.id);
    }
  }, [chatroom]);

  const getChatroomMessages = (chatroom_id) => {
    axios
      .get(`https://quick-api-9c95.onrender.com/messages/${chatroom_id}`, {})
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data.reverse());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const openChatroomListener = (chatroom_id) => {
  //     const unsub = onSnapshot(doc(db, "chatrooms", chatroom_id), (doc) => {
  //         if (chatroom_ref.current != null) {
  //             if (doc.id === chatroom_ref.current.id) {
  //                 // console.log(doc.data())
  //                 console.log('New message received')
  //                 setMessages(doc.data().messages.reverse());
  //             }
  //         }
  //     });
  // }

  const getChatrooms = async () => {
    try {
      const response = await axios.get(
        `https://quick-api-9c95.onrender.com/user/${user.uid}/chatrooms`,
        {}
      );
      if (response.status === 200) {
        setChatroomList(response.data);
        // console.log('Opening ' + response.data.length + ' chatroom listeners...')
        response.data.forEach(({ id }) => {
          // openChatroomListener(id);
        });
      }
    } catch (error) {
      console.error(error);
    }
    // axios.get(`https://quick-api-9c95.onrender.com/user/${user.uid}/chatrooms`, {}).then((response) => {
  };

  const getChatName = async () => {
    // const other_ref = await doc(db, "users", search_params.get("to"));
    // const other = await getDoc(other_ref);
    // setChatName(other.data().name);
  };

  const getMessages = async () => {
    // const self_ref = await doc(db, "users", user.uid);
    // const other_ref = await doc(db, "users", search_params.get("to"));
    // const messages_qry = await query(collection(db, "direct_messages"), and(
    //     or(where("from", "==", self_ref), where("from", "==", other_ref)),
    //     or(where("to", "==", self_ref), where("to", "==", other_ref))
    // ));
    // const messages = await getDocs(messages_qry);
    // setMessages(await Promise.all(
    //     messages.docs.map((message) => {
    //         return message.data();
    //     })
    // ));
  };

  // const getChatList = async () => {
  //     try {
  //         const self_ref = await doc(db, "users", user.uid);
  //         const mess_qry = await query(collection(db, "direct_messages"), or(where("from", "==", self_ref), where("to", "==", self_ref)));
  //         const mess_ref = await getDocs(mess_qry);

  //         let mess = await Promise.all(
  //             mess_ref.docs.map(async (mess) => {
  //                 let to_user = await getDoc(mess.data().to);

  //                 if (to_user.id === user.uid) {
  //                     to_user = await getDoc(mess.data().from);
  //                 }

  //                 let to_user_data = to_user.data();
  //                 to_user_data.uid = to_user.id;
  //                 return to_user_data;
  //             })
  //         )

  //         setChatList(mess.filter(
  //             (person, index) => index === mess.findIndex(
  //                 other => person.avatar === other.avatar
  //             )
  //         ));

  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  const addParticipants = (chatroom_id, users_id) => {
    console.log(chatroom.participants);
    axios
      .post(
        `https://quick-api-9c95.onrender.com/chatrooms/`,
        {},
        {
          params: {
            chatroom_id: chatroom.participants.length <= 2 ? "" : chatroom_id,
            participants:
              chatroom.participants.length <= 2
                ? chatroom.participants.map(({ id }) => id).join(",") +
                  "," +
                  users_id.join(",")
                : users_id.join(","),
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setChatroom({
            ...chatroom,
            participants: [...chatroom.participants, ...response.data],
          });
        } else {
          setChatroom({
            id: response.data.id,
            messages: [],
            participants: response.data.participants,
          });
        }
      });
  };

  const sendMessage = (message, message_media) => {
    const form_data = new FormData();
    if (message_media !== undefined) {
      message_media.forEach((media) => {
        form_data.append("media", media.file);
      });
    }
    if (new_recipient !== null) {
      // axios.post(`https://quick-api-9c95.onrender.com/chatrooms/`, {}, {
      axios
        .post(
          `https://quick-api-9c95.onrender.com/chatrooms/`,
          {},
          {
            params: {
              chatroom_id: "",
              participants: `${user.uid},${search_params.get("to")}`,
              requester_id: user.uid,
            },
          }
        )
        .then((response) => {
          openChatListListener(response.data.id);
          // axios.post(`https://quick-api-9c95.onrender.com/messages/${response.data.id}`, form_data, {
          axios
            .post(
              `https://quick-api-9c95.onrender.com/messages/${response.data.id}`,
              form_data,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                params: {
                  from_user: user.uid,
                  // color: '#000000',
                  message: message,
                },
              }
            )
            .then(() => {
              setSendingMessage(false);
              setChatroom(response.data);
              setNewRecipient(null);
              navigate("/dms");
              setChatroomList([response.data, ...chatroom_list]);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // axios.post(`https://quick-api-9c95.onrender.com/messages/${chatroom.id}`, form_data, {
      axios
        .post(
          `https://quick-api-9c95.onrender.com/messages/${chatroom.id}`,
          form_data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              from_user: user.uid,
              // color: '#000000',
              message: message,
            },
          }
        )
        .then(() => {
          setSendingMessage(false);
        });
    }
    // try {
    //     const self_ref = await doc(db, "users", user.uid);
    //     const other_ref = await doc(db, "users", search_params.get("to"));
    //     await addDoc(collection(db, "direct_messages"), {
    //         date: serverTimestamp(),
    //         from: self_ref,
    //         to: other_ref,
    //         text: text,
    //     });
    //     setMessages([...messages, {
    //         date: { seconds: new Date().getTime() / 1000 },
    //         from: self_ref,
    //         to: other_ref,
    //         text: text,
    //     }])
    //     const other = await getDoc(other_ref);
    //     let add = true;
    //     chat_list.forEach((user) => {
    //         if (user.avatar === other.data().avatar) {
    //             add = false;
    //         }
    //     })
    //     if (add) {
    //         setChatList([...chat_list, other.data()])
    //     }
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
  };

  const openChatListListener = async () => {
    const self_ref = await doc(db, "users", user.uid);
    const q = query(
      collection(db, "direct_messages"),
      where("to", "==", self_ref)
    );
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const to_user = await getDoc(change.doc.data().from);
          let to_user_data = to_user.data();
          to_user_data.uid = to_user.id;

          setNewChats([to_user_data]);
        }
      });
    });
  };

  const openMessagesListener = async () => {
    const self_ref = await doc(db, "users", user.uid);
    const other_ref = await doc(db, "users", search_params.get("to"));
    const q = query(
      collection(db, "direct_messages"),
      and(where("from", "==", other_ref), where("to", "==", self_ref))
    );
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setNewMessages([...new_messages, change.doc.data()]);
        }
      });
    });
  };

  useEffect(() => {
    if (messages !== null) {
      setMessages([...new_messages, ...messages]);
    }
  }, [new_messages]);

  useEffect(() => {
    if (chat_list !== null) {
      let add = true;

      chat_list.forEach((chat) => {
        new_chats.forEach((new_chat) => {
          if (chat.avatar === new_chat.avatar) {
            add = false;
          }
        });
      });
      if (add) {
        setChatList([...chat_list, ...new_chats]);
      }
    }
  }, [new_chats]);

  useEffect(() => {
    if (chatroom_list !== null) {
      if (search_params.get("to") !== null) {
        if (search_params.get("to") !== user.uid) {
          if (
            chatroom_list.findIndex((chatroom) => {
              if (chatroom.participants.length <= 2) {
                const to_index = chatroom.participants.findIndex(
                  ({ id }) => id === search_params.get("to")
                );
                if (to_index !== -1) {
                  setChatroom(chatroom);
                  setNewRecipient(null);
                  navigate("/dms");
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            }) === -1
          ) {
            axios
              .get(
                `https://quick-api-9c95.onrender.com/user/${search_params.get(
                  "to"
                )}`,
                {}
              )
              .then((response) => {
                if (response.status === 200) {
                  setChatName(response.data.name);
                  setNewRecipient(response.data);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }
    }
  }, [chatroom_list]);

  const openCHatroomListListener = () => {
    /*
            open a listener on the wholle chatrooms collection to get new chatrooms that may
            contain the current user as participant
        */
    // return onSnapshot(collection(db, "chatrooms"), (change) => {
    const q = query(
      collection(db, "chatrooms"),
      and(where("participants", "array-contains", doc(db, "users", user.uid)))
    );
    const s = onSnapshot(q, (snapshot) => {
      if (chatroom_list_ref.current !== null) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified" || change.type === "added") {
            const updated_chatroom = {
              id: change.doc.id,
              ...change.doc.data(),
            };
            // const updated_chatrooms_ids = updated_chatrooms.map(({ id }) => (id))
            const updated_user_chatrooms = chatroom_list_ref.current.filter(
              ({ id }) => id.indexOf(change.doc.id) !== -1
            );
            // const new_user_chatrooms = change.doc.id.indexOf(chatroom_list_ref.current) !== -1)
            // )
            console.log("Updated chatroom related to current user:");

            if (
              chatroom_list_ref.current.findIndex(
                (e) => e.id === updated_chatroom.id
              ) === -1
            ) {
              console.log(
                "The updated chatroom is not in the chatroom list, appending..."
              );

              axios
                .get(
                  "https://quick-api-9c95.onrender.com/chatrooms/" +
                    updated_chatroom.id,
                  {}
                )
                .then((response) => {
                  if (response.status === 200) {
                    console.log(response.data);
                    setChatroomList([
                      response.data,
                      ...chatroom_list_ref.current,
                    ]);
                  }
                });
            } else {
              console.log(
                "The chatroom is already in the chatroom list, retriving changes..."
              );

              if (
                updated_chatroom.messages.length !== messages_ref.current.length
              ) {
                setMessages(updated_chatroom.messages.reverse());
              }
              // if (updated_chatroom.participants.length !== chatroom_ref.current.participants.length) {
              //     axios.get('https://quick-api-9c95.onrender.com/chatrooms/' + updated_chatroom.id, {}).then((response) => {
              //         if (response.status === 200) {
              //             console.log('see')
              //             console.log(response.data)
              //             setChatroom(response.data)
              //         }
              //     })
              // }
            }
          }
        });
      }

      // console.log('Chatrooms with the following IDs have updated:')
      // console.log(updated_chatrooms)

      // if (updated_user_chatrooms.length > 0) {
      //     console.log('Updated chatrooms correspond to the following user\'s chatrooms:')
      //     console.log(updated_user_chatrooms)

      // }
      // if (new_user_chatrooms.length > 0) {
      //     console.log('New chatrooms for the current user opened:')
      //     console.log(new_user_chatrooms)

      //     Promise.all(new_user_chatrooms.map((chatroom) => {
      //         return new Promise((resolve, reject) => {
      //             axios.get('https://quick-api-9c95.onrender.com/chatrooms/' + chatroom.id, {}).then((response) => {
      //                 if (response.status === 200) {
      //                     resolve(response.data)
      //                 }
      //             }).catch((error) => {
      //                 reject(console.log(error));
      //             });
      //         })
      //     })).then((new_chatrooms) => {
      //         setChatroomList([...new_chatrooms, ...chatroom_list_ref.current])
      //     })
      // }

      // updated_user_chatrooms.forEach((updated_user_chatroom) => {
      //     /*
      //     if the updated chatroom is the current opened chatroom
      //     */
      //     if (chatroom_ref.current !== null && updated_user_chatroom.id === chatroom_ref.current.id) {
      //         const updated_chatroom_messages = updated_chatrooms.find(ucr => (ucr.id === chatroom_ref.current.id)).messages
      //         /*
      //         check if the message array length is different between the updated and the current
      //         opened chatroom so we only have to append the last message
      //         */
      //         if (messages_ref.current !== updated_chatroom_messages.length) {
      //             setMessages([updated_chatroom_messages.pop(), ...messages_ref.current])
      //         }
      //     }
      // })
      // }
    });
  };

  /*
        current user's chatrooms should be loaded before opening the listeners
        so we can know weather an updated chatroom corresponds to any of the
        current user's chatrooms
    */
  const startChatList = async () => {
    getChatrooms();
    openCHatroomListListener();
    // await openCHatroomListListener();
  };

  useEffect(() => {
    startChatList();

    // getChatList();
    // openMessagesListener();
    // openChatListListener();
  }, []);

  return {
    messages_end_ref,
    messages,
    sendMessage,
    chat_list,
    sending_message_ref,
    chat_name,
    chatroom_list,
    chatroom,
    new_recipient,
    setChatName,
    setChatroom,
    setSendingMessage,
    getChatName,
    getMessages,
    getChatrooms,
    // openChatroomListener,
    addParticipants,
  };
};

export default UseChat;
