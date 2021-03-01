import React from 'react'
import Welcome from '../../Welcome'
import {homeObjFour, homeObjOne, homeObjThree, multiChatting, multiRooms, messageAbuse, AbusingRules} from '../HomePage/Data'

function Services() {
    return (
<>
            <Welcome {...homeObjThree} />
            <Welcome {...multiChatting} />
            <Welcome {...multiRooms} />
            <Welcome {...messageAbuse} />
            <Welcome {...AbusingRules} />
            <Welcome {...homeObjFour} />
        </>
    );
}

export default Services
