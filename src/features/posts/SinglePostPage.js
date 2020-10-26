import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor';
import { selectPostById } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';


const SinglePostPage = () => {
    const {postId} = useParams()
    const post = useSelector(state => selectPostById(state, postId))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/><br/><br/>
                <p className='post-content'>{post.content}</p>
                <ReactionButtons post={post}/>
                <Link to={`/editPost/${postId}`} className='button'>
                    Edit Post
                </Link>
            </article>
        </section>
    );
}

export default SinglePostPage;
