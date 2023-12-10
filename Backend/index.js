const mongo=require("./config/mongo");
const express = require('express');
var cors = require('cors')
const app = express();
const port = 50;
app.use(cors());
app.use(express.json());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`INotebook backend listening on port ${port}`)
})