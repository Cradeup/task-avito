import React from 'react';
import s from './articlePost.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"
import { withRouter, useParams } from "react-router";

class ArticlePost extends React.Component {
    constructor(props) {
        super(props)
        this.state = { articlePost: null };
        this.initializeStory();

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
            return <div>
                <div>{articleid}</div>
                <div className={s.by}>{articleBy}</div>
                <div className={s.score}>Rating: {articleScore}</div>
                <div className={s.time}>{time}</div>
                <div className={s.title}>{artilceTitle}</div>
                <Link to='/' activeClassName='activenavelement'><div>Back to news list</div></Link>

            </div>
        }

    }
}

export default withRouter(ArticlePost);