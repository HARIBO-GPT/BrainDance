import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from '../store';

function Append(){
    const navigate = useNavigate();

    let user = useSelector<RootState>((state) => state.user);

    var userUid: string = user.userUid;
    var userAccessToken: string = user.userIdToken;

    const [topic, setTopic] = useState('');
    const [rawTopic, setRawTopic] = useState('');
    const [title, setTitle] = useState('');
    const [script, setScript] = useState('');

    const [loading, setLoading] = useState(0);

    const handleSelectChange = (event: SelectChangeEvent) => {
        const newTopic = event.target.value as string;
        setTopic(newTopic);
        setRawTopic(newTopic); // Update text field when select changes
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRawTopic(event.target.value); // Update text field independently
    };

    const titleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const scriptTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScript(event.target.value);
    }

    function appendUserBD() {
        
        // Stage 1
        axios.post("http://localhost:3000/api/project/", {
            "projectTitle": title,
            "originText": script
        }, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        }).then((req1) => {
            axios.post("http://localhost:3000/api/quiz/", {
                "quizRawScript": script,
                "projectId": req1.data.data.projectId,
                "category": rawTopic
            }, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
            }).then((req2) => {
                navigate("/viewer");
            }

            )
        }

        )
        
    }

    return (
        <div>
            <div>
                <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                <Grid item>
                    <b style={{fontSize:"30px", color: "#DDDDDD"}}>브레인댄스 제작</b>
                </Grid>                          
                <Grid item xs>                                 
                    <Grid container direction="row-reverse">      
                        <Grid item>
                            <Button variant="contained" color="secondary"
                            style={{float:"right", marginLeft: "20px", width: "90px"}}
                            component={Link} to={'/viewer'}
                            >취소</Button>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </div>
            {loading ? (
             
            <>
                
                <div style={{marginBottom: "70px"}} />
                <iframe src="https://giphy.com/embed/3cVrqOjd8XUZoHbg82" width="350" height="350" frameBorder="0" />

                <Box sx={{ width: '100%', paddingTop: "20px", paddingBottom: "20px" }}>
                    <LinearProgress color="secondary" />
                </Box>

                <h2 style={{color:"white"}}>인공지능이 정보를 분석하고 있어요</h2>
                <p style={{color:"white"}}>스크립트의 분량에 따라 최대 2분까지 소요될 수 있어요</p>
                <p style={{color:"white"}}>저장된 문서는 로그인하면 언제든 확인할 수 있어요!</p>
            </>

            ) : (

            <>
            <div style={{backgroundColor: "#c4dcea", width: "45vh", height: "26vh", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px", fontSize: "22px", height: "14px"}}>문서 카테고리</h2>
                <h3 style={{textAlign: "left", marginLeft: "20px", fontSize: "14px"}}>주로 어떤 내용으로 이루어져 있나요?</h3>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth color="success" >
                        <InputLabel id="demo-simple-select-label">대화 주제</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={topic}
                        label="대화 주제"
                        onChange={handleSelectChange}
                        >
                        <MenuItem value={'Technology, Programming, Code'}>프로그래밍 및 기술</MenuItem>
                        <MenuItem value={'Math, Science, University'}>수학 및 과학</MenuItem>
                        <MenuItem value={'Language, Society, Speaking'}>언어 및 사회</MenuItem>
                        <MenuItem value={'People, Region, News, Topic'}>인물, 지역, 뉴스</MenuItem>
                        <MenuItem value={'Memo, Conference, Talk, Learn'}>강연장에서 메모</MenuItem>
                        <MenuItem value={'Idea, Brainstorming, Teamwork'}>아이디어 회의</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div style={{paddingTop:"15px"}}></div>

                <Box>
                    <TextField
                        label="사용자화"
                        fullWidth
                        variant="outlined"
                        value={rawTopic}
                        color="success"
                        onChange={handleTextFieldChange}
                    />
                </Box>
            </div>

            <div style={{height:"15px"}} />

            <div style={{backgroundColor: "#B1D1E3", width: "45vh", paddingBottom: "25px", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px", fontSize: "22px"}}>문서 제목</h2>

                <TextField
                    fullWidth
                    onChange = {titleTextFieldChange}
                    color="success"
                    variant = "outlined"
                />
            </div>

            <div style={{height:"15px"}} />

            <div style={{backgroundColor: "#9EC6DC", width: "45vh", paddingBottom:"30px", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px", fontSize: "22px"}}>어떤 내용이든 추가해 보세요</h2>

                <TextField
                    style={{textAlign: 'left'}}
                    fullWidth
                    multiline
                    onChange = {scriptTextFieldChange}
                    variant='outlined'
                    color="success"
                    rows={6}
                />
            </div>

            <div style={{width: "45vh", borderRadius: "30px", paddingTop:"1px"}}
            onClick={()=>{
                // window.open("");
            }}
            >
                <p style={{color:"white", fontSize: "15px"}}>브레인댄스를 제작함으로서 본 앱의 이용 약관 및 인공지능 사용 정책에 동의하는 것입니다.</p>
            </div>

            <Button variant="contained" style={{float:"right", marginBottom: "10vh", marginLeft: "20px", height: "6vh", borderRadius: "20px", fontSize: "19px"}}
            color="secondary"
            fullWidth
            onClick = {()=>{
                if(!title.length){
                    window.alert("문서 제목을 입력해 주세요.");
                } else if(!script.length){
                    window.alert("문서 스크립트를 입력해 주세요.");
                } else if(!rawTopic.length){
                    window.alert("대화의 주제를 선택하거나, 직접 입력해 주세요.");
                } else if(script.length > 3000){
                    window.alert("안정적인 서비스 제공을 위해 스크립트 업로드는 한 번에 3,000자까지 지원하고 있어요.");
                } else {
                    setLoading(1);
                    appendUserBD();
                }
            }}
            >Shall we dance?</Button>
            </>
        
            )}
            
        </div>
    );
}

export default Append;
        