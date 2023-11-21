import { type GPTObjectType, type QuizObjectType } from "../interface/quiz";

export const parsingData = async (processedData: string): Promise<GPTObjectType> => {
    let summaryReady: boolean = false;
    let keywordReady: boolean = false;
    let qnaReady: boolean = false;

    let qnaNumber: number = 0;

    const summaryStr: string = "요약";
    const keywordStr: string = "키워드";
    const qnaStr: string = "질문과 답변";

    const lst: string[] = processedData.split('\n');
    let temp: string = '';

    const gptObject: GPTObjectType = {
        summaryText: null,
        keyword:  null,
        quiz: [],
        youtubeUrls: null
    }

    const quizArray: QuizObjectType[] = [];

    let quizObject: QuizObjectType = {
        quizQuestion: null,
        quizAnswer: null,
        quizComment: null
    }

    const answerPattern: RegExp = /- 답변(.*)/;
    const commentPattern: RegExp = /- 의도(.*)/;

    for (const i of lst){
        if (i.substring(0, 3) === "###") {
            temp = i.substring(3);
            if (temp.includes(summaryStr)) {
                summaryReady = true;
            }
            else if (temp.includes(keywordStr)) {
                keywordReady = true;
            }
            else if (temp.includes(qnaStr)) {
                qnaReady = true;
                qnaNumber++;
            }
        }
        else if (summaryReady){
            gptObject.summaryText = i;
            summaryReady = false;
        }
        else if (keywordReady){
            gptObject.keyword = i;
            keywordReady = false;
        }
        else if (qnaReady){
            if (quizObject.quizAnswer !== null && quizObject.quizComment !== null && quizObject.quizQuestion !== null) {
                quizArray.push(quizObject); // Push the completed quizObject into the quizArray
                quizObject = {
                    quizQuestion: null,
                    quizAnswer: null,
                    quizComment: null
                };
                qnaNumber++;
            }
            if (i.substring(0,2).includes(qnaNumber.toString()) && quizObject.quizQuestion === null){
                quizObject.quizQuestion = i;
            }
            else if (i.substring(0,2) === "  " && !(i.includes("- 답변")) && !(i.includes("- 의도")) &&  quizObject.quizQuestion !== null){
                quizObject.quizQuestion += '\n' + i;
            }
            else if (i.substring(0,2) === "  " && (i.includes("- 답변"))){
                let matchResult = i.match(answerPattern);
                if (matchResult && matchResult.length > 1) {
                    let extractedString: string = matchResult[1];
                    quizObject.quizAnswer = extractedString
                }
            }
            else if (i.substring(0,2) === "  " && (i.includes("- 의도") )){
                let matchResult = i.match(commentPattern);
                if (matchResult && matchResult.length > 1) {
                    let extractedString: string = matchResult[1];
                    quizObject.quizComment = extractedString;
                }
            }
        }
    }
    quizArray.push(quizObject); 
    
    gptObject.quiz = quizArray;
    console.log(gptObject);
    return gptObject;
}
