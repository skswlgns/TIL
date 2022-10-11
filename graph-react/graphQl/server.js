import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

let tweets = [
    {
        id: '1',
        text: 'first message',
        userId: "3"
    },
    {
        id: '2',
        text: 'second message',
        userId: "2"
    }
]

let users = [
    {
        id: "1",
        firstName: "Ji Hoon",
        lastName: "Kim"
    },
    {
        id: "2",
        firstName: "Gook Ju",
        lastName: "Lee"
    },
    {
        id: "3",
        firstName: "Sang Jun",
        lastName: "Lee"
    }
]

const typeDefs = gql`
    type User {
        id: ID,
        firstName: String,
        lastName: String,
        fullName: String
    }

    type Tweet {
        id: ID!,
        text: String!,
        author: User,
    }

    type Movie {
        id: Int,
        title: String
        year: Int,
        rating: Float,
        runtime: Float,
        genres: [String],
        summary: String
        language: String,
        medium_cover_image: String,
    }

    type Query {
        tweet(id: ID!): Tweet
        user(id: ID!): User
        allUsers: [User]
        allTweets: [Tweet]
        allMovie: [Movie]
        movie(id: String!): Movie
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!,
    }
`

const resolvers = {
    Query: {
        allUsers() {
            return users;
        },
        allTweets() {
            return tweets;
        },
        tweet(_, { id }) {
            return tweets.find((tweet) => tweet.id === id)
        },
        allMovie() {
            return fetch("https://yts.mx/api/v2/list_movies.json")
              .then((response) => response.json())
              .then((json) => json.data.movies)
        },
        movie(_, { id }) {
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
              .then((res) => res.json())
              .then((json) => json.data.movie)
        }
    },
    Mutation: {
        postTweet(_, { text, userId }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
                userId,
            };
            tweets.push(newTweet);
            return newTweet;
        }
    },
    User: {
        fullName({ firstName, lastName, id }) {
            return `${firstName} ${lastName}`
        }
    },
    Tweet: {
        author({ userId }) {
            return users.find((user) => user.id === userId)
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
    console.log(`Run on the ${url}`)
})