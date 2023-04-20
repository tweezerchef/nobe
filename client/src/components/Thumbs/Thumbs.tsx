import React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Toolbar } from '@mui/material';

const thumbChange = async (thumb: string) => {
    console.log(thumb);
}

const ThumbComponent = (props: any) => {
    const { bookName } = props;

    return (
        <div className="box">
            <div>
                <Card sx={{ minWidth: 50 }}>
                    <CardContent>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default ThumbComponent;


