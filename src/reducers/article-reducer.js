import { ARTICLE } from '../actions/types.js'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    status: 'waiting',
    article: null,
    kids: []
}

export default createReducer(initialState, {
    [ARTICLE.FETCH_ARTICLE]: (state) => {
        state.status = 'loading'
    },
    [ARTICLE.FETCH_ARTICLE_SUCCESS]: (state, action) => {
        let article = action.payload
        state.article = article
        state.status = 'loaded'
        if (article.kids) {
            const comments = article.kids.map(kid => ({ id: kid, opened: false, comment: null, status: 'waiting' }))
            state.kids = state.kids.concat(comments)
        }
    },
    [ARTICLE.FETCH_ARTICLE_FAIL]: (state) => {
        state.status = 'failed'
    },
    [ARTICLE.FETCH_COMMENT]: (state, action) => {
        let commentId = action.payload
        let comment = state.kids.find(item => item.id === commentId)
        comment.status = 'loading'
    },
    [ARTICLE.FETCH_COMMENT_SUCCESS]: (state, action) => {
        let loadedComment = action.payload
        let comment = state.kids.find(item => item.id === loadedComment.id)
        comment.comment = loadedComment
        comment.status = 'loaded'
        if (comment.comment.kids) {
            const comments = comment.comment.kids.map(kid => ({ id: kid, opened: false, comment: null, status: 'waiting' }))
            state.kids = state.kids.concat(comments)
        }
    },
    [ARTICLE.FETCH_COMMENT_FAIL]: (state, action) => {
        let loadedComment = action.payload
        let comment = state.kids.find(item => item.id === loadedComment.id)
        comment.status = 'failed'
    },
    [ARTICLE.OPEN_CHILDREN]: (state, action) => {
        let commentId = action.payload
        let comment = state.kids.find(item => item.id === commentId)
        comment.opened = true
    }
})