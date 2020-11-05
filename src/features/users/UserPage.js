import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';

const UserPage = () => {
    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, userId))

    const postsForUser = useSelector(state => selectPostsByUser(state, userId))
    const sortedPosts = postsForUser.slice().sort((a, b) => b.date.localeCompare(a.date))
    const postTitles = sortedPosts.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))
    return (
        <section>
            <h2>{user.username}</h2>
            <ul>{postTitles}</ul>
        </section>
    );
}

export default UserPage;
