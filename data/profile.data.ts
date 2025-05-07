export interface IntroPiece {
  text: string;
  highlight?: boolean;
  color?: string;
}

export interface ProfileData {
  greeting: string;
  description: (string | IntroPiece)[];
  techTags: string[];
}

export const profileData: Record<"zh" | "en", ProfileData> = {
  zh: {
    greeting: "你好，我是MelRain",
    description: [
      "专注于构建 ",
      { text: "去中心化应用", highlight: true, color: "text-indigo-400" },
      "，熟悉 ",
      { text: "Next.js", highlight: true, color: "text-green-400" },
      { text: "NestJS", highlight: true, color: "text-red-400" },
      { text: "WebSocket", highlight: true, color: "text-yellow-400" },
      " 等技术。",
      "当前项目展示了 ",
      { text: "钱包登录", highlight: true, color: "text-blue-400" },
      "、",
      { text: "AA 账户", highlight: true, color: "text-emerald-400" },
      "、",
      { text: "代币/NFT 操作", highlight: true, color: "text-pink-400" },
      " 等模块。",
      "欢迎联系我，探索更多技术合作。",
    ],
    techTags: ["AA账户", "Gasless", "NFT", "ERC20", "Solidity", "TON"],
  },
  en: {
    greeting: "Hi, I'm MelRain",
    description: [
      "Focused on building ",
      {
        text: "decentralized applications",
        highlight: true,
        color: "text-indigo-400",
      },
      ". Skilled in ",
      { text: "Next.js", highlight: true, color: "text-green-400" },
      { text: "NestJS", highlight: true, color: "text-red-400" },
      { text: "WebSocket", highlight: true, color: "text-yellow-400" },
      ".",
      "This site showcases features like ",
      { text: "wallet login", highlight: true, color: "text-blue-400" },
      ", ",
      { text: "AA accounts", highlight: true, color: "text-emerald-400" },
      ", and ",
      {
        text: "NFT/token interactions",
        highlight: true,
        color: "text-pink-400",
      },
      ".",
      "Feel free to reach out for tech collaboration.",
    ],
    techTags: ["AA", "Gasless", "NFT", "ERC20", "Solidity", "TON"],
  },
};
