# Axios wrapper for Laravel API

Work in progress...

## Installation

```shell
yarn add axios laraxios
# or
npm i axios laraxios
```

## Usage

```javascript
import axios from 'axios'
import laraxios from 'laraxios'

const api = laraxios(axios, {
  baseURL: 'https://api.example.com/v1'
})

await api.get('url', {config})
await api.post('url', {data}, {config})
await api.put('url', {data}, {config})
await api.patch('url', {data}, {config})
await api.delete('url', {config})
```

`put` and `patch` methods will be automatically converted to the `post` method and the `_method: put/patch` property 
will be added to the data property.

## Config

You can use all regular [axios config](https://axios-http.com/docs/req_config).

Additional config is `errorHandler` where you can add your own function to handle Laravel response errors (validation, unauthorized, 404, etc.).

```javascript
{
  errorHandler: (error) => {}
}
```

NOTE: This is the default config that comes out of the box:

```javascript
{
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
}
```
Of course, you can override them.

## Sanctum
If you are using Laravel Sanctum, these option can be helpful to send initial request to get csrf token.
```javascript
api.sanctum.csrf()
```
You need to set baseURL, otherwise you can provide your own `url`:
```javascript
api.sanctum.csrf('https//example.com/my/csrf/token')
```
