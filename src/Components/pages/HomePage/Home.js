import React from 'react';
import Welcome from '../../Welcome';
import {homeObjFour, homeObjOne, homeObjThree, multiChatting, multiRooms, messageAbuse, AbusingRules} from './Data';
function Home() {
    return (
        <>
            <Welcome {...homeObjOne} />
            <Welcome {...homeObjThree} />
            <Welcome {...multiChatting} />
            <Welcome {...multiRooms} />
            <Welcome {...messageAbuse} />
            <Welcome {...AbusingRules} />
            <Welcome {...homeObjFour} />
        </>
    );
}

export default Home
