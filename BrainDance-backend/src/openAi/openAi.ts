import OpenAI from "openai";
import dotenv from 'dotenv';

import { type InputChatGPT } from "../interface/quiz"

dotenv.config();

const { OPENAI_API_KEY } = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

interface Message {
  role: any;
  content: any;
}

// Type conversion function
const convertToChatCompletionMessageParam = (message: Message): OpenAI.ChatCompletionMessageParam => {
  return {
    role: message.role,
    content: message.content,
    name: 'message',
  };
};

export const chatGPT = async (object: InputChatGPT): Promise<string> => {
  console.log(object)
  const messages: Message[] = [
    {
      role: 'system',
      content:
        'You are an academic teacher. I will provide you with a series of data that includes knowledge on a specific topic. You should tell me the summary and keyword based on this. Give me multiple choice questions for all the questions. You must attach the answer to the question and the intention of the question. You must give all the answers in Korean.'
    },
  ];

  object.userInput +=
    "\n### 요약:  ### 키워드: (콤마로 구분) ### 질문과 답변: (각각 넘버링) (반드시 객관식 문제로 질문) ('- 답변 :') ('- 의도 :') \n 위 템플릿에 맞춰서 해줘\n 반드시 '###'를 요약/키워드/질문과 답변 앞에 붙일 것. () 안의 조건 반드시 만족";
  
  if (object.userInput) {
    messages.push({ role: 'user', content: "Topic: " + object.category + "\n" + object.userInput });
  }
  console.log(messages)
  
  // Convert messages to ChatCompletionMessageParam
  const chatCompletionMessages = messages.map(convertToChatCompletionMessageParam);

  const chatCompletion = await openai.chat.completions.create({
    messages: chatCompletionMessages,
    model: 'gpt-4-1106-preview',
  });
  
  if (typeof chatCompletion.choices[0].message.content === 'string'){
    return chatCompletion.choices[0].message.content;
  }
  return " "
  
};