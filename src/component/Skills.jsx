import React from "react";
import SkillBox from "./SkillBox";
import ProgressBar from "./ProgressBar";
import { IoLogoHtml5, IoLogoCss3, IoLogoSkype, IoLogoJavascript, IoLogoGithub, IoLogoNodejs } from "react-icons/io";
import { SiJavascript, SiTailwindcss, SiMongodb,SiTypescript,SiFirebase,SiEslint, SiExpress, SiBootstrap, SiNextdotjs, SiReact, SiAntdesign, SiNestjs } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { } from "react-icons/si";
const Skills = ({ darkMode }) => {

const skillObj = [
  // 🔹 Core Frontend
  { name: "HTML", percentage: "95", icon: <IoLogoHtml5 /> },
  { name: "CSS", percentage: "85", icon: <IoLogoCss3 /> },
  { name: "JavaScript", percentage: "90", icon: <SiJavascript /> },
  { name: "TypeScript", percentage: "85", icon: <SiTypescript /> },
  { name: "Tailwind CSS", percentage: "80", icon: <SiTailwindcss /> },
  { name: "Bootstrap", percentage: "75", icon: <SiBootstrap /> },

  // 🔹 React Ecosystem
  { name: "React.js", percentage: "95", icon: <FaReact /> },
  { name: "Next.js", percentage: "85", icon: <SiNextdotjs /> },
  { name: "Ant Design (Antd)", percentage: "80", icon: <SiAntdesign /> },

  // 🔹 Backend / Full Stack
  { name: "Node.js", percentage: "70", icon: <IoLogoNodejs /> },
  { name: "Express.js", percentage: "65", icon: <SiExpress /> },
  { name: "NestJS", percentage: "75", icon: <SiNestjs /> },
  { name: "MongoDB", percentage: "60", icon: <SiMongodb /> },
  { name: "Firebase", percentage: "65", icon: <SiFirebase /> },

  // 🔹 Tools & Workflow
  { name: "Git / GitHub", percentage: "95", icon: <IoLogoGithub /> },
  { name: "ESLint", percentage: "85", icon: <SiEslint /> },
];


    const skillObj2 = [
        { name: "React Js", icon: <SiReact /> },
        { name: "Javascript", icon: <IoLogoJavascript /> },
        { name: "CSS", icon: <IoLogoCss3 /> },
        { name: "Github", icon: <IoLogoGithub /> },
    ]
    const skillObj3 = [
        { name: "Next Js", icon: <SiNextdotjs className=" text-white bg-black rounded-full h-fit border-white overflow-hidden" /> },
        { name: "HTML", icon: < IoLogoHtml5 /> },
        { name: "Bootstrap", icon: <SiBootstrap /> },
        { name: "Express Js", icon: <SiExpress /> },
    ]



    return (
        <div id="skills">
            <div className=" container m-auto  mt-16">
                {/* heading */}
                <div data-aos="fade-up" className="relative mb-5">
                    <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl"> My Skills</h3>
                    <span className="h-[1.1px] right-0 absolute w-[90%] bg-gray-300 block"></span>
                </div>
                {/* content*/}

                <div className="flex md:flex-col">
                    <div className="left flex-1 w-full">
                        <p data-aos="fade-up" className="text-gray-700 font-medium w-full">
                            Here are my skills.
                        </p>


                    </div>
                    {/* </div> */}

                    {/* right box */}
                    {/* <div className="right relative flex-1 flex flex-wrap p-5 gap-10 items-center justify-center sm:w-full">
                        <div className="first2 flex flex-col gap-10">
                            {skillObj2.map((item) => {
                                return <SkillBox
                                    logo={item.icon}
                                    black={"white"}
                                    white={"black"}
                                    skill={item.name}
                                />
                            })}
                        </div>
                        <div className="last2 flex flex-col gap-10">
                            {skillObj3.map((item) => {
                                return <SkillBox
                                    logo={item.icon}
                                    black={"black"}
                                    white={"white"}
                                    skill={item.name}
                                />
                            })}
                        </div>
                    </div> */}

                </div>
                {/* Progress Bars */}
                <div data-aos="zoom-in" className="progress flex items-center h-full justify-end md:justify-center">
                    <div className="grid grid-cols-2 gap-6 w-3/4 my-5 md:w-[90%]">
                        {skillObj.map((item, index) => (
                            <ProgressBar key={index} logo={item.icon} name={item.name} value={item.percentage} />
                        ))}
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Skills;
