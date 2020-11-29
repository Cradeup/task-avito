import React from 'react';
import s from './article.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"
import ArticlePost from './post/articlePost';
import Footer from '../footer/footer';


class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = { articlePost: null };
        this.props = props.article
        this.initializeStory();
    }
    initializeStory() {
        this.fetchStory().then(articlePost => this.setState({ articlePost: articlePost }))
    }

    async fetchStory() {

        let response = await (await (fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props}.json?print=pretty`))).json()
        return response;
    }

    correctTime() {
        let a = this.state.articlePost.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
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
            return <div>Loading</div>
        }
        else {
            const articleBy = (this.state.articlePost.by)
            const articleScore = (this.state.articlePost.score)
            const time = this.correctTime()
            const artilceTitle = (this.state.articlePost.title)
            const articleid = `/${(this.state.articlePost.id)}`
            const articleurl = (this.state.articlePost.url)
            console.log(articleid)
            return <div className={s.par}>
                <div>{articleid}</div>
                <div className={s.by}>{articleBy}</div>
                <div className={s.score}>Rating: {articleScore}</div>
                <div className={s.time}>{time}</div>
                <div className={s.title}>{artilceTitle}</div>
                <Link to={articleid} activeClassName='activenavelement'><div>Read more....</div></Link>
                
            </div>
        }

    }
}

export default Article;