import React from 'react'

const Messages = ({ messages, currentUser }) => {

    let renderMessage = (message, index) => {
        const { sender, content, color } = message;
        const messageFromMe = currentUser.username === message.sender;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className} key={index}>
                <span
                    className="avatar"
                    style={{ backgroundColor: color }}
                />
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{content}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map((msg, index )=> renderMessage(msg, index))}
        </ul>
    )
}


export default Messages