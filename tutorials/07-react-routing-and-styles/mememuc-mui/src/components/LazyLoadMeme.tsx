import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Meme from "../model/Meme";
import {Card, CardContent, Typography} from "@mui/material";

export interface LazyLoadMemeProps {
    meme: Meme
}

const LazyLoadMeme = ({meme}: LazyLoadMemeProps) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">{meme.name}</Typography>
                    <LazyLoadImage
                        alt={"some meme"}
                        height={384}
                        src={meme.link}
                        width={512}/>
                </CardContent>
            </Card>
        </>
    )
}

export default LazyLoadMeme;

