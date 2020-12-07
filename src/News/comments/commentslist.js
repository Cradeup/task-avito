import React from 'react';
import Comment from './comment';

class CommentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { comments: [] };
        this.initializeNews();
        setInterval(() => {
            this.initializeNews()
        }, 10000);
    }

    initializeNews() {
        this.state.comments = this.props.kids
    };

    // async fetchNews() {

    //     let response = await (await (fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props}.json?print=pretty`))).json();
    //     return response;
    // }

    render() {
        if (this.props.kids === undefined) {
            return <div>
            There are no comments yet</div>
        }
        else {
            const commentsList = this.state.comments.map(commentId => <Comment key={commentId} commentId={commentId} />);
            return (<div>{commentsList}
                <div></div>
            </div>
            )
        }
    }
}
export default CommentsList;