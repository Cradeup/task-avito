import React from 'react';
import Article from './article';
import s from './news.module.css';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: [] };
        this.initializeNews();
    }
    
    initializeNews() {
        this.fetchNews().then(news => this.setState({ news: news }));
    };

    async fetchNews() {
        let response = await (await (fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'))).json();
        return response;
    }

    render() {

        this.state.news.length = 20
        const newsComponents = this.state.news.map(article => <Article article={article} />);
        return <div className={s.newsparrent}>{newsComponents}</div>
    }
}
export default News;