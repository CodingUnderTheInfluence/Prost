import React from 'react'

function SingleMessage({m}) {
    return (
        <div className='message'>
            User {m.name} says: {m.body}
        </div>
    )
}

export default SingleMessage
