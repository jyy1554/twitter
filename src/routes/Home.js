import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

function Home() {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweets"));
        dbTweets.forEach((document) => {
            const tweetObject = {
                ...document.data(),
                id: document.id,
            };
            setTweets((prev) => [tweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getTweets();
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "tweets"), {
            //원하는 데이터 넣기
            tweet,
            createdAt: Date.now(),
        });
        setTweet("");
    };
    const onChange = (e) => {
        const { value } = e.target;
        setTweet(value);
    };
    console.log(tweets);
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
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {tweets.map((tweet) => (
                    <div key={tweet.id}>
                        <h4>{tweet.tweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
