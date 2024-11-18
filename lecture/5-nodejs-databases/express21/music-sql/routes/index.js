import express from "express";
var router = express.Router();

import sql from "mysql";
let connection = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'demopw',
  database: 'music'
});

connection.connect( (err) => {
  if (err)
    console.log('Failed to connect to db');
  else
    console.log('Connected to music db.');
});

/* GET home page. */
router.get('/', (req, res, next) => {

  let songquery = 'SELECT * FROM mysongs';
  connection.query(songquery, (err, rows) => {
    if (err)
      console.log('Failure in query.')
    else {
      console.log('Query successful.');
    };
    res.render('music', {songlist: rows});
  });

});

export default router;
