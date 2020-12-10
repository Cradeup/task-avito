import React from 'react';
import s from './comment.module.css'
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = { comment: null };
        this.initializeComment();
    }

    initializeComment() {
        this.fetchComment().then(comment => this.setState({ comment: comment }))
    }

    async fetchComment() {
        let response = await (await (fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.commentId}.json?print=pretty`))).json()
        return response;
    }

    correctTime() {
        let a = this.state.comment.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }

    componentDidUpdate(prevProps) {
        if (this.props.commentId !== prevProps.commentId || this.state.articlePost === null) {
            this.initializeComment();
        }
    }


    render() {
        const { comment } = this.state;
        console.log(this.state.id)
        if (!comment) {
            return <div className={s.loading}>Loading</div>;
        }
        if (comment.text === undefined) {
            return null;
        }

        const children = comment.kids ? comment.kids.map(kid => <Comment commentId={kid} />) : null;
        const time = this.correctTime();
        function createMarkup() {
            return { __html: comment.text };
        }
        return <div className={s.par}>
            <div className={s.time}>{time}</div>
            <div className={s.id}>{comment.id}</div>
            <div className={s.by}>{comment.by}</div>
            <div className={s.text} dangerouslySetInnerHTML={createMarkup()} />
            <div className={s.commentend}></div>
            <div className={s.childComments}>
                {children}
            </div>
        </div>
    }
}

export default Comment;