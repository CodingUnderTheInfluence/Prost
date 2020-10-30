import React from 'react'

function MessagesListItem({thread}) {
    return (
        <div>
            <h1>{thread.id}</h1>
            <h3>{thread.createdAt}</h3>
        </div>
    )
}

export default MessagesListItem
