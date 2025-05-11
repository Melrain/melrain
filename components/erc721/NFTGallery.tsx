"use client";

import { useState } from "react";
import { FaStar, FaShoppingCart, FaTrash } from "react-icons/fa";

type NFTItem = {
  tokenId: string;
  name: string;
  imageUrl: string;
  listed: boolean;
};

// mock 20 个 NFT 项目
const mockNFTs: NFTItem[] = Array.from({ length: 20 }).map((_, i) => ({
  tokenId: String(i + 1),
  name: `Dream NFT #${i + 1}`,
  imageUrl: `/nft${(i % 5) + 1}.png`, // 假设你有 5 张图片
  listed: i % 3 === 0,
}));

const ITEMS_PER_PAGE = 8;

export function NFTGallery() {
  const [nfts, setNfts] = useState<NFTItem[]>(mockNFTs);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(nfts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNFTs = nfts.slice(startIndex, endIndex);

  const toggleListing = async (tokenId: string, list: boolean) => {
    setLoadingId(tokenId);
    setTimeout(() => {
      setNfts((prev) =>
        prev.map((nft) =>
          nft.tokenId === tokenId ? { ...nft, listed: list } : nft
        )
      );
      setLoadingId(null);
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl text-white space-y-6">
      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-500 to-pink-500 p-2 rounded-full shadow-lg">
        <FaStar className="text-white animate-pulse" />
      </div>

      <h2 className="text-2xl font-bold tracking-wide">🖼 我的 NFT 展示柜</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedNFTs.map((nft) => (
          <div
            key={nft.tokenId}
            className="bg-slate-900/60 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-full h-48 object-cover rounded-md mb-3 border border-slate-700"
            />
            <h3 className="text-lg font-semibold">{nft.name}</h3>
            <p className="text-sm text-slate-400">Token ID: {nft.tokenId}</p>

            <button
              className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition ${
                nft.listed
                  ? "bg-gradient-to-r from-red-500 to-pink-500 hover:brightness-110"
                  : "bg-gradient-to-r from-teal-500 to-green-500 hover:brightness-110"
              } disabled:opacity-50`}
              disabled={loadingId === nft.tokenId}
              onClick={() => toggleListing(nft.tokenId, !nft.listed)}>
              {loadingId === nft.tokenId ? (
                "处理中..."
              ) : nft.listed ? (
                <>
                  <FaTrash /> 下架
                </>
              ) : (
                <>
                  <FaShoppingCart /> 上架
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* 分页组件 */}
      <div className="flex justify-center gap-2 pt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40">
          上一页
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-slate-800 hover:bg-slate-700"
            }`}>
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40">
          下一页
        </button>
      </div>
    </div>
  );
}
