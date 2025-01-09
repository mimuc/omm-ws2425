var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')

const sequelize = new Sequelize("test", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    multipleStatements: true
  }
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// florian';drop table users;

router.post('/search',async (req, res) => {
  let username = req.body.username;

  let sqlQuery = "select * from users where name='"+username+"';";
  console.log(sqlQuery);
  const [results, metadata] = await sequelize.query(sqlQuery);

  res.json(results);
})

module.exports = router;
