import logo from './logo.svg';
import './App.css';
import Meme from './Meme'
import {Component} from "react";

export default class App extends Component {

    state = {
        memes: [
            {template: "https://imgflip.com/s/meme/One-Does-Not-Simply.jpg",
                captionTop:"One does not simply",
                captionBottom: "Write beautiful Javascript"},
            {template: "https://imgflip.com/s/meme/Spiderman-Peter-Parker.jpg",
                captionTop:"It will be fun",
                captionBottom: "I promise"},
            {template: "https://imgflip.com/s/meme/X-X-Everywhere.jpg",
                captionTop:"Callbacks",
                captionBottom: "Callbacks Everywhere"}
        ]
    }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </header>
            {
                this.state.memes.map(aMeme => ( <Meme memetemplate={aMeme.template}
                                                      captionTop={aMeme.captionTop}
                                                      captionBottom={aMeme.captionBottom}> </Meme>))
            }
        </div>
    );
  }
}


