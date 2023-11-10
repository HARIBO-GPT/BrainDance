import * as React from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import TextField from '@mui/material/TextField';

function Append(){
    const [topic, setTopic] = React.useState('');
    const [textFieldValue, setTextFieldValue] = React.useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
        const newTopic = event.target.value as string;
        setTopic(newTopic);
        setTextFieldValue(newTopic); // Update text field when select changes
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value); // Update text field independently
    };

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
                            <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px", width: "90px"}}>취소</Button>
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
                        label="최종 프롬프트"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        value={textFieldValue}
                        onChange={handleTextFieldChange}
                    />
                </Box>
            </div>

            <div style={{height:"15px"}} />

            <div style={{backgroundColor: "#bbbbd9", width: "45vh", height: "40vh", borderRadius: "30px", paddingTop:"1px"}}>
                <h2 style={{textAlign: "left", marginLeft: "20px"}}>스크립트를 여기에 입력하세요</h2>

                <TextField
                    style={{textAlign: 'left'}}
                    fullWidth
                    multiline
                    rows={10}
                />
            </div>

            <div style={{width: "45vh", borderRadius: "30px", paddingTop:"1px"}}>
                <p>브레인댄스를 제작함으로서 본 앱의 이용 약관 및 인공지능 사용 정책에 동의하는 것입니다.</p>
            </div>

            <Button variant="contained" color="secondary" fullWidth style={{float:"right", marginLeft: "20px"}}>BD 만들기</Button>
        </div>
    );
}

export default Append;
        