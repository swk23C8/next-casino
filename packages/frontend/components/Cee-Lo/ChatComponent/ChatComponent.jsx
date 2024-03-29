import React, { useEffect, useState } from 'react';
import { useChannel } from "./ChatReactEffect";
import styles from './ChatComponent.module.css';

const AblyChatComponent = (userType = []) => {
	let inputBox = null;
	let messageEnd = null;

	const [messageText, setMessageText] = useState("");
	const [receivedMessages, setMessages] = useState([]);
	const messageTextIsEmpty = messageText.trim().length === 0;

	const [channel, ably] = useChannel("chat-demo", (message) => {
		const history = receivedMessages.slice(-199);
		setMessages([...history, message]);
	});

	const sendChatMessage = (messageText) => {
		channel.publish({ name: "chat-message", data: messageText });
		setMessageText("");
		inputBox.focus();
	}

	const handleFormSubmission = (event) => {
		event.preventDefault();
		sendChatMessage(messageText);
	}

	const handleKeyPress = (event) => {
		if (event.charCode !== 13 || messageTextIsEmpty) {
			return;
		}
		sendChatMessage(messageText);
		event.preventDefault();
	}

	const messages = receivedMessages.map((message, index) => {
		const author = message.connectionId === ably.connection.id ? "me" : "other";
		return <span key={index} className={styles.message} data-author={author}>{message.data}</span>;
	});

	useEffect(() => {
		messageEnd.scrollIntoView({ behaviour: "smooth" });
	});

	return (
		<div className={styles.chatHolder}>
			<div className={styles.chatText}>
				{messages}
				<div ref={(element) => { messageEnd = element; }}></div>
			</div>
			<form onSubmit={handleFormSubmission} className={styles.form}>
				<textarea
					ref={(element) => { inputBox = element; }}
					value={messageText}
					// if userType is GUEST, change placeholder to "Please enter Signin to chat"
					placeholder={userType.userType === "GUEST" ? "Please enter sign in to chat" : "Enter your message"}
					// placeholder={"Type a message..."}
					onChange={e => setMessageText(e.target.value)}
					onKeyPress={handleKeyPress}
					className={styles.textarea}
					disabled={userType.userType === "GUEST"}
				></textarea>
				<button
					// disabled if messageTextIsEmpty is true or if stats.userType is GUEST
					disabled={
						messageTextIsEmpty || userType.userType === "GUEST"
					}
					type="submit"
					className={styles.button}
				>
					Send
				</button>
			</form>
		</div>
	)
}

export default AblyChatComponent;