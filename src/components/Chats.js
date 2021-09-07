import React, {useState, useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../components/firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true); 

    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})

    }

    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }
        
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "a0dba832-82ed-4501-ba7a-a3f8a1da36d1",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                    formdata,
                    { headers: { "private-key": "e3eb3e27-6234-4854-b2dc-11fbcd60e6d5" }}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Converse
                </div>
                <div onClick={handleLogout} classname="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="a0dba832-82ed-4501-ba7a-a3f8a1da36d1"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;