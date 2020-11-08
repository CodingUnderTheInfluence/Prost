import { Grid } from '@material-ui/core'
import React from 'react'

const SinglePrivateMessage = ({m, friendId}) => {
    
    return (
        m.sender === friendId ? <Grid className='receivedMessage'>{m.body}</Grid> : <Grid className='sentMessage'>{m.body}</Grid>
    )    

}

export default SinglePrivateMessage
