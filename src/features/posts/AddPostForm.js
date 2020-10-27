import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNewPost} from './postsSlice'

const AddPostForm = () => {
    const [postAttributes, setPostAttributes] = useState({
        title: '',
        content: '',
        user: ''
    });
    const {title, content, user} = postAttributes
    const savingStatus = useSelector(state => state.posts.saving)
    const error = useSelector(state => state.posts.error)

    const canSave = [title, content, user].every(Boolean)

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const onInputChanged = event => setPostAttributes({
        ...postAttributes,
        [event.target.name]: event.target.value
    })
    
    const onSavePostClicked = async () => {
        if (canSave) {
            dispatch(addNewPost(postAttributes));
            setPostAttributes({...postAttributes, title: '', content: '', user: ''}) 
            
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))
    return (
        <section>
            <h2>Add a new Post</h2>
            <span style={{color: 'red'}}>{error}</span>
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
                <select name="user" id="userId" value={postAttributes.user} onChange={onInputChanged}>
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
                <button type='button' onClick={onSavePostClicked} disabled={!canSave || savingStatus === 'saving'}>
                    Save Post
                </button>
            </form>
        </section>
    );
}

export default AddPostForm;
