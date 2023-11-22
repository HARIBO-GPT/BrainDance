import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import QuizIcon from '@mui/icons-material/Quiz';
import Fab from '@mui/material/Fab';
import Spinner from '../effects/spinner';

import '../detail.css'

import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from '../store';

interface ProjectDetailObject {
    projectId: number,
    projectTitle: string,
    createdAt: string,
    originText: string,
    summaryText: string,
    keyword: [string],
    displayName: string
}

interface ProjectQuizObject {
    youtubeUrls: string
}

function Detail(){
    let {id} = useParams();
    let user = useSelector<RootState>((state) => state.user);
    const navigate = useNavigate();

    var userUid: string = user.userUid;
    var userAccessToken: string = user.userIdToken;

    const [showButton, setShowButton] = useState(0);
    const [paraButton, setParaButton] = useState(0);
    const [loading, setLoading] = useState(0);

    const [userObjects, setUserObjects] = useState<ProjectDetailObject>([]);
    const [quizObjects, setQuizObjects] = useState<ProjectQuizObject>({});
    
    useEffect(() => {
        getProjectDetail();
    }, []);

    function getProjectDetail() {
        axios.get("http://localhost:3000/api/project/" + id, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        }).then((response) => {
            setUserObjects(response.data.data);
            axios.get("http://localhost:3000/api/quiz/" + id, {
                headers: { Authorization: `Bearer ${userAccessToken}` }
            }).then((response) => {
                setQuizObjects(response.data.data);
                console.log(response.data.data);
                setLoading(1);
            }).catch((error) => {

            });
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }

    return (
        <div>
            { loading ? (
            <>
            <div className="elementViewer" style={{height: "100vh", overflow: "scroll"}}>
                <img src="/arrow.png" style={{width:"40px",  marginRight: "auto", marginTop: "20px", marginBottom: "10px", display: "block"}}
                onClick={()=>{navigate("/viewer")}} />

                <div style={{width: "45vh", marginBottom: "4vh"}}>
                    <b style={{fontSize:"30px", color:"#DDDDDD"}}>{userObjects.projectTitle}</b>
                </div>

                <div style={{backgroundColor: "#bbbbd9", width: "45vh", minHeight: "25vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                    <h2 style={{textAlign: "left", marginLeft: "20px"}}>새로운 문서 요약본이에요</h2>
                    {
                        paraButton ? (
                            userObjects.summaryText.split('. ').map((obj, i) => userObjects.summaryText.split('. ')[i] != "" && (
                                <>
                                    <li className="paragraph">{userObjects.summaryText.split('. ')[i]}</li>
                                    <div style={{marginBottom:"5px"}} />
                                </>
                            ))
                        )
                        
                        : <p className="paragraph">{userObjects.summaryText}</p>
                    }
                    <div style={{marginBottom:"20px"}} />
                    <div style={{display:"flex", justifyContent: "center"}} >
                    <Button color="secondary" variant="contained" style={{marginLeft: "auto", width: "110px", marginBottom: "10px", display: "block"}}
                    onClick={()=>{setParaButton(1-paraButton);}}>{paraButton ? "문단 전체" : "보기 편하게"}</Button>
                    <Button color="secondary" variant="contained" style={{marginLeft: "10px", marginRight: "30px", marginBottom: "10px", display: "block"}}
                    onClick={()=>{setShowButton(1-showButton);}}>원본 {showButton ? "숨기기" : "보이기"}</Button>
                    
                    
                    </div>
                    
                </div>

                <div style={{height: "10px"}} />

                <Box>
                    <Fab variant="extended" color="inherit" style={{width: "30vh"}} component={Link} to={'/squiz/' + id}>
                        <QuizIcon sx={{ mr: 1 }} />
                        브레인 댄스!
                    </Fab>
                </Box>

                <div style={{height: "30px"}} />

                {
                    showButton ?
                    <div style={{backgroundColor: "#bbbbd9", width: "45vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                        <h2 style={{textAlign: "left", marginLeft: "20px"}}>원본 텍스트에요</h2>
                        
                        {userObjects.originText.split('\n').map((obj, i) => userObjects.originText.split('\n')[i] != "" && (
                            <div>
                                <h3 style={{textAlign: "left", marginLeft: "20px", fontSize: "16px"}}>문단 {i}</h3>
                                <p className="paragraph">{userObjects.originText.split('\n')[i]}</p>
                            </div>
                        ))}
                    </div>
                    

                    : null

                }
                
                <div style={{backgroundColor: "#bbbbd9", width: "45vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                    <h2 style={{textAlign: "left", marginLeft: "20px"}}>키워드를 모아봤어요</h2>
                    
                    {
                        userObjects.keyword ? userObjects.keyword.map((e, i) => (
                            <li className="paragraph" style={{paddingBottom:"10px"}}>{e}</li>
                        )) : null
                    }
                </div>

                <h2 style={{fontSize:"25px", color:"#DDDDDD", textAlign: "left", marginLeft: "5px"}}>관련 영상을 찾았어요</h2>
                
                

                <div style={{paddingBottom: "100px"}} />
                
            </div>
            </>
            ) : 
            <>
                <div>
                    <div style={{height: "10vh"}} />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Spinner />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <p style={{color: "white"}}>정보를 가져오고 있어요</p>
                    </div>
                </div>
            </>
            }
            
        </div>
    );
}

export default Detail;