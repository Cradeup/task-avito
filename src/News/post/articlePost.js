import React from 'react';
import s from './articlePost.module.css'
import { Link } from "react-router-dom"
import { withRouter, } from "react-router";
import { connect } from 'react-redux';
import { fetchArticle, clearState } from '../../actions/artilce-action';
import Comment from '../comments/comment'
class ArticlePost extends React.Component {
    intervalId;

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchArticle(id)
        this.intervalId = setInterval(() => {
            this.props.fetchArticle(id)
        }, 60000);
    }

    componentWillUnmount() {
        this.props.clearState()
        clearInterval(this.intervalId)
    }


    humanizeTime() {
        let a = this.props.article.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }

    render() {
        const id = this.props.match.params.id
        if (this.props.article === null) {
            return <div className={s.loading}>Loading</div>
        }
        let commentsContainer = null;
        if (this.props.article.kids === undefined) {
            commentsContainer = 'There are no comments yet'
        } else {
            const currentArticle = this.props.kids.filter(kid => this.props.article.kids.includes(kid.id))
            commentsContainer = currentArticle.map(comment => <Comment key={comment.id} comment={comment} />);
        }
        const articlePost = this.props.article;
        const time = this.humanizeTime();
        return (
            <div className={s.par}>
                <div className={s.by}>Author: {articlePost.by}</div>
                <h3 className={s.title}>{articlePost.title}</h3>
                <div className={s.time}>{time}</div>
                <div className={s.score}>Rating: {articlePost.score}</div>
                <a className={s.link} href={articlePost.url} target='_blank'>Go to article</a>
                <Link to='/' className={s.link}><div>Back to news list</div></Link>
                <h3 className={s.commentsfront}>Comments: </h3>
                <div>{commentsContainer}</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        article: state.articles.article,
        status: state.articles.status,
        kids: state.articles.kids
    }
}

export default connect(mapStateToProps, { fetchArticle, clearState })(withRouter(ArticlePost));