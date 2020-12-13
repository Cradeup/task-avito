import React from 'react';
import s from './comment.module.css'
import { connect } from 'react-redux';
import { fetchComment, openChildren } from '../../actions/artilce-action';

class Comment extends React.Component {
    componentDidMount() {
        this.props.fetchComment(this.props.comment.id)
    }

    correctTime() {
        let a = this.props.comment.comment.time;
        let d = new Date(a * 1000);
        let time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        return time
    }

    render() {
        const { comment } = this.props.comment;
        if (!comment) {
            return <div className={s.loading}>Loading</div>;
        }
        if (comment.text === undefined) {
            return null;
        }
        const time = this.correctTime();
        function createMarkup() {
            return { __html: comment.text };
        }
        //i know we should sanitaze it first

        let children = null;
        if (this.props.comment.comment.kids && this.props.comment.comment.kids.length > 0) {
            if (this.props.comment.opened) {
                const currentKids = this.props.kids.filter(kid => this.props.comment.comment.kids.includes(kid.id)) ;
                children = currentKids.map(kid => <WrappedComment key={kid.id} comment={kid} />);
            } else {
                children = <div className={s.childbut} onClick={() => this.props.openChildren(this.props.comment.id)}>▼ {this.props.comment.comment.kids.length} replies</div>;

            }
        }
        return (
            <div className={s.par}>
                <div className={s.time}>{time}</div>
                <div className={s.id}>{comment.id}</div>
                <div className={s.by}>{comment.by}</div>
                <div className={s.text} dangerouslySetInnerHTML={createMarkup()} /> 
                <div className={s.commentend}></div>
                <div className={s.childComments}>
                    {children}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        kids: state.articles.kids
    }
}

const WrappedComment = connect(mapStateToProps, { fetchComment, openChildren })(Comment);

export default WrappedComment;