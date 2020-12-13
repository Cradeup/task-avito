import { combineReducers } from 'redux';
import newsReducer from './reducers/news-reducer'
import articleReducer from './reducers/article-reducer'
export default combineReducers({
    news: newsReducer,  
    articles: articleReducer
})