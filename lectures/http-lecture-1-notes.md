# **HTTP Fundamentals - Study Notes**

## **📌 Introduction to HTTP**
### **What is HTTP?**
- **Hypertext Transfer Protocol (HTTP)** is the foundation of data communication on the web.
- Follows a **client-server model** (e.g., browser requests a webpage from a server).
- **Stateless**: Each request is independent and has no memory of previous requests.

### **How the Web Works (Analogy)**
- Think of a **library**: The **client** (you) requests a book (webpage), and the **server** (librarian) fetches it for you.

---

## **📨 HTTP Requests**
### **Structure of an HTTP Request**
1. **Request Line** → Method, URL, HTTP Version  
   Example: `GET /index.html HTTP/1.1`
2. **Headers** → Metadata (e.g., `User-Agent`, `Accept`, `Authorization`)
3. **Body** (Only for `POST`, `PUT`, `PATCH`) → Contains data being sent

### **Common HTTP Methods**
| Method  | Purpose |
|---------|---------|
| `GET`    | Retrieve data |
| `POST`   | Send new data |
| `PUT`    | Update/replace data |
| `DELETE` | Remove data |
| `HEAD`   | Like `GET`, but no response body |
| `OPTIONS` | Get allowed methods for a resource |

---

## **📩 HTTP Responses**
### **Structure of an HTTP Response**
1. **Status Line** → HTTP Version, Status Code  
   Example: `HTTP/1.1 200 OK`
2. **Headers** → Metadata (e.g., `Content-Type`, `Cache-Control`)
3. **Body** → The requested content (HTML, JSON, etc.)

### **Common HTTP Status Codes**
| Code  | Meaning |
|-------|---------|
| `200 OK` | Success |
| `301 Moved Permanently` | Redirect to a new URL |
| `400 Bad Request` | Client error |
| `401 Unauthorized` | Authentication required |
| `403 Forbidden` | Access denied |
| `404 Not Found` | Resource does not exist |
| `500 Internal Server Error` | Server failed to process request |

---

## **📄 HTTP Headers**
### **Request Headers**
| Header | Purpose |
|--------|---------|
| `User-Agent` | Identifies the client (browser, app) |
| `Accept` | Specifies response formats (e.g., JSON, HTML) |
| `Authorization` | Sends credentials (Bearer token, Basic Auth) |
| `Content-Type` | Specifies the format of sent data |
| `Cookie` | Sends stored cookies to the server |

### **Response Headers**
| Header | Purpose |
|--------|---------|
| `Content-Type` | Defines response format (HTML, JSON, etc.) |
| `Set-Cookie` | Sends a cookie to store on client side |
| `Cache-Control` | Controls caching behavior |
| `Access-Control-Allow-Origin` | Defines allowed cross-origin requests (CORS) |

---

## **🛠 URL Parameters & Encoding**
### **Query Parameters vs. Path Parameters**
- **Query Parameters** (`?key=value&name=john`) → Used for optional filters/search.
- **Path Parameters** (`/users/123`) → Identifies a specific resource.

### **Encoding Special Characters**
- URLs cannot contain spaces or special characters.
- Example: `https://example.com/search?q=hello world` must be encoded as:
  ```
  https://example.com/search?q=hello%20world
  ```

---

## **🍪 Cookies, Sessions, and Authentication**
### **How Cookies Work**
- The server **sets a cookie** in the response:
  ```http
  Set-Cookie: session=abc123; HttpOnly
  ```
- The browser **sends it back** on future requests:
  ```http
  Cookie: session=abc123
  ```

### **Sessions vs. Token-Based Authentication**
| Type  | How It Works |
|-------|-------------|
| **Session-based** | Server stores session data; user gets an ID cookie |
| **Token-based (JWT)** | Server sends a signed token (JWT); no session storage needed |

---

## **🔒 Security Considerations**
### **1️⃣ HTTPS vs. HTTP**
- **HTTPS encrypts data** using TLS (SSL).
- Prevents **Man-in-the-Middle (MITM) attacks**.

### **2️⃣ Common Security Vulnerabilities**
| Issue  | Description |
|--------|-------------|
| **XSS (Cross-Site Scripting)** | Injects malicious scripts into webpages |
| **CSRF (Cross-Site Request Forgery)** | Tricks users into making unintended actions |
| **Clickjacking** | Embeds a site inside an iframe to trick users |
| **Man-in-the-Middle (MITM)** | Intercepts unencrypted communications |

### **3️⃣ Best Practices**
✔ Always use **HTTPS**.  
✔ Validate **user input** (prevent XSS & SQL injection).  
✔ Implement **secure cookies** (`HttpOnly`, `SameSite`).  
✔ Use **CORS headers** to control cross-origin access.

---

## **🚀 Hands-on Exercises**
### **1️⃣ Check HTTP Requests in Your Browser**
- Open **DevTools (`F12`) → Network Tab**.
- Reload the page and inspect **requests & responses**.

### **2️⃣ Use `curl` to Inspect a Request**
```sh
curl -I https://example.com
```
✅ Fetches **only headers**.

### **3️⃣ Test a `POST` Request with JSON**
```sh
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "age": 30}'
```
✅ Sends JSON data to an API.

---

## **📌 Summary**
✔ HTTP is **stateless** and follows a **request-response** model.  
✔ **Methods**: `GET`, `POST`, `PUT`, `DELETE` define request intent.  
✔ **Status Codes**: Indicate success (`200`), client errors (`400`), and server errors (`500`).  
✔ **Headers** control request details (`User-Agent`, `Authorization`, `Cache-Control`).  
✔ **Security**: Always use **HTTPS**, validate user input, and set secure cookies.  

🚀 **Understanding HTTP fundamentals is crucial for debugging, building APIs, and optimizing web performance!**

