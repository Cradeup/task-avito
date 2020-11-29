import Header from './Header/Header';
import News from './News/news';
import s from './App.module.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Article from './News/article';
import ArticlePost from './News/post/articlePost';
import Footer from './footer/footer';


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
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
