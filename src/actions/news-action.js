import { fetchJSON } from '../fetch-json';
import { NEWS } from './types';

export const fetchNews = () => dispatch => {
    dispatch({
        type: NEWS.FETCH_NEWS_IDS
    });
    fetchJSON('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(newsFetchSucces(dispatch))
        .catch(newsFetchFail(dispatch));
}


export const newsFetchSucces = dispatch => newsIds => {
    dispatch({
        type: NEWS.FETCH_NEWS_IDS_SUCCES,
        payload: newsIds
    })
}

export const newsFetchFail = dispatch => () => {
    dispatch({
        type: NEWS.FETCH_NEWS_IDS_FAIL
    })
}

export const fetchArticle = (id) => dispatch => {
    dispatch({
        type: NEWS.FETCH_ARTICLE,
        payload: id
    });
    tryFetchArticle(id)
        .then(fetchArticleSucces(dispatch))
        .catch(() => fetchArticleFail(dispatch)(id));

}

export const fetchArticleSucces = dispatch => (article) => {
    dispatch({
        type: NEWS.FETCH_ARTICLE_SUCCES,
        payload: article
    })
}

export const fetchArticleFail = dispatch => (id) => {
    dispatch({
        type: NEWS.FETCH_ARTICLE_FAIL,
        payload: id
    })
}

export const showMoreNews = () => dispatch => {
    dispatch({
        type: NEWS.SHOW_MORE_NEWS,
    })
}

async function tryFetchArticle(id) {
    let article
    do {
        article = await (fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        if (article) {
            return article;
        }
        timer(1000);
    } while (!article)
}
// we need to check article until server responses truth bacause sometimes server responses null on  article wich is really exists

function timer(interval) {
    return new Promise((resolve) =>
        setInterval(() => resolve(), interval)
    )
}