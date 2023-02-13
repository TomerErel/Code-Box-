
interface Config {
  db: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
  frontendDomain: string
}

export const config: Config = {
  db: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'moveo'
  },
  frontendDomain: process.env.FRONTEND_DOMAIN || 'http://localhost:3000'

}




