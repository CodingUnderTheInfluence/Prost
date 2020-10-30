import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import MessagesListItem from './messagesListItem.jsx';

function MessageList() {
    //contact the DB, getting all threads involving user
    //add to state array
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        Axios.get('/db/thread')
            .then(({data}) => {
                console.log(data)
                setThreads(data);
            });
    },[])

    return (
        <div>
            {threads.map(thread => {
                return <MessagesListItem key={thread.id} thread={thread}/>
            })}
        </div>
    )
}

export default MessageList
