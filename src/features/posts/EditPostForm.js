import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postUpdated, selectPostById } from './postsSlice';

const EditPostForm = () => {
    const {postId} = useParams()
    const post = useSelector(state => selectPostById(state, postId))
    const [postAttributes, setpostAttributes] = useState(post);
    
    const dispatch = useDispatch()
    const history = useHistory()

    const onInputChanged = event => setpostAttributes({
        ...postAttributes,
        [event.target.name]: event.target.value
    })

    const onUpdatePostClicked = () => {
        if (postAttributes.title && postAttributes.content) {
            dispatch(postUpdated(postAttributes))
            history.push(`/posts/${postId}`)
        } else {
            
        }
    }
    return (
        <section>
            <h2>Edit Post</h2>
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
                <button type='button' onClick={onUpdatePostClicked}>Update Post</button>
            </form>
        </section>
    );
}

export default EditPostForm;
