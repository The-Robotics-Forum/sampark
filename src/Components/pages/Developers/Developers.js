import React from 'react';
import DevelopersMain from '../../DevelopersMain';
// import {devOne, devTwo, devThree} from './Data';
import FullStackData from './FullStackData';
import FrontEndData from './FrontEndData';
import BackEndData from './BackEndData';

import '../../DevelopersMain.css'

function Developers(val) {
    return (
        <>
            <div className="outerMostDiv">
                <h2 className="postionHolders">Full-Stack Developers</h2>
                <div className="devCard">
                    
                    <div id="developers"
                        className="containers">
                        
                        {
                            FullStackData.map((val, ind) => {
                            return <DevelopersMain key={ind}
                                    img= {val.img}
                                    alt= {val.alt}
                                    devName= {val.devName} 
                                    devDesignation= {val.devDesignation}
                                    LinkedinUrl= {val.LinkedinUrl}
                                    TwitterUrl= {val.TwitterUrl} 
                                    GithubUrl= {val.GithubUrl} 
                                />
                            })
                        }

                    </div>
                </div>
            </div>

            <div className="outerMostDiv">
                <h2 className="postionHolders">Frontend Developers</h2>
                <div className="devCard">
                    
                    <div id="developers"
                        className="containers">
                        
                        {
                            FrontEndData.map((val, ind) => {
                            return <DevelopersMain key={ind}
                                    img= {val.img}
                                    alt= {val.alt}
                                    devName= {val.devName} 
                                    devDesignation= {val.devDesignation}
                                    LinkedinUrl= {val.LinkedinUrl}
                                    TwitterUrl= {val.TwitterUrl} 
                                    GithubUrl= {val.GithubUrl} 
                                />
                            })
                        }

                    </div>
                </div>
            </div>

            <div className="outerMostDiv">
                <h2 className="postionHolders">Backend Developers</h2>
                <div className="devCard">
                    
                    <div id="developers"
                        className="containers">
                        
                        {
                            BackEndData.map((val, ind) => {
                            return <DevelopersMain key={ind}
                                    img= {val.img}
                                    alt= {val.alt}
                                    devName= {val.devName} 
                                    devDesignation= {val.devDesignation}
                                    LinkedinUrl= {val.LinkedinUrl}
                                    TwitterUrl= {val.TwitterUrl} 
                                    GithubUrl= {val.GithubUrl} 
                                />
                            })
                        }

                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Developers;
