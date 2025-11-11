import React from "react";
import { personalDataObj } from "../../data/data";
import styled from "styled-components";
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const Project = () => {
  return (
    <div id="works" className="container mx-auto mt-16 px-4">
      {/* heading */}
      <div data-aos="fade-up" className="relative mb-5">
        <h3 className="text-3xl font-black text-gray-400 sm:text-2xl">Works</h3>
        <span className="h-[1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>

      <p data-aos="fade-up" className="text-gray-700 font-medium">
        Here are some of my works.
      </p>

      {/* card grid */}
      <div className="mt-8">
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

const ProjectCard = () => {
  return (
    <>
      {personalDataObj?.projects?.map((data) => (
        <div
          data-aos="zoom-in"
          key={data.id}
          className="flex flex-col justify-center items-center gap-4 w-full"
        >
          <POPUP className="relative w-full max-w-[380px] mx-auto">
            
            {/* Image */}
            <div className="h-[260px] w-full rounded-md overflow-hidden shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer">
              <img
                src={data.img}
                alt={data.title}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Popup content */}
            <div className="popup rounded-md p-4">
              <p className="text-gray-900 text-sm leading-6 text-justify w-[90%] mx-auto">
                {data.desc}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <Link
                  to={data.link}
                  target="_blank"
                  className="rounded-md shadow-md p-2 px-3 flex gap-2 items-center justify-center font-medium bg-white"
                >
                  <RxExternalLink className="text-black w-[28px] h-[28px] p-1 border rounded-full" />
                  <p className="text-black">Demo</p>
                </Link>

                <Link
                  to={data.git}
                  target="_blank"
                  className="rounded-md shadow-md p-2 px-3 flex gap-2 items-center justify-center font-medium bg-white"
                >
                  <AiOutlineGithub className="text-black w-[28px] h-[28px] p-1 border rounded-full" />
                  <p className="text-black">Code</p>
                </Link>
              </div>
            </div>
          </POPUP>

          <p className="text-gray-800 text-xl font-medium sm:text-lg text-center">
            {data.title}
          </p>
        </div>
      ))}
    </>
  );
};

const POPUP = styled.div`
  position: relative;

  .popup {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: 0.4s ease;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &:hover .popup {
    opacity: 1;
  }
`;

export default Project;
