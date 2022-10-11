import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movie from './routes/Movie'
import MovieDetail from './routes/MovieDetail';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Movie />}/>
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  </BrowserRouter>
}

export default App;
