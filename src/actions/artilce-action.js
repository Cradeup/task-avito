import { fetchJSON } from '../fetch-json';
import { ARTICLE } from './types';

export const fetchArticle = (id) => dispatch => {
    dispatch ({
        type: ARTICLE.FETCH_ARTICLE
    });
    fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(fetchArticleSuccess(dispatch))
        .catch(() => fetchArticleFail(dispatch)(id))
}

export const fetchArticleSuccess = dispatch => article => {
    dispatch ({
        type: ARTICLE.FETCH_ARTICLE_SUCCESS,
        payload: article
    })
}

const fetchArticleFail = dispatch => (id) => {
    dispatch({
        type: ARTICLE.FETCH_ARTICLE_FAIL,
        payload: id
    })
}

export const fetchComment = (id) => dispatch => {
    dispatch ({
        type: ARTICLE.FETCH_COMMENT,
        payload: id
    })
    fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(fetchCommentSuccess(dispatch))
        .catch(() => fetchCommentFail(dispatch)(id))
}

const fetchCommentSuccess = dispatch => comment => {
    dispatch({
        type: ARTICLE.FETCH_COMMENT_SUCCESS,
        payload: comment
    })
}

const fetchCommentFail = dispatch => id => {
    dispatch({
        type: ARTICLE.FETCH_COMMENT_FAIL,
        payload: id
    })
}

export const openChildren = (id) => dispatch => {
    dispatch({
        type: ARTICLE.OPEN_CHILDREN,
        payload: id
    })
}

export const clearState = () => dispatch => {
    dispatch({
        type: ARTICLE.CLEAR_STATE
    })
}