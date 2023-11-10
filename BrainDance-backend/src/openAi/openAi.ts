// import OpenAI from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const { OPENAI_API_KEY } = {
//   OPENAI_API_KEY: process.env.OPENAI_API_KEY
// };

// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY
// });

// interface Message {
//   role: string;
//   content: string;
// }

// export const chatGPT = async (userInput: string): Promise<void> => {
//   console.log(1);
//   console.log(userInput);
//   const messages: Message[] = [
//     {
//       role: 'system',
//       content:
//         'You are an academic teacher. I will provide you with a series of data that includes knowledge on a specific topic. You should tell me the summary and keyword based on this. Give me multiple choice questions for all the questions. You must attach the answer to the question and the intention of the question. You must give all the answers in Korean.',
//     },
//   ];

//   userInput +=
//     "\n### 요약:  ### 키워드: (콤마로 구분) ### 질문과 답변: (각각 넘버링) (반드시 객관식 문제로 질문) ('- 답변 :') ('- 의도 :') \n 위 템플릿에 맞춰서 해줘\n 반드시 '###'를 요약/키워드/질문과 답변 앞에 붙일 것. () 안의 조건 반드시 만족";

//   if (userInput) {
//     messages.push({ role: 'user', content: userInput });
//   }

//   const chatCompletion = await openai.chat.completions.create({
//     messages,
//     model: 'gpt-4-1106-preview',
//   });

//   console.log(chatCompletion.choices[0].message.content);
// }

// const a = `
// 4.1. if Statements
// Perhaps the most well-known statement type is the if statement. For example:

// >>>
// x = int(input("Please enter an integer: "))
// Please enter an integer: 42
// if x < 0:
//     x = 0
//     print('Negative changed to zero')
// elif x == 0:
//     print('Zero')
// elif x == 1:
//     print('Single')
// else:
//     print('More')

// More
// There can be zero or more elif parts, and the else part is optional. The keyword ‘elif’ is short for ‘else if’, and is useful to avoid excessive indentation. An if … elif … elif … sequence is a substitute for the switch or case statements found in other languages.

// If you’re comparing the same value to several constants, or checking for specific types or attributes, you may also find the match statement useful. For more details see match Statements.`;
// // category = "coding"
// // await chatGPT(a);

import OpenAI from "openai";

import dotenv from 'dotenv';

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

export const chatGPT = async (userInput: string): Promise<string> => {

  const messages: Message[] = [
    {
      role: 'system',
      content:
        'You are an academic teacher. I will provide you with a series of data that includes knowledge on a specific topic. You should tell me the summary and keyword based on this. Give me multiple choice questions for all the questions. You must attach the answer to the question and the intention of the question. You must give all the answers in Korean.',
    },
  ];

  userInput +=
    "\n### 요약:  ### 키워드: (콤마로 구분) ### 질문과 답변: (각각 넘버링) (반드시 객관식 문제로 질문) ('- 답변 :') ('- 의도 :') \n 위 템플릿에 맞춰서 해줘\n 반드시 '###'를 요약/키워드/질문과 답변 앞에 붙일 것. () 안의 조건 반드시 만족";
  console.log(1)
  if (userInput) {
    messages.push({ role: 'user', content: userInput });
  }
  console.log(2)
  // Convert messages to ChatCompletionMessageParam
  const chatCompletionMessages = messages.map(convertToChatCompletionMessageParam);
  console.log(3)

  const chatCompletion = await openai.chat.completions.create({
    messages: chatCompletionMessages,
    model: 'gpt-4-1106-preview',
  });
  
  if (typeof chatCompletion.choices[0].message.content === 'string'){
    return chatCompletion.choices[0].message.content;
  }
  return " "
  
};

const a = `
4.1. if Statements
Perhaps the most well-known statement type is the if statement. For example:

>>>
x = int(input("Please enter an integer: "))
Please enter an integer: 42
if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')

More
There can be zero or more elif parts, and the else part is optional. The keyword ‘elif’ is short for ‘else if’, and is useful to avoid excessive indentation. An if … elif … elif … sequence is a substitute for the switch or case statements found in other languages.

If you’re comparing the same value to several constants, or checking for specific types or attributes, you may also find the match statement useful. For more details see match Statements.`;
// category = "coding"
// await chatGPT(a);
