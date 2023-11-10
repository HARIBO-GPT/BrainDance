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

        </div>
    )
}

export default Quiz;