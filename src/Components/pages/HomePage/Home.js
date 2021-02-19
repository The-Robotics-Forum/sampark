import React from 'react';
import Welcome from '../../Welcome';
// import DevelopersMain from "../../DevelopersMain";
import {homeObjFour, homeObjOne, homeObjThree, multiChatting, multiRooms, messageAbuse, AbusingRules} from './Data';
// import {devOne, devTwo, devThree} from '../Developers/Data';

function Home() {
    return (
        <>
            <Welcome {...homeObjOne} />
            <Welcome {...homeObjThree} />
            <Welcome {...multiChatting} />
            <Welcome {...multiRooms} />
            <Welcome {...messageAbuse} />
            <Welcome {...AbusingRules} />

            {/* <DevelopersMain {...devOne} />
            <DevelopersMain {...devTwo} />
            <DevelopersMain {...devThree} /> */}

            <Welcome {...homeObjFour} />
        </>
    );
}

export default Home
