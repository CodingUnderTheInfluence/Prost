import React, { useState } from 'react';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import axios from 'axios';


const AddDrink = ({ id, barId }) => {

    const [count, setCount] = useState(1);
    const [drink, setDrinkCount] = useState(0);

    const addDrink = () => {
        axios.get(`/db/drinks/drinksList?id=${id}`)
            .then(({ data }) => {
                if (data === 0) {
                    axios.post('/db/drinks/drinksList', { id, barId })
                } else if (data === 'Drinks') {
                    axios.put('/db/drinks/updateCount', { count, id, barId })
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                }
            })
    }

    const updateCount = () => {
        setCount(count + 1);
        console.log(count)
    }

    return (
        <div>
            {}
            <PlusOneIcon
                onClick={() => {
                    updateCount();
                    addDrink();
                }} />
        </div>
    )
}

export default AddDrink;
