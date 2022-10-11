import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_MOVIE = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            id
            title
        }
    }
`

function MovieDetail() {
    const { id } = useParams();
    const { data, loading } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id
        }
    })
    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <h1>{data.movie.title}</h1>
    )
}

export default MovieDetail;