import { LayoutShell } from "@/components/LayoutShell";
import MyProfile from "@/components/profile/MyProfile";

import React from "react";

const page = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col md:flex-row gap-8 w-full md:p-10 font-kuaile">
        {/* 左侧 Profile */}
        <div className="md:w-1/2 w-full flex justify-center">
          <MyProfile />
        </div>

        {/* 右侧 Demo 列表 */}
        <div className="md:w-1/2 w-full space-y-6">
          <h2 className="text-xl font-bold text-white">🔧 我的 Demo</h2>

          <ul className="space-y-4">
            {[
              {
                title: "NFT MarketPlace",
                description:
                  "一个基于ERC20代币作为媒介的NFT交易网站，无需ETH作为燃料",
                href: "/web3demo",
                tags: [
                  "ERC20",
                  "ERC721",
                  "Gasless",
                  "Account Abstract",
                  "Air Drop",
                ],
              },
              {
                title: "AA 账户交互",
                description: "展示如何使用智能合约账户完成 gasless 操作。",
                href: "/demo/aa-account",
              },
              {
                title: "NFT 展示",
                description: "从链上读取 NFT 并展示。",
                href: "/demo/nft-gallery",
              },
              {
                title: "代币转账",
                description: "演示 ERC20 的转账与授权流程。",
                href: "/demo/token-transfer",
              },
            ].map((demo) => (
              <li
                key={demo.title}
                className="p-4 border border-gray-700 rounded-lg hover:shadow-xl transition bg-[#121212] hover:bg-[#1a1a1a]">
                <a
                  href={demo.href}
                  className="block">
                  <h3 className="text-lg font-semibold text-cyan-400">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {demo.description}
                  </p>
                  {demo.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {demo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-cyan-900/20 text-cyan-300 border border-cyan-700/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LayoutShell>
  );
};

export default page;
