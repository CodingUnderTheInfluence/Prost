import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    message: {
        border: 'solid black 1px',
        borderRadius: '5px',
        padding: '10px',
        margin: '5px 0 5px 0',
    }
})


function SingleMessage({m}) {
    const classes = useStyles();
    
    return (
        <div className={classes.message}>
            {m.name} says: {m.body}
        </div>
    )
}

export default SingleMessage
