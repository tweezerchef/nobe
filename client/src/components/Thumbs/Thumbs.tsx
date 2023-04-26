import React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
let id
user ? (id = user.id) : (id = null);

const ThumbComponent = (props: any) => {
    const { ISBN10 } = props;
    const thumbChange = async (thumb: string) => {
        // console.log(thumb);
        //console.log(ISBN10);
    }

    return (
        <div className="box">
            <div>
                {/* <Card sx={{ minWidth: 50 }}>
                    <CardContent> */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <button onClick={() => thumbChange('thumbsUp')}><ThumbUpOffAltIcon /></button>
                            <div className="likebutton"></div>
                            <button onClick={() => thumbChange('thumbsDown')}><ThumbDownOffAltIcon /></button>
                            <div className="dislikebutton"></div>
                        </Toolbar>
                    </AppBar>
                </Box>
                {/* </CardContent>
                </Card> */}
            </div>
        </div>
    )
}
export default ThumbComponent;


