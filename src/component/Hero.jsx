import React from "react";
import { AiFillTwitterCircle, AiFillGithub, AiFillInstagram, } from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { TypeAnimation } from "react-type-animation";
import { personalDataObj } from "../data/data";
import resumePDF from '../assets/Resume.pdf'
const Hero = () => {

    const socialProfile = [
        {
            name: 'Github',
            url:'https://github.com/nitinkumar2003',
            icon: <AiFillGithub className=" h-[1.8rem] w-[1.8rem] text-xl hover:scale-125" />
        },
        {
            name: 'Linkdin',
            url:'https://www.linkedin.com/in/nitin-kumar-42026421b',
            icon: <FaLinkedinIn className=" h-[1.8rem] w-[1.8rem] text-xl hover:scale-125" />
        },
        {
            name: 'Leetcode',
            url:'https://leetcode.com/u/Nitinjanmeda/',
            icon: <SiLeetcode className=" h-[1.8rem] w-[1.8rem] text-xl hover:scale-125" />
        },
    ]
    const redirectToUrl = (item) => {
        window.open(item.url, "_blank");
    };

    return (
        <div id="home" className={` bg-gradient-to-r from-green-200 to-blue-200 `}>
            <div className=" container mx-auto pt-5 h-[750px] md:h-[100vh] md:flex-col-reverse sm:h-[780px]  flex sm:flex-col-reverse sm:pt-0 ">
                <div className=" left mt-4 md:mt-0 flex-1 flex flex-col justify-center gap-5 w-1/2 md:w-full md:py-2 sm:py-0">
                    <div className="info w-fit flex flex-col items-start justify-center gap-3 sm:gap-2">
                        <h2 data-aos="fade-up" className=" text-5xl font-bold sm:text-[2rem]"   >
                            Hello, I'm {personalDataObj.name}
                        </h2>
                        <TypeAnimation
                            data-aos="fade-up"
                            sequence={[ "React Developer", 2000, "Web Developer", 2000, "Freelancer", 2000, "",]}
                            speed={30}
                            wrapper="h2"
                            repeat={Infinity}
                            className="text-yellow-500 text-4xl font-bold sm:text-3xl"
                        />
                        {/* <p className=" text-[1.1rem] font-medium w-3/4 md:w-full text-gray-600 sm:text-[.95rem]">Lorem ipsum dolor sit amet consectetur</p> */}
                    </div>
                    <div data-aos="fade-up" className="buttons flex gap-5">
                        <a href="" className=" bg-black text-[1rem] text-white px-10 py-2 sm:px-8 rounded-lg font-bold  hover:text-yellow-500">
                            <span> Hire Me</span>
                        </a>
                        <a
                              href={resumePDF}
                            className="flex items-center gap-2 border- text-[1rem] bg-white border-black px-7 py-2 sm:px-6 rounded-lg font-bold  hover:text-yellow-500"
                            download
                        >
                            <div className="flex items-center gap-1">
                                Resume <FiDownload />
                            </div>
                        </a>
                    </div>
                    <div className="icons flex mt-5">
                        <ul data-aos="fade-up" data-aos-duration="1500" className=" flex gap-5">
                            {socialProfile.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className="cursor-pointer" onClick={()=>redirectToUrl(item)}> {" "} {item.icon}   </a>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>



                <div className="right  top-5 flex-1 flex items-center justify-center md:items-end sm:items-end">
                    <div className="relative h-[88%] w-fit flex items-center sm:items-end">
                        <img
                            data-aos="fade-up"
                            className=" h-[90%]  w-full object-cover md:h-[95%] md:m-auto sm:m-0"
                            src='https://i.postimg.cc/pTn61Gr1/Untitled-design222-modified.png'
                            alt="mine"
                        />
                        <div className=" absolute bottom-10 md:bottom-3 right-8 md:right-2">
                            <div data-aos="zoom-in" data-aos-duration="1000" className=" relative cursor-pointer">
                                <img
                                    className=" w-[135px] md:w-[90px] circle-text"
                                    src="https://ik.imagekit.io/imgkitt/tr:w-400/Full_Stack_Developer2.png?updatedAt=1683134009107"
                                    alt=""
                                />
                                <FaPlay
                                    className=" text-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
