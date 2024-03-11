

export const Message = (sender, message, index) => {
    return (
        <div
            key={index}
            className={`mb-2 ${message.sender === 'Tú' ? 'self-end' : 'self-start'}`}
        >
            <span className="font-bold">{sender}:</span> {message}
        </div>
    )

}