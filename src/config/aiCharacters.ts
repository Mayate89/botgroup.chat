// 首先定义模型配置
// 仅保留与你拥有的 API Key 相匹配的模型配置
export const modelConfigs = [
  {
    model: "deepseek-chat", // DeepSeek V3 对话模型
    apiKey: "DEEPSEEK_API_KEY", // 对应你 Cloudflare 环境变量里的名称
    baseURL: "https://api.deepseek.com/v1"
  },
  {
    model: "deepseek-reasoner", // DeepSeek R1 推理模型（可选，如果你想用）
    apiKey: "DEEPSEEK_API_KEY", // 使用同一个 Key
    baseURL: "https://api.deepseek.com/v1"
  },
  {
    model: "glm-4-air", // 智谱 GLM-4 Air 模型
    apiKey: "GLM_API_KEY",
    baseURL: "https://open.bigmodel.cn/api/paas/v4/"
  },
  {
    model: "gemini-1.5-pro", // Gemini 1.5 Pro 模型，模型名可在 Google AI Studio 确认
    apiKey: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com/v1beta" // 注意：Gemini 的 baseURL 比较特殊
  },
  {
    model: "claude-3-opus-20240229", // Claude 3 Opus，如果提示模型不存在，可能需要去七牛云文档查准确名称
    apiKey: "QINIU_API_KEY",
    baseURL: "https://anthropic.qnaigc.com" // 七牛云提供的 Anthropic 兼容端点
  },
  {
    model: "gpt-4o", // OpenAI GPT-4o 模型
    apiKey: "OPENAI_API_KEY",
    baseURL: "https://api.openai.com/v1" // 如果你用的是 OpenAI 官方 Key。如果用中转，请修改此地址。
  }
] as const;

// 定义一个类型，代表所有可用模型的名称
export type ModelType = typeof modelConfigs[number]["model"];

// 定义 AI 角色的接口
export interface AICharacter {
  id: string;
  name: string;
  personality: string;
  model: ModelType;
  avatar?: string;
  custom_prompt?: string;
  tags?: string[];
  stages?: {
    name: string;
    prompt: string;
  }[];
}

// 生成带有群名的角色配置函数
export function generateAICharacters(groupName: string, allTags: string): AICharacter[] {
  return [
    // --- 保留并更新了原有角色 ---
    { 
      id: 'deepseek', 
      name: "DeepSeek", 
      personality: "deepseek",
      model: modelConfigs[0].model, // 指向 deepseek-chat
      avatar: "/img/ds.svg", // 头像路径保持不变，除非你换了图
      custom_prompt: `你是一个名叫"DeepSeek"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理", "编程", "文字游戏", "数学", "信息总结", "聊天"]
    },
    { 
      id: 'glm', 
      name: "智谱", 
      personality: "glm",
      model: modelConfigs[2].model, // 指向 glm-4-air
      avatar: "/img/glm.gif",
      custom_prompt: `你是一个名叫"智谱"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天"]
    },
    // --- 新增的 AI 角色 ---
    {
      id: 'claude',
      name: "Claude",
      personality: "claude",
      model: modelConfigs[4].model, // 指向 claude-3-opus-20240229
      avatar: "🧠", // 用 emoji 作为头像，也可以改成图片路径
      custom_prompt: `你是名为"Claude"的AI助手，以深思熟虑、逻辑严密、富有创造力而著称。你现在在一个叫"${groupName}"的群里，请展现你的洞察力。`,
      tags: ["深度推理", "战略规划", "创意写作", "代码生成", "信息总结"]
    },
    {
      id: 'gemini',
      name: "Gemini",
      personality: "gemini",
      model: modelConfigs[3].model, // 指向 gemini-1.5-pro
      avatar: "🌌",
      custom_prompt: `你是名为"Gemini"的AI助手，由Google打造，善于处理多模态信息和海量数据。你现在在一个叫"${groupName}"的群里。`,
      tags: ["头脑风暴", "信息搜索", "创意灵感", "总结", "聊天"]
    },
    {
      id: 'chatgpt',
      name: "ChatGPT",
      personality: "chatgpt",
      model: modelConfigs[5].model, // 指向 gpt-4o
      avatar: "⚡",
      custom_prompt: `你是名为"ChatGPT"的AI助手，是OpenAI的杰作，以博学、健谈和全面的知识著称。你现在在一个叫"${groupName}"的群里。`,
      tags: ["通用知识", "答疑解惑", "创意写作", "翻译", "聊天"]
    }
  ];
}
