![npm](https://img.shields.io/npm/v/laraxios?style=for-the-badge)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/codetow/laraxios?style=for-the-badge)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/laraxios?style=for-the-badge)

# Laraxios - Axios wrapper for Laravel API

This wrapper makes it simple to integrate [Axios](https://axios-http.com/) with the Laravel API, Sanctum, and Fortify (coming soon).

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

await api.get('url', { config })
await api.post('url', { data }, { config })
await api.put('url', { data }, { config })
await api.patch('url', { data }, { config })
await api.delete('url', { config })
```

### URL parameter
Keep in mind that there is a difference between URLs with and without a leading slash. If you add a slash, the baseURL will change to the path's root. This is useful for endpoints outside the scope of the API.

For instance, if you set `baseURL` to `https://example.com/api/v1`, the final URLs may appear as follows:

```js
api.get('products/tags')  // 'https://example.com/api/v1/products/tags'

api.get('/products/tags') // 'https://example.com/products/tags'
```


### Method Spoofing

By default, Laraxios will convert `put`, `patch` and `delete` methods automatically to the `post` method and
the `_method: put/patch` property
will be added to the data property.

### Payload data conversion

To put your mind at ease, Laraxios will convert your objects, arrays, and booleans to a format that is supported by the PHP server. On the other hand, File and Blob will be sent normally.

```js
await api.put('product', {
  title: 'Lorem ipsum',
  published: true,
  price: {
    actual: 199,
    discounted: 99
  },
  tags: ['foo', 'bar']
})
```
Final payload:
```json
{
  "_method": "put",
  "title": "Lorem ipsum",
  "published": "1",
  "price[actual]": "199",
  "price[discounted]": "99",
  "tags[0]": "foo",
  "tags[1]": "bar"
}
```

### Axios Instance

Laraxios will create an axios instance by using this setup out of the box, but you can override them if you need to:

```js
{
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
}
```

Here's how you can get to it:

```js
api.axiosInstance
```

Make use of it if you need to do anything like setup [interceptors](https://axios-http.com/docs/interceptors).

## Request Config

You can use any regular [axios request config](https://axios-http.com/docs/req_config), and there is an extra
configuration option called [errorHandler](#handling-api-errors) that lets you add your own function to handle errors
that Laravel responses cause.

## Sanctum

If you are using Laravel Sanctum, this option can be helpful to send initial request to get csrf token.

```javascript
api.sanctum.csrf()
```

If the URL is different, you can set your own:

```javascript
api.sanctum.csrf('https://example.com/my/csrf/token')
```

## Handling API errors

All Laravel response errors can be handled by setting the function for the errorHandler configuration option that
accepts the error property from the response.

Example of how you can handle the API errors:

```js
const myErrorHandler = (error) => {
  const { status, statusText, data } = error.response

  switch (status) {
    case 419: // CSRF token mismatch
    case 401: // Unauthenticated
      logoutAndRedirectUser()
      break
    case 429: // Too many requests
    case 400: // Wrong credentials
    case 403: // Unauthorized
    case 404: // Not Found
      displayNotification(status + ' ' + statusText)
      break
    case 422: // Validation
      displayValidationMessage(data.message)
      break
    case 503: // Maintenance mode
      displayMaintenanceMessage()
      break
    default:
      console.error('Something went wrong...')
  }
}

const api = laraxios(axios, {
  baseURL: 'https://api.example.com/v1',
  errorHandler: myErrorHandler
})
```
