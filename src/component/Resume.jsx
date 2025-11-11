import React from "react";
import { personalDataObj } from "../data/data";

const Resume = () => {
    return (
        <div id="resume" className="container mx-auto px-4 mt-16">
            {/* Heading */}
            <div data-aos="fade-up" className="mb-8">
                <h3 className="text-3xl font-extrabold text-gray-700 sm:text-2xl">
                    Resume
                </h3>
                <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
            </div>

            {/* Subtitle */}
            <p
                data-aos="fade-up"
                className="text-gray-600 font-medium mb-10 max-w-2xl"
            >
                Here are my experiences, qualifications, and achievements.
            </p>

            {/* Grid Layout */}
           {/* Grid Layout */}
<div className="grid grid-cols-1 gap-10">
    
    {/* Experience (LEFT SIDE on md+) */}
    <fieldset
        data-aos="zoom-in"
        className="w-full sm:p-4 bg-white"
    >
        <legend className="px-6 py-1 border rounded-2xl text-yellow-500 font-semibold text-lg">
            Experience
        </legend>

        {personalDataObj.experience.map((item, index) => (
            <Card
                key={index}
                heading={item.profile}
                insName={item.company}
                time={item.time}
                description={item.description}
            />
        ))}
        </fieldset>
  <fieldset
        data-aos="zoom-in"
        className="w-full sm:p-4 bg-white"
    >
        <legend className="px-6  py-1 border rounded-2xl mt-6 text-yellow-500 font-semibold text-lg">
            Certificate
        </legend>
        

        {personalDataObj.certificate.map((item, index) => (
            <Card
                key={index}
                heading={item.cerName}
                insName={item.institute}
                time={item.time}
                description={item.description}
            />
        ))}
    </fieldset>

    {/* Education (RIGHT SIDE on md+) */}
    <fieldset
        data-aos="zoom-in"
        className="w-full sm:p-4 "
    >
        <legend className="px-6 py-1 border rounded-2xl text-yellow-500 font-semibold text-lg">
            Education
        </legend>

        {personalDataObj.education.map((item, index) => (
            <Card
                key={index}
                heading={item.course}
                insName={item.college}
                time={item.time}
                description={item.description}
            />
        ))}
    </fieldset>

</div>

        </div>
    );
};

const Card = ({ heading, insName, time, description }) => {
    return (
        <div className="relative mt-5">
            <div className="flex flex-col gap-2 border border-yellow-200  p-4 rounded-xl bg-white hover:border-yellow-400 hover:shadow-lg transition-all">
                <h1 className="text-xl font-semibold">{heading}</h1>
                <span className="text-gray-500 font-medium">{insName}</span>
                <span className="text-yellow-600 font-semibold">{time}</span>
                <p className="text-gray-600 text-[0.95rem] leading-relaxed text-justify">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Resume;
