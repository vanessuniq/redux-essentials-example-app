import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postAdded} from './postsSlice'

const AddPostForm = () => {
    const [postAttributes, setPostAttributes] = useState({
        title: '',
        content: '',
        userId: ''
    });
    const canSave = Boolean(postAttributes.title) && Boolean(postAttributes.content) && Boolean(postAttributes.userId)

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const onInputChanged = event => setPostAttributes({
        ...postAttributes,
        [event.target.name]: event.target.value
    })

    const onSavePostClicked = () => {
        if (canSave) {
            dispatch(postAdded(postAttributes))

        setPostAttributes({...postAttributes, title: '', content: '', userId: ''})
        } else {
            alert('Author, title and content fields should not be empty')
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))
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
                <label htmlFor="userId">Author:</label>
                <select name="userId" id="userId" value={postAttributes.userId} onChange={onInputChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="content">Content:</label>
                <textarea 
                    name="content" 
                    id="content" 
                    value={postAttributes.content}
                    onChange={onInputChanged}
                />
                <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
}

export default AddPostForm;
