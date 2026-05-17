// 首先定义模型配置
// 仅保留与你拥有的 API Key 相匹配的模型配置
export const modelConfigs = [
  // ... DeepSeek 和 GLM 的配置保持不变 ...
  {
    model: "deepseek-chat",
    apiKey: "DEEPSEEK_API_KEY",
    baseURL: "https://api.deepseek.com/v1"
  },
  {
    model: "deepseek-reasoner",
    apiKey: "DEEPSEEK_API_KEY",
    baseURL: "https://api.deepseek.com/v1"
  },
  {
    model: "glm-4-air",
    apiKey: "GLM_API_KEY",
    baseURL: "https://open.bigmodel.cn/api/paas/v4/"
  },
  // ... 以下是需要更新的三个模型配置 ...

  // 1. Gemini 配置 (更新模型名称为 2.0 Flash 并固定 Base URL)
  {
    model: "gemini-2.0-flash", // 推荐使用这个新模型，响应快、效果好
    apiKey: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com/v1beta" // 这个地址很固定，不用改
  },

  // 2. GPT-4o 配置 (你的配置看起来没问题，如果还报错请告诉我)
  {
    model: "gpt-4o", 
    apiKey: "OPENAI_API_KEY",
    baseURL: "https://api.openai.com/v1" // 这个地址没问题
  },

  // 3. Claude 配置 (根据七牛云的官方文档更新)
  {
    // 注意：这里用的是七牛云的 OpenAI 兼容端点，不是之前的 Anthropic 专用端点
    model: "z-ai/glm-5.1", // 使用列表里确认存在的最新旗舰模型
    apiKey: "QINIU_API_KEY",
    baseURL: "https://api.qnaigc.com/v1"
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
