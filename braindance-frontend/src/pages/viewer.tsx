    import { Link } from 'react-router-dom';
    import React, { useState, useEffect } from 'react';

    import Card from 'react-bootstrap/Card';
    import Button from '@mui/material/Button';
    import ButtonGroup from '@mui/material/ButtonGroup';
    import Box from '@mui/material/Box';

    import Avatar from '@mui/material/Avatar';
    import Grid from '@mui/material/Grid';

    import Fab from '@mui/material/Fab';
    import AddIcon from '@mui/icons-material/AddCircle';
    import CircularProgress from '@mui/material/CircularProgress';

    import '../viewer.css';

    import axios from 'axios';

    
    interface ViewerProps {
        userUid: string;
        userToken: string;
    }

    function Viewer(props: {userUid: string, userToken: string, userImage: string}){
        function dateFormat(date: Date) {
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
    
            month = month >= 10 ? month : '0' + month;
            day = day >= 10 ? day : '0' + day;
            hour = hour >= 10 ? hour : '0' + hour;
            minute = minute >= 10 ? minute : '0' + minute;
            second = second >= 10 ? second : '0' + second;
    
            return date.getFullYear() + '년 ' + month + '월 ' + day + '일 ' + hour + ':' + minute + ':' + second;
        }

        var userUid: string = props.userUid;
        var userAccessToken: string = props.userToken;

        const [userObjects, setUserObjects] = useState<UserObject[]>([]);

        useEffect(() => {
            console.log("Hi")
            getObjectList();
        },[]);

        function getObjectList() {
            axios.get("http://localhost:3000/api/project/", {
                headers: { Authorization: `Bearer ${userAccessToken}` }
                })
                .then((response) => {
                setUserObjects(response.data.data);
                console.log(userObjects);
                })
                .catch((error) => {
                console.error("Error fetching data: ", error);
                });
        }

        // getObjectList();

        return (
            <div>
                <div className="elementViewer" style={{height: "100vh", overflow:"scroll"}}>
                    <div>
                        <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                            <Grid item>
                                <b style={{fontSize:"30px"}}>모든 브레인댄스</b>
                            </Grid>                          
                            <Grid item xs>                                 
                                <Grid container direction="row-reverse">      
                                    <Grid item>
                                        <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px"}}>정렬</Button>
                                        <img src= {props.userImage} width="40px" height="40px"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                        <div>
                            {userObjects.map((obj, i) => (
                                <Card key={i} style={{ backgroundColor: "#cedbf9", width: "45vh", margin: "0 auto", paddingBottom: "20px", marginBottom: "15px", borderRadius: "25px"}}>
                                    <Card.Body>
                                        <Card.Title style={{paddingTop:"22px", paddingLeft:"20px", textAlign:"left", fontWeight:"bold", fontSize:"26px", paddingBottom:"5px"}}>{userObjects[i].projectTitle}</Card.Title>
                                        <Card.Subtitle style={{paddingLeft: "20px", textAlign:"left", paddingRight: "20px"}}>{dateFormat(new Date(userObjects[i].createdAt)) + " · " + userObjects[i].displayName + "님이 만듬"}</Card.Subtitle>
                                        <Card.Text style={{paddingLeft: "20px", textAlign:"left", paddingRight: "20px"}}>
                                        <b>주요 키워드</b>
                                        <br/>{userObjects[i].keyword.join(' · ')}
                                        </Card.Text>
                                        
                                        <table style={{width:"45vh", margin: "0 auto"}}>
                                            <ButtonGroup variant="text" aria-label="outlined primary button group" fullWidth>
                                                <Button component={Link} to={'/squiz/' + userObjects[i].projectId}>퀴즈 풀기</Button>
                                                <Button component={Link} to={'/detail/' + userObjects[i].projectId}>자세히 보기</Button>
                                            </ButtonGroup>
                                        </table>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <div style={{height:"100px"}} />
                </div>
                
                <Box>
                    <Fab variant="extended" color="secondary" className="fab" 
                    component={Link} to={'/append'}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        새로운 노트 추가
                    </Fab>
                </Box>
            </div>
        )
    }

    export default Viewer;