import { NEWS } from '../actions/types.js'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    j: 10,
    status: 'waiting',
    articles: null
}

export default createReducer(initialState, {
    [NEWS.FETCH_NEWS_IDS]: (state) => {
        state.status = 'loading'
        if (!state.articles) {
            state.articles = [];
        }
    },
    [NEWS.FETCH_NEWS_IDS_SUCCES]: (state, action) => {
        let ids = action.payload
        state.articles = ids.map(id => {
            const article = state.articles.find(article => article.id === id && article.status === 'loaded');
            if (article) {
                return article
            }
            return { id, status: 'waiting', article: null }
        })
        state.status = 'loaded'
    },
    [NEWS.FETCH_NEWS_IDS_FAIL]: (state) => {
        state.status = 'failed'
    },
    [NEWS.FETCH_ARTICLE]: (state, action) => {
        let id = action.payload
        let article = state.articles.find(item => item.id === id)
        if (article) {
            article.status = 'loading'
        }
    },
    [NEWS.FETCH_ARTICLE_SUCCES]: (state, action) => {
        let loadedArticle = action.payload
        let article = state.articles.find(item => item.id === loadedArticle.id)
        if (article) {
            article.article = loadedArticle;
            article.status = 'loaded'
        }
    },
    [NEWS.FETCH_ARTICLE_FAIL]: (state, action) => {
        let loadedArticleId = action.payload
        let article = state.articles.find(item => item.id === loadedArticleId)
        if (article) {
            article.status = 'failed'
        }
    },
    [NEWS.SHOW_MORE_NEWS]: (state, action) => {
        state.j = state.j + 10
    }

})


// export default function (state = initialState, action) {
//     switch (action.type) {
//         case NEWS.FETCH_NEWS_IDS:
//             return { ...state, status: 'loading' }
//         case NEWS.FETCH_NEWS_IDS_SUCCES: {
//             let stateCopy = { ...state }
//             let ids = action.payload
//             stateCopy.articles = ids.map(id => ({ id, status: 'waiting', article: null }))
//             return stateCopy
//         }
//         case NEWS.FETCH_NEWS_IDS_FAIL:
//             return { ...state, status: 'failed' }
//         case NEWS.FETCH_ARTICLE: {
//             let stateCopy = { ...state }
//             let id = action.payload
//             let article = stateCopy.articles.find(item => item.id === id)
//             article.status = 'loading'
//             return stateCopy
//         }
//         case NEWS.FETCH_ARTICLE_SUCCES: {
//             let stateCopy = { ...state, articles: [...state.articles] }
//             let loadedArticle = action.payload
//             let article = stateCopy.articles.find(item => item.id === loadedArticle.id)
//             article.article = loadedArticle;
//             article.status = 'loaded'
//             stateCopy.articles = stateCopy.articles.map(article => {
//                 if (article.id !== loadedArticle.id) {
//                     return article;
//                 }
//                 return {
//                     ...article,
//                     article: loadedArticle,
//                     status: 'loaded'
//                 }
//             })
//             return stateCopy
//         }
//         case NEWS.FETCH_ARTICLE_FAIL: {
//             let stateCopy = { ...state }
//             let loadedArticle = action.payload
//             let article = stateCopy.articles.find(item => item.id === loadedArticle.id)
//             article.status = 'failed'
//             return stateCopy
//         }
//         case NEWS.SHOW_MORE_NEWS: {
//             let stateCopy = { ...state }
//             stateCopy.j = stateCopy.j + 10
//             return stateCopy
//         }
//     }return state;

// }
