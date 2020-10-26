import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';


const PostsList = () => {
    const posts = useSelector(state => state.posts)
    const renderedPosts = posts.map(post => ( 
        <article className = "post-excerpt" key = { post.id } >
            <h3 > { post.title } </h3> 
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date}/>
            <br/><br/>
            <p > { post.content.substring(0, 100) } </p> 
            <Link to = { `/posts/${post.id}` } className = 'button muted-button'>
                View Post 
            </Link> 
        </article>
    ))

    return ( 
        <section>
            <h2 > Posts </h2> 
            { renderedPosts } 
        </section>
    );
}

export default PostsList;