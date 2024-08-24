import React from "react";
import { personalDataObj } from "../../data/data";
import styled from "styled-components";
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const Project = () => {
  return (
    <div id="works" className="container m-auto mt-16">
      {/* heading */}
      <div data-aos="fade-up" className="relative mb-5">
        <h3 className="text-3xl font-black text-gray-400 sm:text-2xl">Works</h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>
      <div data-aos="fade-up" className="left flex-1 w-full">
        <p className="text-gray-700 font-medium w-[100%]">  Here are some of my works.  </p>
      </div>
      {/* card */}
      <div className="card-wrapper mx-auto w-[90%] sm:w-fit mt-5">
        <div className="card-box grid grid-cols-3 space-y-5 space-x-5 w-full md:grid-cols-2 sm:gap-8 sm:grid-cols-1 sm:space-y-0 ">
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};


const ProjectCard = () => {
  return <>
    {personalDataObj?.projects?.map((data) => {
      return (
        <div
          data-aos="zoom-in"
          key={data.id}
          className="flex flex-col justify-center items-center gap-4"
        >
          <POPUP className="img-content relative">
            <div className="h-[280px] w-[380px] hover:scale-125 transition duration-500 cursor-pointer shadow-xl rounded-md overflow-hidden sm:h-[260px] sm:w-[92%] sm:bg-cover mx-auto ">
              <img
                src={data.img}
                alt={data.title}
                className=" object-fit w-full h-full hover:scale-125 transition duration-500 cursor-pointer"
              />
            </div>

            <div
              className={` popup w-full  h-[280px] shadow-xl rounded-md overflow-hidden sm:h-[260px] sm:w-[92%] p-4`}
            >
              <p className=" text-gray-900 text-base leading-[1.4] text-justify w-[90%]">
                {data.desc}
              </p>
              <div className=" flex items-center justify-center gap-4">
                <Link
                  to={data.link}
                  target="_blank"
                  className="  mt-3 rounded-md shadow-md p-1 px-2 flex gap-2 items-center justify-center font-medium"
                >
                  <RxExternalLink className=" text-black bg-white rounded-full border  w-[35px] h-[35px] p-2" />
                  <p className=" text-black">Demo</p>
                </Link>
                <br className="w-[2px] bg-white" />
                <Link
                  to={data.git}
                  target="_blank"
                  className="  mt-3 rounded-md shadow-md p-1 px-2 flex gap-2 items-center justify-center font-medium"
                >
                  <AiOutlineGithub className="  text-black bg-white rounded-full border  w-[35px] h-[35px] p-2" />
                  <p className=" text-black">Code</p>
                </Link>
              </div>
            </div>
          </POPUP>
          <p className="text-gray-800 text-xl font-medium sm:text-lg">
            {data.title}
          </p>
        </div>
      );
    })}
  </>
}


const POPUP = styled.div`
  position: relative;
  img {
    &:hover {
      transform: scaleX(2);
    }
  }
  .popup {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    margin: auto;
    transition: 0.5s ease;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .icon {
    color: #fff !important;
  }
  &:hover .popup {
    opacity: 1;
    color: #fff;
  }
`;

export default Project;
