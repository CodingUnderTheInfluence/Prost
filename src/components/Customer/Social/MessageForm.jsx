import { VerticalAlignTop } from '@material-ui/icons';
import React, {useState} from 'react'

function MessageForm({socket}) {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) =>{
        socket.emit('sendMessage', {
            name: username,
            body: message
        });
    };

    return (
        <div>
            <input type='text' placeholder='username' onChange={(event) => {setUsername(event.target.value)}} />
            <input type='textarea' onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={handleSubmit}>Send</button>
        </div>
    )
}

export default MessageForm
