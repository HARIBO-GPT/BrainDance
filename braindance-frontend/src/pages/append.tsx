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
                    <b style={{fontSize:"30px"}}>브레인댄스 제작</b>
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

            <div style={{backgroundColor: "#bbbbd9", width: "45vh", height: "25vh", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px"}}>어떤 대화인가요?</h2>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
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
                        </Select>
                    </FormControl>
                </Box>

                <div style={{paddingTop:"15px"}}></div>

                <Box>
                    <TextField
                        label="BD 프롬프트"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        value={rawTopic}
                        onChange={handleTextFieldChange}
                    />
                </Box>
            </div>

            <div style={{height:"15px"}} />

            <div style={{backgroundColor: "#bbbbd9", width: "45vh", paddingBottom: "25px", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px"}}>BD 제목을 지어주세요</h2>

                <TextField
                    fullWidth
                    onChange = {titleTextFieldChange}
                    variant = "outlined"
                />
            </div>

            <div style={{height:"15px"}} />

            <div style={{backgroundColor: "#bbbbd9", width: "45vh", paddingBottom:"30px", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px"}}>스크립트를 여기에 입력하세요</h2>

                <TextField
                    style={{textAlign: 'left'}}
                    fullWidth
                    multiline
                    onChange = {scriptTextFieldChange}
                    rows={6}
                />
            </div>

            <div style={{width: "45vh", borderRadius: "30px", paddingTop:"1px"}}
            onClick={()=>{
                // window.open("");
            }}
            >
                <p>브레인댄스를 제작함으로서 본 앱의 이용 약관 및 인공지능 사용 정책에 동의하는 것입니다.</p>
            </div>

            <Button variant="contained" style={{float:"right", marginBottom: "10vh", marginLeft: "20px"}}
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
                    
                }
                
                // appendUserBD();
                
            }}
            >BD 만들기</Button>
        </div>
    );
}

export default Append;
        