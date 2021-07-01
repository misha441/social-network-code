import React from "react";
import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";

let state = {
    posts : [
        {id: 1, message: 'Hi, how are you?', likesCount: 14},
        {id: 2, message: 'It\'s my life', likesCount: 50},
        {id: 3, message: 'Ha-ha-ha', likesCount: 21}
    ]
}

it('new posts length should be longer', () => {
    let action = addPostActionCreator('newMessage');
    let newPosts = profileReducer(state, action);
    expect(newPosts.posts.length).toBe(4);
})

it ('new post message should be correct', () => {
    let action = addPostActionCreator('newMessage');
    let newPosts = profileReducer(state, action);
    expect(newPosts.posts[3].message).toBe('newMessage');
})

it('the message should have been deleted', () => {
    let action = deletePost(1);
    let newPosts = profileReducer(state, action);
    expect(newPosts.posts.length).toBe(2);
})