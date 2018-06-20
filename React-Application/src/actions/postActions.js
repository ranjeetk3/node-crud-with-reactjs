import { FETCH_POSTS } from './types';

export const fetchPosts = () => dispatch => {
    console.log('fetching')
        fetch('http://localhost:5000/persons',{method:'GET'})
            .then(res => res.json())
            .then(posts => dispatch({
                type: FETCH_POSTS,
                payload: posts
            }));
}
