import { gql, useQuery } from '@apollo/client';
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
    {
        allMovie {
            title
            id
        }
        allTweets {
            id
            text
            author {
                fullName
            }
        }
    }
`

function Movie() {
    const { data, loading, error } = useQuery(ALL_MOVIES);
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Check you'r server.</h1>
    }
    return <div>
        <ul>
            {data.allMovie.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
        </ul>
    </div>
}

export default Movie;