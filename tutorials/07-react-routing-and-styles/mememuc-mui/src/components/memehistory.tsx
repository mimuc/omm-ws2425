import LazyLoadMeme from "./LazyLoadMeme";
import {List, ListItem} from "@mui/material";

const MemeHistory = () => {
    const memesInHistory = [{
        name: "Doge1",
        link: "http://localhost:3001/memes/doge?text=such+meme+generator&text2=so+wow"
    },{
        name: "boromir1",
        link: "http://localhost:3001/memes/boromir?text=one+does+not+simply&text2=create+beautiful+react+apps"
    },{
        name: "Bernie Web Components",
        link: "http://localhost:3001/memes/bernie?text2=why+do+people+use+raw+webcomponents"
    },{
        name: "Buzz Responsive",
        link: "http://localhost:3001/memes/buzz?text=Imagine+a+world&text2=where+all+websites+are+responsive"
    },  {
         name: "I like Work",
        link:"http://localhost:3001/memes/confessionbear?text=I+like+work&text2=avoid+real+life+for+eight+hours"
        },
        {
            name: "Wordpress",
            link:"http://localhost:3001/memes/wonka?text=you+made+a+wordpress+webpage&text2=tell+me+more+about+how+badass+programmer+you+are"
        }];

    return (
    <div>
        <List>
        {memesInHistory.map((meme) =>
            <ListItem>
                <LazyLoadMeme
                    meme={{
                        name: meme.name,
                        link: meme.link
                    }}
                />
            </ListItem>
        )}
        </List>
    </div>);
}

export default MemeHistory;
