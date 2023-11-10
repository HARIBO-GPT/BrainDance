import { useParams, Link } from 'react-router-dom';


import * as React from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ButtonGroup from '@mui/material/ButtonGroup';

import QuizIcon from '@mui/icons-material/Quiz';
import Stack from '@mui/material/Stack';

import Fab from '@mui/material/Fab';

import '../detail.css'

function Detail(){
    let {id} = useParams();

    return (
        <div>
            <div className="elementViewer" style={{height: "100vh", overflow: "scroll"}}>
                <div>
                    <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                        <Grid item>
                            <b style={{fontSize:"30px"}}>객체지향프로그래밍</b>
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
                    
                    {
                        `- 닭 잡아서 치킨파티 함
                        - 초코볼은 티피가 맛 좋다
                        - 파티에 참석한 키다리 부자
                        - 펄코트 못 받은 척하자
                        - 추운 겨울에는 따뜻한 커피와 티를 마셔야지요
                        - 그는 미쳐서 칼부림하는 인성파탄자일 뿐이다
                        - 동녘 구름 틈새로 퍼지는 햇빛
                        - 해질녘 파도 속의 첨탑
                        - 중공, 천안문, 탱크, 사람하나, 피바다`.split('\n').map((e, i) => (
                            <p className="paragraph">{i + ". " + e.replace('-', '')}</p>
                        ))
                    }
                    
                    <li style={{listStyle: "none"}}>
                        <b style={{fontSize:"20px", marginRight:"20px"}}>요약에 문제가 있나요?</b>
                        
                        <ButtonGroup aria-label="text button group">
                            <Button color="secondary">원본 보이기</Button>
                            <Button color="secondary">다시 요약</Button>
                        </ButtonGroup>
                    </li>
                    
                </div>
                
                <div style={{backgroundColor: "#bbbbd9", width: "45vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                    <h2 style={{textAlign: "left", marginLeft: "20px"}}>키워드를 모아봤어요</h2>

                    {
                        "다중 상속 클래스, nested components, 브레인스토밍, 교수님의 롤 실력".replace(' ,',',').replace(', ',',').split(',').map((e, i) => (
                            <li className="paragraph" style={{paddingBottom:"10px"}}>{e}</li>
                        ))
                    }
                </div>

                <div style={{backgroundColor: "#bbbbd9", width: "45vh", minHeight: "25vh", borderRadius: "30px", paddingTop:"1px" ,paddingBottom: "20px", marginBottom: "20px" }}>
                    <h2 style={{textAlign: "left", marginLeft: "20px"}}>친구와 함께 브레인 댄스!</h2>
                
                </div>

                <div style={{paddingBottom: "100px"}} />

            </div>

            <Box>
                <Fab variant="extended" color="secondary" className="fab">
                    <QuizIcon sx={{ mr: 1 }} />
                    혼자 브레인 댄스!
                </Fab>
            </Box>
        </div>
    );
}

export default Detail;