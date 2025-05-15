/* eslint-disable @next/next/no-img-element */
"use client";

import { mintNft } from "@/lib/erc721";
import React, { useState, useRef } from "react";

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const Create_NFT_Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selected: File) => {
    if (!ALLOWED_TYPES.includes(selected.type)) {
      alert("❌ 文件格式错误，只支持常见图片类型！");
      return;
    }

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert("❌ 文件太大，最大支持 10MB");
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("请上传图片文件");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file);

    setSubmitting(true);
    try {
      const res = await mintNft(formData); // 调用封装好的 API 请求

      if (res.success) {
        alert(`✅ NFT 创建成功: ${res.data}`);
      } else {
        alert(`❌ 创建失败: ${res.error}`);
      }
    } catch (err) {
      console.error("❌ 网络错误:", err);
      alert("网络请求失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur text-white">
      <h2 className="text-2xl font-bold text-white text-center">
        🎨 创建你的 NFT
      </h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">名称</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：宇宙猫"
          className="w-full rounded-md bg-slate-800 px-3 py-2 text-sm text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">描述</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="简单介绍一下这张NFT..."
          className="w-full rounded-md bg-slate-800 px-3 py-2 text-sm text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-4 text-center transition-all cursor-pointer ${
          dragActive ? "border-blue-400 bg-blue-900/20" : "border-slate-600"
        }`}>
        <p className="text-sm text-slate-300 mb-2">
          拖拽图片到这里，或点击选择上传
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {previewUrl && (
          <div className="mt-3">
            <img
              src={previewUrl}
              alt="NFT预览"
              className="max-h-60 mx-auto rounded-lg border border-white/20"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold disabled:opacity-50">
        {submitting ? "创建中..." : "🚀 提交创建 NFT"}
      </button>
    </form>
  );
};

export default Create_NFT_Form;
