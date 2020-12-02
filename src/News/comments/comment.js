import React from 'react';
import s from './comment.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"  

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = { comment: []};
        this.props = props.kids
        this.initializeStory();
    }
    initializeStory() {
        this.fetchStory().then(comment => this.setState({ comment: comment }))
    }

    async fetchStory() {
        let response = await (await (fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props}.json?print=pretty`))).json()
        return response;
    }

    correctTime() {
        let a = this.state.comment.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }


    render() {
            const comment = this.state.comment;
            const time = this.correctTime()
            const articleid = `/${(this.state.comment.id)}`
            function createMarkup() {
                return { __html: comment.text };
            }
            return <div className={s.par}>
                <div className={s.commentstart}></div>
                <div className={s.id}>{comment.id}</div>
                <div className={s.by}>{comment.by}</div>
                <div className={s.score}>Rating: {comment.score}</div>
                <div className={s.time}>{time}</div>
                <div dangerouslySetInnerHTML={createMarkup()} />
                <Link to={articleid} activeClassName='activenavelement'><div>{comment.title}</div></Link>
                <div className={s.commentend}></div>
            </div>
        }
    }

export default Comment;