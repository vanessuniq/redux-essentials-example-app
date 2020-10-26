import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'First Post', content: 'Hello', userId: '1' },
    { id: '2', title: 'Second Post', content: 'More text', userId: '2' }
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
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer