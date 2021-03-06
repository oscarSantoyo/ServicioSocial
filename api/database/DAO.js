const errors = require('../Errors')
const {Pool} = require('pg')
const message = require('../database/Message')

const config = processConnectionURL(process.env.DATABASE_URL)
const pool = new Pool(config)

testingConnection()

function testingConnection(){
  connect((err, client, done) => {
    if(err) {
      console.log('There was an error on the connection')
    } else {
      console.log('Connection to Database Succesful')
    }
  }) 
}

module.exports.pool = pool

pool.on('error', function (err, client) {
  console.log('idle client error', err.message, err.stack)
})

module.exports.queryResponse = function (query, values, res) {
  try {
    this.query(query, values).then((data) => {
      res.json(new message.message(null, data, null))
    })
  } catch (error) {
    console.log(error)
    let response = new message.message(new errors.QueryError(error), null, null)
    res.json(response)
  }
}

module.exports.query = function (text, values) {
  console.log('query:', text, values)
  return new Promise(function (resolve, reject) {
    pool.query(text, values, (err, data) => {
      if (err && !data) {
        reject(err)
      } else {
        resolve(data.rows)
      }
    })
  })
}

function connect (callback) {
  return pool.connect(callback)
}

module.exports.connect = connect

function processConnectionURL (url) {
  if (!url) { return null }
  const config = {}
  const util = url.split('//')[1]
  config.user = util.split(':')[0]
  config.password = util.split(':')[1].split('@')[0]
  config.host = util.split(':')[1].split('@')[1]
  config.port = util.split(':')[2].split('/')[0]
  config.database = util.split(':')[2].split('/')[1]
  return config
}
