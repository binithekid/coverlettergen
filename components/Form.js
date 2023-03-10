import React, { useState } from "react";
import {
  jobList,
  YearsExperience,
  DescriptionOne,
  DescriptionTwo,
  DescriptionThree,
} from "../data/formData";

const Form = () => {
  const [currentJob, setCurrentJob] = useState("");
  const [desiredJob, setDesiredJob] = useState("");
  const [experience, setExperience] = useState("");
  const [firstDescription, setFirstDescription] = useState("");
  const [secondDescription, setSecondDescription] = useState("");
  const [thirdDescription, setThirdDescription] = useState("");

  const [isLoading, setIsLoading] = useState("");

  const [coverLetter, setCoverLetter] = useState([]);

  const handleSubmtit = (e) => {
    e.preventDefault();

    setIsLoading("Loading");

    const body = {
      currentJob: currentJob,
      desiredJob: desiredJob,
      experience: experience,
      firstDescription: firstDescription,
      secondDescription: secondDescription,
      thirdDescription: thirdDescription,
    };

    try {
      fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setCoverLetter(data.message.split("\n"));
          setIsLoading("Complete");
        });
    } catch (error) {
      console.error(err);
    }
  };

  return (
    <div className='flex w-full mt-16 justify-center items-center flex-col'>
      {isLoading === "" ? (
        <>
          <p className='mb-4'>
            Enter some details about yourself and the job you wish to get
          </p>
          <form
            onSubmit={handleSubmtit}
            className='flex flex-col gap-2 justify-center items-center'>
            <div className='flex flex-col md:flex-row gap-4'>
              <select
                required
                value={currentJob}
                className='p-2 text-sm shadow-md rounded'
                onChange={(e) => setCurrentJob(e.target.value)}>
                <option value=''>Current Job</option>
                {jobList.map((job, i) => (
                  <option key={i} value={job}>
                    {job}
                  </option>
                ))}
              </select>
              <select
                required
                value={desiredJob}
                className='p-2 text-sm shadow-md rounded'
                onChange={(e) => setDesiredJob(e.target.value)}>
                <option value=''>Desired Job</option>
                {jobList.map((job, i) => (
                  <option key={i} value={job}>
                    {job}
                  </option>
                ))}
              </select>
              <select
                required
                value={experience}
                className='p-2 text-sm shadow-md rounded'
                onChange={(e) => setExperience(e.target.value)}>
                <option value=''>Years of experience</option>
                {YearsExperience.map((year, i) => (
                  <option key={i} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <p className='mb-4 mt-4'>Describe yourself in 3 words</p>
            <div className='flex sm:flex-row gap-4 flex-col md:flex-row justify-center'>
              <select
                required
                value={firstDescription}
                className='p-2 text-sm shadow-md rounded'
                onChange={(e) => setFirstDescription(e.target.value)}>
                <option value=''>One</option>
                {DescriptionOne.map((desc, i) => (
                  <option key={i} value={desc}>
                    {desc}
                  </option>
                ))}
              </select>
              <select
                required
                value={secondDescription}
                className='p-2 text-sm shadow-md rounded'
                onChange={(e) => setSecondDescription(e.target.value)}>
                <option value=''>Two</option>
                {DescriptionTwo.map((desc, i) => (
                  <option key={i} value={desc}>
                    {desc}
                  </option>
                ))}
              </select>
              <select
                required
                value={thirdDescription}
                className='p-2 text-sm shadow-md rounded'
                onChange={(e) => setThirdDescription(e.target.value)}>
                <option value=''>Three</option>
                {DescriptionThree.map((desc, i) => (
                  <option key={i} value={desc}>
                    {desc}
                  </option>
                ))}
              </select>
            </div>
            <button
              type='submit'
              className='flex max-w-fit items-center justify-center space-x-2 rounded-full text-white px-5 py-2 text-sm shadow-md hover:bg-gray-600 bg-gray-800 border border-white font-medium transition mt-10 mb-10'>
              <p>Generate cover letter</p>
            </button>
          </form>
        </>
      ) : isLoading === "Loading" ? (
        <div className='flex items-center justify-center flex-col mt-20 mb-32'>
          <div className='loader'></div>
          <p>Your cover letter is loading! This will only take a minute</p>
        </div>
      ) : null}
      {coverLetter.length > 1 && (
        <div className='flex justify-start flex-col bg-white p-4 rounded-sm shadow-sm'>
          {coverLetter.map((para, i) => (
            <p className='py-1 text-left' key={i}>
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;
