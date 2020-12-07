import React from 'react';
import s from './news.module.css';
import Article from './post/article';
import InfiniteScroll from 'react-infinite-scroller';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [], i: 0, j: 10
        };
        this.initializeNews();
        setInterval((initializeNews) => {
            this.initializeNews()
        }, 60000);


    }




    async initializeNews() {
        this.fetchNews().then(news => this.setState({ news: news }))
    }

    async fetchNews() {
        let response = await (await (fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'))).json();
        return response;
    }


    slicing() {
        if (this.state.news.length > 0) {
            this.setState({ j: this.state.j + 10 })
        }

    }


    render() {
        const newsSliced = this.state.news.slice(this.state.i, this.state.j);
        const newsComponents = newsSliced.map(articleId => <Article key={articleId} article={articleId} />);
        return (
            <div className={s.parrent}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.slicing()}
                    hasMore={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}>
                    <div className={s.newsparrent}>{newsComponents}</div>
                </InfiniteScroll>
            </div>

        )
    }
}
export default News;