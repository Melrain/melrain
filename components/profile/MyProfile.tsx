"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useProfileLang } from "@/hooks/useProfileLang";
import dynamic from "next/dynamic";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";

const TypewriterEffect = dynamic(
  () => import("../ui/typewriter-effect").then((mod) => mod.TypewriterEffect),
  { ssr: false }
);

const MyProfile = () => {
  const { greeting, description, techTags } = useProfileLang();

  const tagColors = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-lime-500",
    "from-pink-500 to-red-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-violet-500",
    "from-teal-500 to-cyan-500",
    "from-rose-500 to-pink-500",
    "from-emerald-500 to-green-500",
  ];

  const renderDescription = () => {
    return description.map((item, index) =>
      typeof item === "string" ? (
        <React.Fragment key={index}>{item}</React.Fragment>
      ) : (
        <span
          key={index}
          className={`inline-block bg-gray-800 ${item.color} p-2 rounded code-font text-xs md:text-sm`}>
          {item.text}
        </span>
      )
    );
  };

  const words = [{ text: greeting, className: "text-white" }];

  return (
    <div className="w-full relative max-w-3xl px-6 py-10 shadow-blue-500  mx-auto bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#222222] rounded-2xl shadow-xl border border-gray-800">
      {/* social media icons */}
      <div className="absolute top-0 right-0 flex flex-row space-x-2 mt-2 justify-center items-center">
        <FaXTwitter className="text-white md:size-6" />
        <IoLogoWechat className="text-green-500  md:size-6" />
        <FaGithub className="text-white  md:size-6" />
      </div>
      {/* Avatar + Name */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="relative flex items-center justify-center">
            {/* 呼吸灯发光圈 */}
            <div className="absolute inset-0 scale-125 animate-breath rounded-full bg-cyan-500 blur-xl opacity-20" />

            {/* 外部渐变边框圈 */}
            <div className="p-1 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-400">
              <Avatar className="size-28 md:size-40 border-2 border-black">
                <AvatarImage src="./images/avatar2.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <TypewriterEffect words={words} />
      </div>

      {/* Description */}
      <div className="mt-8 text-white text-sm md:text-base leading-relaxed text-center px-4">
        {renderDescription()}
      </div>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {techTags.map((tag, index) => (
          <span
            key={tag}
            className={`px-3 py-1 text-xs md:text-sm  text-white rounded-full border border-gray-700 bg-gradient-to-r ${
              tagColors[index % tagColors.length]
            } hover:scale-105 transition-transform shadow-md`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
