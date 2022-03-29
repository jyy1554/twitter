import React, { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";

function Home() {
    const [tweet, setTweet] = useState("");
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
        </div>
    );
}

export default Home;
