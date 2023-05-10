# Fats Down server

## Environment variables
| Name           | Description                                                                                   | Example             |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------- |
| PORT           | The port the server should listen to                                                          | 3000                |
| CLIENT_URL     | The client URL to configure CORS                                                              | http://fats-down.io |
|                |                                                                                               |                     |
| ACCESS_SECRET  | The secret for generating access tokens                                                       | Orgone              |
| REFRESH_SECRET | The secret for generating refresh tokens                                                      | Krallice            |
|                |                                                                                               |                     |
| DB_TYPE        | The name of DBMS. Should be compatible with TypeORM                                           | postgres            |
| DB_HOST        | The host where the DB is available                                                            | localhost           |
| DB_PORT        | The port the DBMS listens to                                                                  | 5432                |
| DB_NAME        | The name of the DB                                                                            | fats_down           |
| DB_USER        | The username to access the DB                                                                 | postgres            |
| DB_PASSWORD    | The password to access the DB                                                                 | root                |
| DB_SYNCHRONIZE | The rule for TypeORM automatic synchronization behavior. Should be set to false in production | true                |
