import React from 'react';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import axios from 'axios';


const AddDrink = ({ id }) => {

    const addDrink = () => {
        axios.get(`/db/drinks/drinksList?id=${id}`)
            .then(({ data }) => {
                if (data === 0) {
                    axios.post('/db/drinks/drinksList', { id })
                }
            })
    }

    return (
        <div>
            <PlusOneIcon onClick={() => { addDrink() }} />
        </div>
    )
}

export default AddDrink;
