import { nanoid } from '@reduxjs/toolkit';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {postAdded} from './postsSlice'

const AddPostForm = () => {
    const [postAttributes, setPostAttributes] = useState({
        title: '',
        content: ''
    });

    const dispatch = useDispatch()

    const onInputChanged = event => setPostAttributes({
        ...postAttributes,
        [event.target.name]: event.target.value
    })

    const onSavePostClicked = () => {
        if (postAttributes.title && postAttributes.content) {
            dispatch(postAdded({
                id: nanoid(),
                ...postAttributes
            }))

        setPostAttributes({...postAttributes, title: '', content: ''})
        } else {
            alert('title and content fields should not be empty')
        }
    }
    return (
        <section>
            <h2>Add a new Post</h2>
            <form >
                <label htmlFor="title">Post Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    value={postAttributes.title}
                    onChange={onInputChanged}
                />
                <label htmlFor="content">Content:</label>
                <textarea 
                    name="content" 
                    id="content" 
                    value={postAttributes.content}
                    onChange={onInputChanged}
                />
                <button type='button' onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    );
}

export default AddPostForm;
