module.exports ={
    development: {
      client: 'pg',
      connection: {
        host : 'localhost',
        user : 'postgres',
        password : '123',
        database : 'w-m-f',
        charset: 'utf8'
      },
      migrations: {
        directory: __dirname + '/migrations',
      }
    }
  }