import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const { OPENAI_API_KEY } = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

// interface Prompt {
//   role: string
//   content: string
// }

async function chatGPT(userInput, category) {
  const messages = [
    {role: "system", content: "You are an academic teacher. I will provide you with a series of data that includes knowledge on a specific topic. You should tell me the summary and keyword based on this. Give me multiple choice questions for all the questions. You must attach the answer to the question and the intention of the question. You must give all the answers in Korean."}
  ];
  userInput += "\n### 요약:  ### 키워드: (콤마로 구분) ### 질문과 답변: (각각 넘버링) ('- 답변 :') ('- 의도 :') \n 위 템플릿에 맞춰서 해줘\n 반드시 '###'를 요약/키워드/질문과 답변 앞에 붙일 것. () 안의 조건 반드시 만족"

  if (userInput) {
    messages.push({"role": "user", "content": "Topic: " + category + "\n" + userInput});
  }

  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: 'gpt-4-1106-preview',
  });

  console.log(chatCompletion.choices[0].message.content)
}

const a = `
JavaScript Arrays
An array is a special variable, which can hold more than one value:

const cars = ["Saab", "Volvo", "BMW"];
Why Use Arrays?
If you have a list of items (a list of car names, for example), storing the cars in single variables could look like this:

let car1 = "Saab";
let car2 = "Volvo";
let car3 = "BMW";
However, what if you want to loop through the cars and find a specific one? And what if you had not 3 cars, but 300?

The solution is an array!

An array can hold many values under a single name, and you can access the values by referring to an index number.

Creating an Array
Using an array literal is the easiest way to create a JavaScript Array.

Syntax:

const array_name = [item1, item2, ...];      
It is a common practice to declare arrays with the const keyword.

Learn more about const with arrays in the chapter: JS Array Const.

Example
const cars = ["Saab", "Volvo", "BMW"];
Spaces and line breaks are not important. A declaration can span multiple lines:

Example
const cars = [
  "Saab",
  "Volvo",
  "BMW"
];
You can also create an array, and then provide the elements:

Example
const cars = [];
cars[0]= "Saab";
cars[1]= "Volvo";
cars[2]= "BMW";
Using the JavaScript Keyword new
The following example also creates an Array, and assigns values to it:

Example
const cars = new Array("Saab", "Volvo", "BMW");
`
chatGPT(a,"math");

