require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers/index");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`Connected to mongodb atlas through ${res.url}`))
  .catch((err) => {
    console.log.error(err);
  });

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.applyMiddleware({ app });
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log("Server started on port 5000"));
