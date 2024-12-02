import React from 'react';
import './mememuc.css';

const MEME_API_BASE_URL = 'http://localhost:3001';

interface Meme {
  name: string;
  link: string;
}

interface Caption {
  topText: string
  topX: number
  topY: number
  bottomText: string
  bottomX: number
  bottomY: number
}

const OmmMemeMUC: React.FC = () => {
  // two hooks
  // the two returned variables per hook (here on the example of the section line) represent:
  // - memeState => the list of all rendered memes. To be updated with data from the API, as soon as the user types some caption
  // - setMemeState => a callback that can be used to update the memeState, e.g. when a new rendered meme is received from the API
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

  // method to fetch available meme templates and rendered memes (depending on the passed url parameters)
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
  let url = memeURL()  // here a meme url is built (incorporating template choice and captions) and set as src parameter of the img tag
  if (url) {
    results = (<img src={url.toString()} alt="selected"/>)
  }

  return (<div className="mememuc">
    <ul className="meme-list">
      {/*
      TODO This div should contain a list of all available meme templates (will be shown on the left side of the webapp).
      memeState contains a list of all available templates
      TODO also mind that each meme template should have a onClick listener, calling setSelectState, in order to be selectable
      */}
    </ul>
    <div className="results">
      {/*
      TODO this div should contain the rendered meme (= template + caption), which is received from the API
      */}
    </div>
    <div className="params">
      <div className="texts">
        <input name="topText" value={captionState.topText} onChange={captionChanged} type="text" placeholder="Upper Text"/>
        <input name="bottomText" value={captionState.bottomText} onChange={captionChanged} type="text" placeholder="Lower Text"/>
      </div>
      <div className="positions">
        <input name="topX" value={captionState.topX} onChange={captionChanged} type="number"/>
        <input name="topY" value={captionState.topY} onChange={captionChanged} type="number"/>
        <input name="bottomX" value={captionState.bottomX} onChange={captionChanged} type="number"/>
        <input name="bottomY" value={captionState.bottomY} onChange={captionChanged} type="number"/>
      </div>
    </div>
  </div>);
};

export default OmmMemeMUC;
