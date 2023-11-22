import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import QuizIcon from '@mui/icons-material/Quiz';
import Fab from '@mui/material/Fab';

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

function Detail(){
    let {id} = useParams();
    let user = useSelector<RootState>((state) => state.user);

    var userUid: string = user.userUid;
    var userAccessToken: string = user.userIdToken;

    const [showButton, setShowButton] = useState(0);

    const [userObjects, setUserObjects] = useState<ProjectDetailObject>([]);

    useEffect(() => {
        getProjectDetail();
    }, []);

    function getProjectDetail() {
        axios.get("http://localhost:3000/api/project/" + id, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        }).then((response) => {
            setUserObjects(response.data.data);
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }

    return (
        <div>
            <div className="elementViewer" style={{height: "100vh", overflow: "scroll"}}>
                <div>
                    <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                        <Grid item>
                            <b style={{fontSize:"35px", marginRight:"10px"}}>{userObjects.projectTitle}</b>
                        </Grid>                          
                        <Grid item xs>                                 
                            <Grid container direction="row-reverse">      
                                <Grid item>
                                    <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px", width: "90px"}}
                                    component={Link} to={'/viewer'}
                                    >뒤로</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div style={{backgroundColor: "#bbbbd9", width: "45vh", minHeight: "25vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                    <h2 style={{textAlign: "left", marginLeft: "20px"}}>새로운 문서 요약본이에요</h2>
                    <p className="paragraph">{userObjects.summaryText}</p>
                    
                    
                    <li style={{listStyle: "none"}}>
                        <b style={{fontSize:"20px", marginRight:"20px"}}>요약에 문제가 있나요?</b>
                        
                        <ButtonGroup aria-label="text button group">
                            <Button color="secondary" onClick={()=>{setShowButton(1-showButton);}}>원본 보이기</Button>
                            <Button color="secondary">다시 요약</Button>
                        </ButtonGroup>
                    </li>
                    
                </div>

                <Box>
                    <Fab variant="extended" color="secondary" component={Link} to={'/squiz/' + id}>
                        <QuizIcon sx={{ mr: 1 }} />
                        혼자 브레인 댄스!
                    </Fab>
                </Box>

                <div style={{height: "50px"}} />

                {
                    showButton ?
                    <div style={{backgroundColor: "#bbbbd9", width: "45vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                        <h2 style={{textAlign: "left", marginLeft: "20px"}}>원본 텍스트에요</h2>
                        <p className="paragraph">{userObjects.originText}</p>
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

                

                

                <div style={{paddingBottom: "100px"}} />
                
            </div>

            
        </div>
    );
}

export default Detail;