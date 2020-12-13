import { fetchJSON } from '../fetch-json';
import { ARTICLE } from './types';

export const fetchArticle = (id) => dispatch => {
    dispatch ({
        type: ARTICLE.FETCH_ARTICLE
    });
    fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(fetchArticleSuccess(dispatch))
        .catch(fetchArticleFail(dispatch))
}

export const fetchArticleSuccess = dispatch => article => {
    dispatch ({
        type: ARTICLE.FETCH_ARTICLE_SUCCESS,
        payload: article
    })
}

const fetchArticleFail = dispatch => () => {
    dispatch({
        type: ARTICLE.FETCH_ARTICLE_FAIL,
    })
}

export const fetchComment = (id) => dispatch => {
    dispatch ({
        type: ARTICLE.FETCH_COMMENT,
        payload: id
    })
    fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(fetchCommentSuccess(dispatch))
        .catch(fetchCommentFail(dispatch))
}

const fetchCommentSuccess = dispatch => comment => {
    dispatch({
        type: ARTICLE.FETCH_COMMENT_SUCCESS,
        payload: comment
    })
}

const fetchCommentFail = dispatch => () => {
    dispatch({
        type: ARTICLE.FETCH_COMMENT_FAIL,
    })
}

export const openChildren = (id) => dispatch => {
    dispatch({
        type: ARTICLE.OPEN_CHILDREN,
        payload: id
    })
}