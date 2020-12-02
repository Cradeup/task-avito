import React from 'react';
import s from './news.module.css';
import Article from './post/article';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: [] };
        this.initializeNews();
        setInterval((initializeNews) => {
            this.initializeNews()
        }, 10000);
    }

    
    

    async initializeNews() {
        this.fetchNews().then(news => this.setState({ news: news }))
    }

    async fetchNews() {
        let response = await (await (fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'))).json();
        return response;
    }

    render() {

        console.log(this.state.news)

        this.state.news.length = 20
        const newsComponents = this.state.news.map(article => <Article article={article} />);
        return <div className={s.newsparrent}>{newsComponents}</div>
    }
}
export default News;