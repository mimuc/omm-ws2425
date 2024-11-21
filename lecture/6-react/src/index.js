import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import sampleSongs from './songs.json';

class Song extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.song.title}</td>
                <td>{this.props.song.artist}</td>
                <td className="detBtn">
                    <button onClick={
                        () => {
                            this.props.clickHandler(this.props.song);
                        }
                    }>
                        Details
                    </button>
                </td>
            </tr>
        )
    }
}

class SongDetails extends React.Component {
    render() {
        if (this.props.shown) {
            return(
                <>
                    <h1 id='details'>Song Details:</h1>
                    <div className={this.props.shown?'detailsVisible':'detailsHidden'}>
                        <ul>
                            <li>Code: {this.props.song.code}</li>
                            <li>Title: {this.props.song.title}</li>
                            <li>Artist: {this.props.song.artist}</li>
                            <li>Album: {this.props.song.album}</li>
                            <li>Runtime: {this.props.song.runtime}</li>
                        </ul>
                        <button onClick={
                            () => {
                                this.props.hideHandler();
                            }
                        }>
                            Hide Details
                        </button>
                    </div>
                </>
            )
        }
        else
            return null;
    }
}

class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {detailsShown: false, detailSong: null};
    }

    handleDetailsClick = (song) => {
        this.setState({detailsShown: true, detailSong: song});
    }

    handleHideClick = () => {
        this.setState({detailsShown: false, detailSong: null});
    }

    render() {
        return(
            <>
                <table className="songtable">
                    <thead>
                        <tr>
                            <th>Song Title</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.songlist.map(
                            (song, i) => 
                                <Song   key={i} 
                                        song={song} 
                                        clickHandler={this.handleDetailsClick} 
                                />
                        )}  
                    </tbody>                  
                </table>
                <SongDetails 
                    shown={this.state.detailsShown} 
                    song={this.state.detailSong}
                    hideHandler={this.handleHideClick}
                />
            </>
        );
    }
}

// ========================================

ReactDOM.render(
  <Songs songlist={sampleSongs}/>,
  document.getElementById('root')
);

