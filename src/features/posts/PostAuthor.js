import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/usersSlice';

const PostAuthor = ({userId}) => {
    const author = useSelector(state => selectUserById(state, userId))
    return (
        <span>by {author? author.username : 'Unknown author'}</span>
    );
}

export default PostAuthor;
