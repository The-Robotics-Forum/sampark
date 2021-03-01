import React from 'react';
import { Link } from 'react-router-dom';
import "./DevelopersMain.css";
import {
    FaTwitter,
    FaLinkedin,
    FaGithub
  } from 'react-icons/fa';
  import Tilt from 'react-vanilla-tilt';

function DevelopersMain({
    img,
    alt,
    devName,
    devDesignation,
    LinkedinUrl,
    TwitterUrl,
    GithubUrl
}) {
    return (
        <>
                    <div className="card">
                        <div className="contents">
                            <div className="imgBx"><img src={img} alt={alt}/></div>
                            <div className="contentBx">
                                <h3>{devName}</h3>
                                <h3><span>{devDesignation}</span></h3>
                            </div>
                        </div>
                        
                        <ul className="sci">
                            <li >
                                <Link className="soc-links"
                                    to={LinkedinUrl}
                                    target='_blank'
                                    aria-label='Facebook'>
                                        <FaLinkedin />
                                </Link>
                            </li>
                        </ul>
                        {/* <ul className="sci">
                            <li >
                                <Link className="soc-links"
                                    to={TwitterUrl}
                                    target='_blank'
                                    aria-label='Facebook'>
                                        <FaTwitter />
                                </Link>
                            </li>
                        </ul>
                        <ul className="sci">
                            <li >
                                <Link className="soc-links"
                                    to={GithubUrl}
                                    target='_blank'
                                    aria-label='Facebook'>
                                        <FaGithub />
                                </Link>
                            </li>
                        </ul> */}
                        
                    </div>
        </>
    );
};

export default DevelopersMain;
