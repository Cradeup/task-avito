import Header from './Header/Header';
import News from './News/news';
import s from './App.module.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticlePost from './News/post/articlePost';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  
  return {}
};


function App() {
  return (
    <BrowserRouter>
      <div className={s.App}>
        <div>
          <Header />
          <Switch>
            <Route path="/:id" render={() => <ArticlePost />} />
            <Route path='/' render={() => <News />} />
          </Switch>
          {/* <footer className={s.footer}></footer> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
