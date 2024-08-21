import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {


    const connectObj = [
        { name: 'Telegram', value: 1, url: 'https://t.me/username"', icon: <FaTelegramPlane className=" text-black text-3xl hover:scale-125 cursor-pointer" /> },
        { name: 'WhatsApp', value: 2, url: 'https://wa.me/7078216535?text=Hello%20I%20am%20interested%20in%20your%20service', icon: <IoLogoWhatsapp className=" text-black text-3xl hover:scale-125 cursor-pointer" /> },
        { name: 'Instagram', value: 3, url: 'https://www.instagram.com/n_k__0_3?igsh=Z3ZldHE2bjJ0aWFr', icon: <RiInstagramFill className=" text-black text-3xl hover:scale-125 cursor-pointer" /> },
    ]


    const redirectToUrl = (item) => {
        window.open(item.url, "_blank");
    };
    return (
        <div id="works" className=" mx-auto m-auto h-[300px]  mt-16 sm:h-[250px]">
            <div className=" bg-yellow-400 h-full flex flex-col gap-8 items-center justify-between p-10 sm:p-7">
                <h2
                    data-aos="zoom-out"
                    className=" font-bold text-5xl sm:text-3xl">Let's Talk</h2>
                <div className=" flex items-center justify-center gap-8 sm:gap-5">
                    {connectObj.map((item) => {
                        return <a onClick={() => redirectToUrl(item)} data-aos="fade-up" data-aos-duration="1000" href="" className="box font-medium text-white   flex items-center justify-center flex-col">
                            {item.icon}  <p>{item.name}</p>
                        </a>
                    })}

                </div>
                <div className="sm:text-[12px]">
                    | Copyright &copy; <span>2024 Nk </span> All rights reserved
                    <a href="#"></a> |
                </div>
            </div>
        </div>
    );
};

export default Footer;
