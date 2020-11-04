import React, {useState, useEffect} from 'react'
import Axios from 'axios'

function PendingFriend({f}) {
    //useEffect to gather userInfo from database
    const [data, setData] = useState();
    useEffect(() => {
        Axios.get(`/db/customer/getFriendById?customerId=${f.id_friend}`)
            .then(({data}) => {
                console.log(data, 'Pending Friend Data')
                setData(data)
            })
    }, [])
    console.log(f)
    if (data) {
        return (
            <div>
                {data.user_name} wants to be your friend.
            </div>
        )
    } else {
        return (
            <div>
                Loading Friend Data
            </div>
        )
    }
}

export default PendingFriend
