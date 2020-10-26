import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import { fetchPosts, selectAllPosts } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts())
        }
        
    }, [postStatus, dispatch]);

    let content;

    if (postStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if(postStatus === 'succeeded') {
        const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = sortedPosts.map(post => ( 
            <article className = "post-excerpt" key = { post.id } >
                <h3 > { post.title } </h3> 
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
                <br/><br/>
                <p > { post.content.substring(0, 100) } </p>
                <ReactionButtons post={post}/>
                <Link to = { `/posts/${post.id}` } className = 'button muted-button'>
                    View Post 
                </Link> 
            </article>
        ))
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return ( 
        <section>
            <h2 > Posts </h2> 
            { content } 
        </section>
    );
}

export default PostsList;