import React from 'react';
import s from './article.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"
import ArticlePost from './articlePost';


class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = { articlePost: null };
    }
    initializeStory() {
        this.fetchStory().then(articlePost => this.setState({ articlePost: articlePost }))
    }

    async fetchStory() {
        let response = await (await (fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.article}.json?print=pretty`))).json()
        return response;
    }

    correctTime() {
        let a = this.state.articlePost.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }

    componentDidMount(){
        this.initializeStory();
    }

    componentDidUpdate(prevProps) {
        if (this.props.article !== prevProps.article || this.state.articlePost === null) {
            this.initializeStory();
        }
    }

    render() {
        // let options = {
        //     root: null,
        //     rootMargins: '0px',
        //     threshold: 0.5, 
        // };
        // const observer = new IntersectionObserver(handleIntersect, options)
        // observer.observe(document.querySelector('Footer'));



        if (this.state.articlePost === null) {
            return <div className={s.loadingpar}>
                <div className={s.loadingcomments}></div>
                <div className={s.loadingid}></div>
                <div className={s.loadingby}></div>
                <div className={s.loadingrating}></div>
                <div className={s.loadingdate}></div>
                <div className={s.loadingtitle}></div>
            </div>
        }

        else {
            const articlePost = this.state.articlePost;
            if (this.state.articlePost.kids === undefined) {
                const commentscount = 0
                const time = this.correctTime()
                // const articleBy = (this.state.articlePost.by)
                // const articleScore = (this.state.articlePost.score)
                // 
                // const artilceTitle = (this.state.articlePost.title)
                const articleid = `/${(this.state.articlePost.id)}`
                // const articleurl = (this.state.articlePost.url)
                return <div className={s.par}>
                    <div>{commentscount} comments</div>
                    <div className={s.id}>{articlePost.id}</div>
                    <div className={s.by}>{articlePost.by}</div>
                    <div className={s.score}>Rating: {articlePost.score}</div>
                    <div className={s.time}>{time}</div>
                    <Link to={articleid} activeClassName='activenavelement'><div>{articlePost.title}</div></Link>

                </div>
            }
            else {
                const commentscount = this.state.articlePost.descendants;
                const time = this.correctTime()
                // const articleBy = (this.state.articlePost.by)
                // const articleScore = (this.state.articlePost.score)
                // 
                // const artilceTitle = (this.state.articlePost.title)
                const articleid = `/${(this.state.articlePost.id)}`
                // const articleurl = (this.state.articlePost.url)
                return <div className={s.par}>
                    <div>{commentscount} comments</div>
                    <div className={s.id}>{articlePost.id}</div>
                    <div className={s.by}>{articlePost.by}</div>
                    <div className={s.score}>Rating: {articlePost.score}</div>
                    <div className={s.time}>{time}</div>
                    <Link to={articleid} activeClassName='activenavelement'><div>{articlePost.title}</div></Link>

                </div>
            }

        }
    }
}
export default Article;