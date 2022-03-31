import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import Tweet from "../components/Tweet";

//userObj는 router에서 전달해준 prop
function Home({ userObj }) {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(() => {
        const q = query(
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "tweets"), {
            //원하는 데이터 넣기
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet("");
    };
    const onChange = (e) => {
        const { value } = e.target;
        setTweet(value);
    };
    const onFileChange = (e) => {
        const { files } = e.target;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            //리스너 만들기
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Tweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
