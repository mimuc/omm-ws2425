import './Meme.css'
import {Component} from "react";

export default class Meme extends Component {
    render() {
        return (
            <div className="meme">
                <img src={this.props.memetemplate}/>
                <p className="caption captionTop">{this.props.captionTop}</p>
                <p className="caption captionBottom">{this.props.captionBottom}</p>
            </div>
        )
    }
};
