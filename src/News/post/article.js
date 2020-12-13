import React from 'react';
import s from './article.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"
import { connect } from 'react-redux';
import { fetchArticle } from '../../actions/news-action';


class Article extends React.Component {

    humanizeTime() {
        let a = this.props.article.article.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }

    componentDidMount() {
        this.props.fetchArticle(this.props.article.id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.article !== prevProps.article || this.props.article.article === null) {
        }
    }

    render() {
        if (this.props.article.status === 'loading' || this.props.article.status === 'waiting') {
            return <div className={s.loadingpar}>
                <div className={s.loadingid}></div>
                <div className={s.loadingdate}></div>
                <div className={s.loadingtitle}></div>
                <div className={s.loadingby}></div>
            </div>
        }
        else {
            const articlePost = this.props.article.article;
            if (articlePost.kids === undefined) {
                const commentscount = 0
                const time = this.humanizeTime()
                const articleid = `/${(articlePost.id)}`
                return <Link to={articleid} className={s.parlink}>
                    <div className={s.par}>
                        <div className={s.id}>{articlePost.id}</div>
                        <div className={s.time}>{time}</div>
                        <div>{articlePost.title}</div>
                        <div className={s.by}>{articlePost.by} | Rating: {articlePost.score} </div>
                    </div>
                </Link>
            }
            else {
                const commentscount = this.props.article.article.descendants;
                const time = this.humanizeTime()
                const articleid = `/${(this.props.article.article.id)}`

                return <Link to={articleid} className={s.parlink} >
                    <div className={s.par}>
                        <div className={s.id}>{articlePost.id}</div>
                        <div className={s.time}>{time}</div>
                        <div>{articlePost.title}</div>

                        <div className={s.by}>{articlePost.by} | Rating: {articlePost.score} | {commentscount} comments</div>
                    </div>
                </Link>
            }

        }
    }
    
}
export default connect(null, {fetchArticle})(Article);