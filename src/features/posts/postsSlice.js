import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const reactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
const initialState = [{
        id: '1',
        title: 'First Post',
        content: 'Hello',
        userId: '1',
        date: sub(new Date(), { minutes: 20 }).toISOString(),
        reactions
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        userId: '2',
        date: sub(new Date(), { minutes: 40 }).toISOString(),
        reactions
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(postAttributes) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        reactions,
                        ...postAttributes
                    }
                }
            }
        },
        postUpdated(state, action) {
            const existingPost = state.find(post => post.id === action.payload.id)
            if (existingPost) {
                existingPost.title = action.payload.title
                existingPost.content = action.payload.content
            }
        },
        reactionAdded(state, action) {
            const { id, reaction } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer