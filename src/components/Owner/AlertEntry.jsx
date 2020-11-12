import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertEntry = ({ customer, barId, count }) => {

    const [state, setState] = useState();

    useEffect(() => {
        axios.get(`/db/drinks/alerts?customer=${customer}&barId=${barId}&count=${count}`)
            .then(({ data }) => {
                setState(data)
            })
    }, [])

    return (
        <div>
            {state}
        </div>
    )
}

export default AlertEntry
