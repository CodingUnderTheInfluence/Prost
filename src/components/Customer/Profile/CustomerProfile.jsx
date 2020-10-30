import React, {useState, useEffect} from 'react';
import Home from './Home.jsx';
import EContact from './EContact.jsx';
import Favorite from './Favorite.jsx';
import Translate from './Translate.jsx';
import Checkin from './Checkin.jsx';
import History from './History.jsx';
import Follower from './Follower.jsx';
import Following from './Following.jsx';

const CustomerProfile = () => {
    const [customerId, setCustomerId] = useState(1);
    const [view, setView] = useState('Home');
    const [data, setData] = useState(false);
    const [following, setFollowing] = useState(0);
    const [follower, setFollower] = useState(0);
    const [followerList, setFollowerList] = useState(0);
    const [followingList, setFollowingList] = useState(0);



    const getFollowing= () => {
      fetch(`${process.env.REDIRECT}/db/relationship/all/following/${customerId}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(res => {
        console.log('Contact Success :', res)
        setFollowing(res.length)
        setFollowingList(res);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    const getFollower= () => {
      fetch(`${process.env.REDIRECT}/db/relationship/all/follower/${customerId}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(res => {
        console.log('Contact Success :', res)
        setFollower(res.length)
        setFollowerList(res);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    const getData = () => {
      fetch(`${process.env.REDIRECT}/db/customer`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        setData(data[0])
        setCustomerId(data[0].id)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    useEffect(() => {
      getData();
      getFollowing();
      getFollower();
    }, []);

    switch(view){
        case 'Home':
          return <Home setView={setView} name={data.user_name} following={following} follower={follower}/>
        case 'EContact':
          return <EContact setView={setView} customerId={customerId}/>
        case 'Checkin':
          return <Checkin setView={setView} customerId={customerId}/>
        case 'History':
          return <History setView={setView} customerId={customerId}/>
        case 'Favorite':
          return <Favorite setView={setView} customerId={customerId}/>
        case 'Translate':
          return <Translate setView={setView} customerId={customerId}/>
        case 'Following':
          return <Following setView={setView} customerId={customerId} followingList={followingList} />
        case 'Follower':
          return <Follower setView={setView} customerId={customerId} followerList={followerList} />
    }
}

export default CustomerProfile;