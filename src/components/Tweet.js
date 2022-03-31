import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

function Tweet({ tweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm(
            "Are you sure you want to delete this tweet?"
        );
        const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`); //리터럴
        const TweetImageRef = ref(storageService, tweetObj.attachmentUrl);

        if (ok) {
            //delete tweet
            await deleteDoc(TweetTextRef);
            await deleteObject(TweetImageRef);
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`); //리터럴
        await updateDoc(TweetTextRef, {
            text: newTweet,
        });
        setEditing(false);
    };
    const onChange = (e) => {
        const { value } = e.target;
        setNewTweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={onChange}
                            type="text"
                            placeholder="Edit your tweet"
                            value={newTweet}
                            required
                        />
                        <input type="submit" value="Update Tweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img
                            src={tweetObj.attachmentUrl}
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Tweet
                            </button>
                            <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Tweet;
