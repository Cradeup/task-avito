import Header from './Header/Header';
import News from './News/news';
import s from './App.module.css'
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className={s.App}>
      <div>
        <Header />
        <News />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
