//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/AddCircle';

import '../viewer.css';

function viewer(){
    return (
        <div>
            <div>
                <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                <Grid item>
                    <b style={{fontSize:"30px"}}>모든 브레인댄스</b>
                </Grid>                          
                <Grid item xs>                                 
                    <Grid container direction="row-reverse">      
                        <Grid item>
                            <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px"}}>정렬</Button>
                            <Avatar>H</Avatar>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </div>

            <div className="elementViewer" style={{height: "86vh", overflow: "scroll"}}>
                {[1,2,3,4,5,6,7].map(i => (
                    <Card style={{ backgroundColor: "#cedbf9", width: "48vh", margin: "0 auto", paddingBottom: "20px", marginBottom: "15px", borderRadius: "25px"}}>
                        <Card.Body>
                            <Card.Title style={{paddingTop:"15px", paddingLeft:"20px", textAlign:"left", fontWeight:"bold", fontSize:"23px", paddingBottom:"5px"}}>객체지향프로그래밍</Card.Title>
                            <Card.Subtitle style={{paddingLeft: "20px", textAlign:"left"}}>4일 전 업데이트 · 민서님이 만들었어요!</Card.Subtitle>
                            <Card.Text style={{paddingLeft: "20px", textAlign:"left"}}>
                            <b>주요 키워드</b>
                            <br/>브레인스토밍 · 교수님의 롤 실력 
                            </Card.Text>
                            
                            <table style={{width:"45vh", margin: "0 auto"}}>
                                <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth={true}>
                                    <Button>퀴즈 풀기</Button>
                                    <Button>삭제</Button>
                                    <Button>자세히 보기</Button>
                                </ButtonGroup>
                            </table>
                        </Card.Body>
                    </Card>
                ))}

                
            </div>


            <Box>
                <Fab variant="extended" color="secondary" className="fab">
                    <AddIcon sx={{ mr: 1 }} />
                    새로운 노트 추가
                </Fab>
            </Box>



        </div>
    )
}

export default viewer;