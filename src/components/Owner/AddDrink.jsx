import React, { useState, useEffect } from 'react';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import axios from 'axios';


const AddDrink = ({ id, barId, setDrinkCount }) => {

    const [count, setCount] = useState(0);;

    const addDrink = () => {
        axios.get(`/db/drinks/drinksList?id=${id}`)
            .then(({ data }) => {
                if (data === 0) {
                    axios.post('/db/drinks/drinksList', { id, barId })
                } else if (data === 'Drinks') {
                    axios.put('/db/drinks/updateCount', { count, id, barId })
                        .then(({ data }) => setDrinkCount(data))
                        .catch(err => console.warn(err))
                }
            })
            .catch((err) => console.warn(err))
    }

    const drinkTotal = () => {
        axios.get(`/db/drinks/count?customerId=${id}&barId=${barId}`)
            .then(({ data }) => {
                setDrinkCount(data);
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    useEffect(() => {
        drinkTotal();
    }, [])


    const updateCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <PlusOneIcon
                onClick={() => {
                    updateCount();
                    addDrink();
                    drinkTotal();
                }} />
        </div>
    )
}

export default AddDrink;
