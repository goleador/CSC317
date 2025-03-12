# **Crash Course on `curl`**

## **📌 Introduction**
`curl` (Client URL) is a powerful command-line tool for making HTTP requests, testing APIs, downloading files, and debugging network issues. It supports multiple protocols like HTTP, HTTPS, FTP, and more.

---

## **🛠 Basic Usage**
### **1️⃣ Fetching a Web Page**
```sh
curl https://example.com
```
✅ This retrieves the raw HTML of the page.

### **2️⃣ Fetching Just the Headers (`HEAD` Request)**
```sh
curl -I https://example.com
```
✅ This returns only the HTTP headers (status code, content type, etc.).

### **3️⃣ Following Redirects (`-L`)**
```sh
curl -L https://example.com
```
✅ Useful when a website redirects (`301` or `302`) to another URL.

---

## **🌐 Making HTTP Requests**
### **4️⃣ Sending a GET Request**
```sh
curl -X GET https://api.example.com/data
```
✅ Explicitly sends a `GET` request (default behavior of `curl`).

### **5️⃣ Sending a POST Request with Data**
```sh
curl -X POST -d "name=John&age=30" https://api.example.com/users
```
✅ Sends form-encoded data.

### **6️⃣ Sending JSON Data (`-H` to set headers)**
```sh
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "age": 30}'
```
✅ Always set the `Content-Type` when sending JSON.

---

## **🔑 Authentication & Headers**
### **7️⃣ Sending a Request with Custom Headers**
```sh
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com
```
✅ Adds an `Authorization` header (used for APIs that require authentication).

### **8️⃣ Sending Basic Authentication (`user:password`)**
```sh
curl -u username:password https://api.example.com
```
✅ Encodes credentials as `Basic Auth`.

### **9️⃣ Handling Cookies**
```sh
curl -b "session=abc123" https://example.com
```
✅ Sends a session cookie with the request.

---

## **📂 Downloading Files**
### **🔟 Download a File (`-O` for original name)**
```sh
curl -O https://example.com/file.zip
```
✅ Saves the file with its original name.

### **1️⃣1️⃣ Download a File with a Custom Name (`-o`)**
```sh
curl -o myfile.zip https://example.com/file.zip
```
✅ Saves the file as `myfile.zip`.

### **1️⃣2️⃣ Resuming a Download (`-C -`)**
```sh
curl -C - -O https://example.com/largefile.zip
```
✅ Useful for resuming interrupted downloads.

---

## **🚀 Debugging with `curl`**
### **1️⃣3️⃣ Verbose Mode (`-v`)**
```sh
curl -v https://example.com
```
✅ Shows detailed request and response headers.

### **1️⃣4️⃣ Silent Mode (`-s`)**
```sh
curl -s https://example.com
```
✅ Suppresses progress output (useful for scripting).

### **1️⃣5️⃣ Timing & Performance Debugging**
```sh
curl -w "Time Total: %{time_total}s\n" -o /dev/null -s https://example.com
```
✅ Displays how long the request took.

---

## **⚡ Advanced Usage**
### **1️⃣6️⃣ Save Response to a File**
```sh
curl -o response.json https://api.example.com/data
```
✅ Stores the response as `response.json`.

### **1️⃣7️⃣ Simulating Different User-Agents**
```sh
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" https://example.com
```
✅ Mimics a browser request.

### **1️⃣8️⃣ Checking HTTP/2 or HTTP/3 Support**
```sh
curl -I --http2 https://example.com
curl -I --http3 https://example.com
```
✅ Determines if a site supports HTTP/2 or HTTP/3.

---

## **📌 Summary**
| Command | Purpose |
|---------|---------|
| `curl -I` | Fetch headers only |
| `curl -L` | Follow redirects |
| `curl -X POST -d "data"` | Send a POST request |
| `curl -H "Header: Value"` | Add a custom header |
| `curl -u user:pass` | Use basic auth |
| `curl -O url` | Download a file |
| `curl -v` | Debug mode |
| `curl -w` | Measure performance |

📌 `curl` is an essential tool for debugging APIs, testing network requests, and automating web interactions. Let me know if you need more details! 🚀

