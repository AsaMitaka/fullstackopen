const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const PORT = 3000;

const users = [
  { id: '1', username: 'user1', age: 21 },
  { id: '2', username: 'user2', age: 22 },
  { id: '3', username: 'user3', age: 24 },
];

const app = express();
app.use(cors());

const createUser = (input) => {
  const id = Date.now();

  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    const user = users.find((user) => user.id == id);

    return user;
  },
  createUser: ({ input }) => {
    const user = createUser(input);

    users.push(user);
    return user;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
