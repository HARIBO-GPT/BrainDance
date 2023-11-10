import { useParams, Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ButtonGroup from '@mui/material/ButtonGroup';

import QuizIcon from '@mui/icons-material/Quiz';
import Stack from '@mui/material/Stack';

import Fab from '@mui/material/Fab';

import '../detail.css'
import axios from 'axios';

function Quiz(props: {userUid: string, userToken: string}){
    let {id} = useParams();

    var userUid: string = props.userUid;
    var userAccessToken: string = props.userToken;

    const [currentNumber, setCurrentNumber] = useState(0);
    var score = 0;

    const [userObjects, setUserObjects] = useState<UserObject[]>([]);

    useEffect(() => {
        console.log("Hi")
        getObjectList();
    },[]);

    function getObjectList() {
        axios.get("http://localhost:3000/api/quiz/" + id, {
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
                                <Button variant="contained" color="secondary" style={{float:"right", marginLeft: "20px", width: "90px"}}
                                component={Link} to={'/viewer'}
                                >포기</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {
                    userObjects ?
                        <div>
                            
                        </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Quiz;