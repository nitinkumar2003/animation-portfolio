import React from "react";
import { personalDataObj } from "../data/data";
const Resume = () => {
    return (
        <div id="resume" className=" container m-auto   mt-16">
            {/* heading */}
            <div data-aos="fade-up" className="relative mb-5">
                <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
                    Resume
                </h3>
                <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
            </div>
            <div data-aos="fade-up" className="left flex-1 w-full">
                <p className=" text-gray-700 font-medium w-[100%]">
                    Here are my experiences and qualifications.
                </p>
            </div>
            {/* card*/}
            <div className="card-wrapper w-[90%] sm:w-full mt-5 flex md:flex-col sm:gap-5 mx-auto ">
                <div className="left flex-1 flex items-center justify-center">
                    <fieldset data-aos="zoom-in" className=" w-[80%] p-5 py-12 sm:py-8 sm:w-full sm:p-2">
                        <legend className=" w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
                            Experience
                        </legend>
                        {personalDataObj.experience.map((item, index) => {
                            return <Card key={index} heading={item.profile} insName={item.company} time={item.time} description={item.description} />
                        })}
                        <legend className=" m-5 w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
                            Education
                        </legend>
                        {personalDataObj.education.map((item, index) => {
                            return <Card key={index} heading={item.course} insName={item.college} time={item.time} description={item.description} />
                        })}
                    </fieldset>
                </div>
                <div className="right flex-1 flex  justify-center">
                    <fieldset data-aos="zoom-in" className=" w-[80%] p-5 py-12 sm:py-8 sm:w-full sm:p-2">
                        <legend className=" w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
                            Certificate
                        </legend>
                        {personalDataObj.certificate.map((item, index) => {
                            return <Card key={index} heading={item.cerName} insName={item.institute} time={item.time} description={item.description} />
                        })}

                    </fieldset>
                </div>
            </div>
        </div>
    );
};


const Card = ({ heading, insName, time, description }) => {

    return <>
        <div className=" relative">
            <div className=" flex flex-col gap-1 border-2 border-yellow-400 shadow-[0px_0px_16px_1px_rgba(0,0,0,0.1)] p-3 rounded-lg">
                <h1 className="text-[1.4rem] font-semibold sm:text-xl">{heading}</h1>
                <span className=" text-[.9rem] font-semibold text-gray-500 sm:text-base">{insName}</span>
                <span className=" text-[.9rem] font-semibold text-yellow-500 sm:text-base"> {time}</span>
                <p className=" text-[.9rem] text-justify text-gray-500">{description}</p>
            </div>
        </div>
    </>
}
export default Resume;
