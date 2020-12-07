import React from 'react';
import s from './articlePost.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"
import { withRouter, useParams } from "react-router";
import CommentsList from '../comments/commentslist';


class ArticlePost extends React.Component {
    constructor(props) {
        super(props)
        this.state = { articlePost: null };
        this.initializeStory();
        setInterval(() => {
            this.initializeStory()
        }, 10000);

    }
    initializeStory() {
        const id = this.props.match.params.id;
        this.fetchStory(id).then(articlePost => this.setState({ articlePost: articlePost }))
    }


    async fetchStory(id) {

        let response = await (await (fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`))).json()
        return response;
    }

    correctTime() {
        let a = this.state.articlePost.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }

    render() {
        const id = this.props.match.params.id
        if (this.state.articlePost === null) {
            return <div>Loading</div>
        }
        else {
            const articlePost = this.state.articlePost;
            const time = this.correctTime();
            // const articleBy = (this.state.articlePost.by)
            // const articleScore = (this.state.articlePost.score)
            // const time = this.correctTime()
            // const artilceTitle = (this.state.articlePost.title)
            // const articleid = `/${(this.state.articlePost.id)}`
            // const articleurl = (this.state.articlePost.url)
            return (
            <div className={s.par}>
                <div className={s.by}>Author: {articlePost.by}</div>
                <h3 className={s.title}>{articlePost.title}</h3>
                <div className={s.time}>{time}</div>
                <div className={s.score}>Rating: {articlePost.score}</div>
                <a href={articlePost.url}>Go to article</a>
                <Link to='/' activeClassName='activenavelement'><div>Back to news list</div></Link>
                <h3 className={s.commentsfront}>Comments: </h3>
                <CommentsList kids={articlePost.kids}/>
                
            </div>)
            
        }

    }
}

export default withRouter(ArticlePost);