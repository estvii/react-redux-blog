import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        
        await dispatch(fetchPosts());
        
        // const userIds = _.uniq(_.map(getState().posts, 'userId')); //lodash like mapping for uniq user ids
        // userIds.forEach(id => dispatch(fetchUser(id)));

        // refactoring 9 and 10 using lodash again
        _.chain(getState().posts)
            .map('userId')
            .uniq()
            .forEach( id => dispatch(fetchUser(id)))
            .value(); //executes the chain
    }
}


export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts')
        dispatch({type: 'FETCH_POSTS', payload: response.data})
    };
};

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({type: 'FETCH_USER', payload: response.data });
    }
};

// Memoize Version
// export const fetchUser = (id) => {
//     return (dispatch) => {
//         _fetchUser(id,dispatch);
//     }
// };
// const _fetchUser = _.memoize( async (id,dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
        
//     dispatch({type: 'FETCH_USER', payload: response.data });
// });