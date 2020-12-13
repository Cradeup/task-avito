import React from 'react';
import s from './news.module.css';
import { connect } from 'react-redux';
import Article from './post/article';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchNews, showMoreNews } from '../actions/news-action';

class News extends React.Component {
    componentDidMount() {
        if (this.props.status === 'waiting') {
            this.props.fetchNews()
        }

        setInterval(() => this.props.fetchNews(), 60_000);
    }

    showMore() {
        this.props.showMoreNews()
    }



    render() {
        if (this.props.status === 'waiting') {
            return <div>Loading news...</div>
        }
        const newsSliced =  this.props.news.slice(0, this.props.j);
        const newsComponents = newsSliced.map(article => <Article key={article.id} article={article} />);
        return (
            <div className={s.parrent}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.showMore()}
                    hasMore={this.props.status !== 'loading'}
                    loader={<div className="loader" key={0}>Loading ...</div>}>
                    <button className={s.reload} onClick={() => this.props.fetchNews()}>
                        <img className={s.loadingimg} src='https://www.svgrepo.com/show/122109/reload.svg'></img>
                    </button>
                    <div className={s.newsparrent}>{newsComponents}</div>

                </InfiniteScroll>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        news: state.news.articles,
        j: state.news.j,
        status: state.news.status
    }
}
export default connect(mapStateToProps, { fetchNews, showMoreNews })(News);