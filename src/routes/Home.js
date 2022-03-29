import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";

//userObj는 router에서 전달해준 prop
function Home({ userObj }) {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

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
                        <h4>{tweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
