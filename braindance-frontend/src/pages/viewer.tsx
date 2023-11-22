import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/AddCircle';

import '../viewer.css';

import axios from 'axios';

import Spinner from '../effects/spinner';

import { useSelector } from "react-redux";
import { RootState } from '../store';

interface UserObject {
    projectId: number;
    projectTitle: string;
    createdAt: string;
    keyword: [string];
    displayName: string;
}

function Viewer(){
    let user = useSelector<RootState>((state) => state.user);
    
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function dateFormat(date: Date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return date.getFullYear() + '년 ' + month + '월 ' + day + '일 ' + hour + ':' + minute + ':' + second;
    }

    var userUid: string = user.userUid;
    var userAccessToken: string = user.userIdToken;

    const [userObjects, setUserObjects] = useState<UserObject[]>([]);

    useEffect(() => {
        let cachedProjects = localStorage.getItem("userProjects");
        if(cachedProjects != null){
            setLoading(false);
            setUserObjects(JSON.parse(cachedProjects));
        }

        getObjectList();
    }, []);

    function getObjectList() {
        axios.get("http://localhost:3000/api/project/", {
            headers: { Authorization: `Bearer ${userAccessToken}` }
            })
            .then((response) => {
                let userProjects = response.data.data;
                setUserObjects(userProjects);
                localStorage.setItem("userProjects", JSON.stringify(userProjects));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                navigate("/login");
            });
    }

    return (
        <div>
            <div className="elementViewer" style={{height: "100vh"}}>
                <div style={{height: "7vh"}}>
                    <Grid container style={{paddingBottom: "20px", width: "45vh", margin: "0 auto", marginTop:"20px"}}>
                        <Grid item>
                            <b style={{fontSize:"30px", color: "#DDDDDD"}}>모든 문서</b>
                        </Grid>                          
                        <Grid item xs>                                 
                            <Grid container direction="row-reverse">      
                                <Grid item>
                                    <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px"}}>정렬</Button>
                                    <img src={user.userProfileImage} width="40px" height="40px" style={{borderRadius: "20px"}} 
                                    onClick={()=>{
                                        localStorage.clear();
                                        navigate("/login");
                                    }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div style={{height: "88vh", overflow:"scroll", borderRadius: "25px"}}>
                    {loading && (
                        <div>
                            <div style={{height: "10vh"}} />
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Spinner />
                            </div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <p style={{color: "white"}}>내 문서를 가져오고 있어요</p>
                            </div>
                        </div>
                    )}
                    {userObjects.map((obj, i) => (
                        <Card key={i} style={{ backgroundColor: "#94b0da", width: "45vh", margin: "0 auto", paddingBottom: "20px", marginBottom: "15px", borderRadius: "25px"}}>
                            <Card.Body>
                                <Card.Title style={{paddingTop:"22px", paddingLeft:"20px", textAlign:"left", fontWeight:"bold", fontSize:"26px", paddingBottom:"5px"}}>{userObjects[i].projectTitle}</Card.Title>
                                <Card.Subtitle style={{paddingLeft: "20px", textAlign:"left", paddingRight: "20px"}}>{dateFormat(new Date(userObjects[i].createdAt)) + " · " + userObjects[i].displayName + "님이 만듬"}</Card.Subtitle>
                                <Card.Text style={{paddingLeft: "20px", textAlign:"left", paddingRight: "20px"}}>
                                <b>주요 키워드</b>
                                <br/>{userObjects[i].keyword.join(' · ')}
                                </Card.Text>

                                <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                                    <div style={{backgroundColor: "#E86262", width: "20vh", height: "55px", borderRadius: "20px",
                                    display:"flex", justifyContent: "center", alignItems: "center", marginRight: "10px" }}
                                    
                                    onClick={()=>{
                                        navigate('/squiz/' + userObjects[i].projectId);
                                    }}
                                    >

                                        <h1 style={{fontSize: "19px", color: "white"}}>퀴즈 풀기</h1>
                                    </div>

                                    <div style={{backgroundColor: "#5881c2", width: "20vh", height: "55px", borderRadius: "20px",
                                    display:"flex", justifyContent: "center", alignItems: "center" }}
                                    
                                    onClick={()=>{
                                        navigate('/detail/' + userObjects[i].projectId);
                                    }}
                                    >

                                        <h1 style={{fontSize: "19px", color: "white"}}>자세히 보기</h1>
                                    </div>
                                </div>
                                
                            </Card.Body>
                        </Card>
                    ))}
                    <div style={{height:"70px"}} />
                </div>
                <Fab variant="extended" color="secondary" sx={{position: 'sticky', bottom: 40}} 
                component={Link} to={'/append'} >
                    <AddIcon sx={{ mr: 1 }} />
                    <h3>새로운 노트 추가</h3>
                </Fab>
            </div>
            
            
        </div>
    )
}

export default Viewer;