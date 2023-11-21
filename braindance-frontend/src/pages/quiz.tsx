import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import HomeButton from '@mui/icons-material/Home';
import Fab from '@mui/material/Fab';

import '../detail.css'

import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from '../store';

interface quizObject {
    quizQuestion: string;
    quizAnswer: string;
    quizComment: string;
}

function Quiz(){
    let {id} = useParams();
    let user = useSelector<RootState>((state) => state.user);

    var userUid: string = user.userUid;
    var userAccessToken: string = user.userIdToken;

    const [currentNumber, setCurrentNumber] = useState(0); // 현재 문제 번호
    const [userScore, setUserScore] = useState(0); // 유저 점수

    const [objectNumber, setObjectNumber] = useState(0); // 총 문제 개수
    const [quizBool, setQuizBool] = useState(0); // 직전 퀴즈 정답 유무

    const [userObjects, setUserObjects] = useState<quizObject[]>([]);
    const [quizData, setQuizData] = useState<string[][]>([]);

    useEffect(() => {
        getObjectList();
    }, []);

    function submitAnswer(myAnswer: string){
        let answer = userObjects[currentNumber].quizAnswer.replace(')','.').split(".")[0].replace(':','').replace(/ /g, '');
        // console.log(answer)
        // console.log(myAnswer)
        if(answer == myAnswer){
            setUserScore(userScore+1); setQuizBool(1);
        } else {
            setQuizBool(0);
        }
        setCurrentNumber(currentNumber+1)

    }

    function getObjectList() {
        axios.get("http://localhost:3000/api/quiz/" + id, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        })
        .then((response) => {
            setUserObjects(response.data.data);
            setObjectNumber(response.data.data.length);

            let soup = []

            for(let i = 0; i < response.data.data.length; i++){
                let qs = []
                for(let j = 0; j < 5; j++){
                    qs.push(response.data.data[i].quizQuestion.split("\n")[j]);
                }

                soup.push(qs);
            }
            
            setQuizData(soup);
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }

    return (
        <div>
            <div>
                <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                    <Grid item>
                        <b style={{fontSize:"33px", marginRight:"10px"}}>{"브레인 댄스!"}</b>
                    </Grid>                          
                    <Grid item xs>                                 
                        <Grid container direction="row-reverse">      
                            <Grid item>
                                {
                                    !currentNumber ?
                                        <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px", width: "90px"}}
                                        component={Link} to={'/viewer'}
                                        >포기</Button>
                                    : null
                                } 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {
                    currentNumber ?
                        <div>
                            <div style={{backgroundColor: "#bbbbd9", width: "45vh", borderRadius: "30px", paddingTop:"1px", paddingBottom: "5px", marginBottom: "20px" }}>
                                <h2 style={{textAlign: "left", marginLeft: "20px"}}>점수: {userScore} / {objectNumber}</h2>
                            </div>

                            <div style={{backgroundColor: "#bbbbd9", width: "45vh", minHeight: "25vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                                <h2 style={{textAlign: "left", marginLeft: "20px"}}>문제 {(currentNumber)} 해설</h2>

                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"18px"}}>{userObjects[currentNumber-1].quizComment}</p>

                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"24px"}}>{quizBool ? "맞았습니다!" : "틀렸습니다!"}</p>

                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"22px"}}>답은 {userObjects[currentNumber-1].quizAnswer}</p>
                            </div>
                        </div>
                    : null
                }

                {
                    userObjects && !(currentNumber === objectNumber) ?
                        <div>
                            <div style={{backgroundColor: "#bbbbd9", width: "45vh", minHeight: "25vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                                <h2 style={{textAlign: "left", marginLeft: "20px"}}>문제 {(currentNumber+1)}</h2>

                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"18px"}}>{quizData[currentNumber][0]}</p>
                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"18px"}}>{quizData[currentNumber][1]}</p>
                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"18px"}}>{quizData[currentNumber][2]}</p>
                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"18px"}}>{quizData[currentNumber][3]}</p>
                                <p style={{marginLeft:"20px", marginRight:"20px", fontSize:"18px"}}>{quizData[currentNumber][4]}</p>

                                <ButtonGroup variant="contained" color="success" aria-label="outlined primary button group" fullWidth sx={{height:"50px"}}>
                                    <Button onClick={()=>{submitAnswer("A")}}>A</Button>
                                    <Button onClick={()=>{submitAnswer("B")}}>B</Button>
                                    <Button onClick={()=>{submitAnswer("C")}}>C</Button>
                                    <Button onClick={()=>{submitAnswer("D")}}>D</Button>
                                </ButtonGroup>

                                <div style={{height:"20px"}}/>
                            </div>
                        </div>
                    : null
                }

                {
                    (currentNumber == objectNumber) ?
                        <div>
                            <Box>
                                <Fab variant="extended" color="secondary" component={Link} to={'/viewer'}>
                                    <HomeButton sx={{ mr: 1 }} />
                                    홈으로 돌아가기
                                </Fab>
                            </Box>
                        </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Quiz;