import app from './app';
import { createConnection } from './models/db';

createConnection();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
