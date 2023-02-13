import mysql, { MysqlError } from 'mysql';
import { config } from './config';

const connection = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export function asyncQuery<T>(sql: string, params: Array<string | number | undefined>): Promise<T> {
  // T is what asyncQuery programmer passed
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err: MysqlError | null, results: T) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

export async function databaseMigration() {
  await asyncQuery(
    `
    CREATE TABLE IF NOT EXISTS codes (
      title varchar(45) NOT NULL,
      code varchar(2000) NOT NULL
    )
  `,
    [],
  );

  // this code is excecuted only for the first time deploying the application.

  // await asyncQuery(
  //   `
  // INSERT INTO 
  // codes(title,code)
  // VALUES
  // ('Async','function myDisplayer(something) {   document.getElementById("demo").innerHTML = something; }  function myCalculator(num1, num2, myCallback) {   let sum = num1 + num2;   myCallback(sum); }  myCalculator(5, 5, myDisplayer);'),
  // ('Multiplying','let x = 5; let y = 2; let z = x * y;'),
  // ('Adding','let x = 5; let y = 2; let z = x + y;'),
  // ('Objects','const person = {   firstName: "John",   lastName: "Doe",   age: 50,   eyeColor: "blue" };'),
  // ('Arrays','const cars = []; cars[0]= "Saab"; cars[1]= "Volvo"; cars[2]= "BMW";')
  // ;
  //   `,
  //   [],
  // );


}





