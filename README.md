# Backend

Config.yaml

```
db // database configs
    type: 'postgres'
    host: 'localhost'
    port: 5432
    database: 'test-job'
    username: 'postgres'
    password: 'root'

jwt // auth config
    secret // secret key
    expires // expires duration
    
parsing_target // parser config
    active_from_start: false // active parsing from app init
    name: 'TINKOFF#1' // parser name
    url: 'https://garantex.io/p2p' // parsing base url
    params: // query params
        - utf8: '✓'
        - payment_method: 'Тинькофф'
        - amount: 200000
        - currency: 'RUB' 
        - commit: 'Поиск'
    container: '.table.table-condensed.table-striped.sell_table > tbody' // container selector which contains valueable items
    fields: // config for parse each element 
        -   description: 'seller' // key
            value: 'td:nth-child(1) > div > a' // selector
        -   description: 'paymentMethod'
            value: 'td:nth-child(2) > div'
        -   description: 'price'
            value: 'td:nth-child(3)'
        - description: 'sum'
            value: 'td:nth-child(4)'
```

DB
```
CREATE DATABASE test-job;
```
APP
```
npm run start:dev
```
Swagger 
```
http://127.0.0.1:3000/docs
```

# Frontend (work with socket.io)
```
client-socket-io.html
```