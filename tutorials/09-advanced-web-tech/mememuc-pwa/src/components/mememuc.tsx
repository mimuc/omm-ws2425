import React from 'react';
import './mememuc.css';
import {
  Card,
  CardActionArea,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Meme from "../model/Meme";
import Caption from "../model/caption";


const MEME_API_BASE_URL = 'http://localhost:3001';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const OmmMemeMUC: React.FC = () => {
  const [selectState, setSelectState] = React.useState<Meme>()
  const [memeState, setMemeState] = React.useState<Meme[]>([
      {
        name: 'doge',
        link: `${MEME_API_BASE_URL}/memes/doge`,
      },
  ])
  const [captionState, setCaptionState] = React.useState<Caption>({
    topText: '', topX: 0, topY: 0,
    bottomText: '', bottomX: 0, bottomY: 0,
  })
  const getMemes = () => {
    fetch(`${MEME_API_BASE_URL}/memes`)
    .then(res => res.json())
    .then((memes: Meme[]) => {
      setMemeState(memes.map(meme => {
        meme.link = `${MEME_API_BASE_URL}${meme.link}`
        return meme
      }))
    })
  }
  const memeURL = () => {
    var meme: Meme = selectState!
    if (!meme) {
      return null
    }
    const url = new URL(meme!.link);
    url.searchParams.append('text', captionState.topText);
    url.searchParams.append('x', captionState.topX.toString());
    url.searchParams.append('y', captionState.topY.toString());
    url.searchParams.append('text2', captionState.bottomText);
    url.searchParams.append('x2', captionState.bottomX.toString());
    url.searchParams.append('y2', captionState.bottomY.toString());
    return url
  }
  const captionChanged = (e: any) => {
    setCaptionState({
      ...captionState,
      [e.target.name]: e.target.value,
    })
  }

  // useEffect for componentDidMount
  // see: https://reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {getMemes()},[])

  let results = (<h3>No Meme Selected</h3>)
  let url = memeURL()
  if (url) {
    results = (<img src={url.toString()} alt="selected"/>)
  }

  // New hook: manages expansion state of position inputs
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (<div className="mememuc">
    <ul className="meme-list">{
        memeState.map((meme) => {
          return (<li key={meme.link} onClick={() => {setSelectState(meme)}}>
            <img src={meme.link} alt="lists"/>
          </li>)
        })
    }</ul>
    <div className="results">
      {results}
    </div>
    <Card className="params" sx={{backgroundColor:"lightgrey"}}>
      <CardActionArea className="texts" sx={{padding:"20px"}}>
        <TextField
            name="topText"
            label="Upper Text"
            value={captionState.topText}
            onChange={captionChanged}
            variant="outlined"
            margin="normal"
        />
        <TextField name="bottomText" label="Lower Text" value={captionState.bottomText} onChange={captionChanged} variant="outlined" margin="normal" />

      </CardActionArea>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show positions"
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardActionArea className="positions">
          <Grid container>
            <Grid xs={6}>
              <TextField name="topX" label="Top X" value={captionState.topX} onChange={captionChanged} variant="outlined" margin="normal" type="number"/>
            </Grid>
            <Grid xs={6}>
              <TextField name="topY" label="Top Y" value={captionState.topY} onChange={captionChanged} variant="outlined" margin="normal" type="number"/>
            </Grid>
            <Grid xs={6}>
              <TextField name="bottomX" label="Bottom X" value={captionState.bottomX} onChange={captionChanged} variant="outlined" margin="normal" type="number"/>
            </Grid>
            <Grid xs={6}>
              <TextField name="bottomY" label="Bottom Y" value={captionState.bottomY} onChange={captionChanged} variant="outlined" margin="normal" type="number"/>
            </Grid>
          </Grid>
        </CardActionArea>
      </Collapse>
    </Card>
  </div>);
};

export default OmmMemeMUC;
