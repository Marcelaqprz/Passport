const app = require('./app');
const port = process.env.PORT || 3000;
const routes = require('./routes/auth.route');

app.use('/auth', routes);

app.listen(port, () => console.log(`Listening on localhost:${port}/`));