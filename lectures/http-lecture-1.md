# HTTP Fundamentals

## Lecture 1: Introduction to HTTP

### 1. Introduction to HTTP
- What is HTTP (Hypertext Transfer Protocol)?
- Brief history of HTTP (from HTTP/0.9 to HTTP/3)
- How the web works: Client-Server Model
- Request-Response Cycle
- Stateless nature of HTTP

### 2. HTTP Requests
- Structure of an HTTP request:
  - Request Line (Method, URL, Version)
  - Headers
  - Body (only for methods like POST and PUT)
- Common HTTP methods:
  - `GET` – Retrieve data
  - `POST` – Send data to the server
  - `PUT` – Update or replace a resource
  - `DELETE` – Remove a resource
  - `HEAD`, `OPTIONS`, `PATCH`

### 3. HTTP Responses
- Structure of an HTTP response:
  - Status Line (Status Code, Version)
  - Headers
  - Body (optional, contains content like HTML, JSON, etc.)
- Common HTTP status codes:
  - `200 OK` – Successful response
  - `301 Moved Permanently` – Redirects
  - `400 Bad Request` – Client error
  - `401 Unauthorized`, `403 Forbidden`
  - `404 Not Found`
  - `500 Internal Server Error`

### 4. Hands-on Exercise
- Use the browser’s Developer Tools (Network Tab)
- Make requests using `curl` and `Postman`
- View and analyze HTTP requests and responses

---

## Lecture 2: Deep Dive into HTTP & Practical Applications 

### 1. HTTP Headers
- Request headers:
  - `User-Agent`
  - `Accept`
  - `Authorization`
  - `Content-Type`
  - `Cookie`
- Response headers:
  - `Content-Type`
  - `Set-Cookie`
  - `Cache-Control`
  - `Access-Control-Allow-Origin` (CORS)

### 2. Query Parameters & URL Encoding
- Difference between URL path parameters vs. query parameters
- Encoding and decoding URLs

### 3. Cookies, Sessions, and Authentication
- How cookies work
- Session vs. token-based authentication
- JSON Web Tokens (JWT)

### 4. Security Considerations
- HTTPS vs. HTTP
- Common vulnerabilities:
  - Cross-Site Scripting (XSS)
  - Cross-Site Request Forgery (CSRF)
  - Man-in-the-Middle (MITM) Attacks
- Best practices to secure HTTP requests

### 5. Hands-on Exercise
- Make authenticated requests using `curl`
- Observe request headers for a logged-in session in Developer Tools
- Demonstrate a simple CORS issue and solution

---

## Summary & Discussion
- What did we learn?
- Why does HTTP matter for web development?
- Open Q&A session

