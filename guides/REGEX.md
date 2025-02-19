# Regular Expressions (RegEx) Crash Course

## 📌 Introduction
Regular Expressions (RegEx) are powerful tools for pattern matching in strings. They are widely used in text processing, validation, search, and replacement tasks.

---

## 🛠️ Basic Syntax

### **1. Character Matching**
| Pattern  | Description | Example Match |
|----------|------------|--------------|
| `.`      | Any character (except newline) | `c.t` → `cat`, `cut` |
| `[abc]`  | Matches `a`, `b`, or `c` | `b[aeiou]g` → `bag`, `beg` |
| `[^abc]` | Negation, matches anything *except* `a`, `b`, or `c` | `[^0-9]` → any non-digit |

### **2. Quantifiers**
| Pattern  | Description | Example Match |
|----------|------------|--------------|
| `*`      | 0 or more occurrences | `a*` → `a`, `aa`, `aaa` |
| `+`      | 1 or more occurrences | `a+` → `a`, `aa`, `aaa` |
| `?`      | 0 or 1 occurrence (optional) | `colou?r` → `color`, `colour` |
| `{n}`    | Exactly `n` occurrences | `\d{3}` → `123` |
| `{n,}`   | `n` or more occurrences | `\d{2,}` → `12`, `123`, `1234` |
| `{n,m}`  | Between `n` and `m` occurrences | `\d{2,4}` → `12`, `123`, `1234` |

### **3. Anchors**
| Pattern  | Description | Example Match |
|----------|------------|--------------|
| `^`      | Start of string | `^Hello` → Matches `Hello world!` but not `Say Hello` |
| `$`      | End of string | `world!$` → Matches `Hello world!` |

### **4. Groups & Alternation**
| Pattern  | Description | Example Match |
|----------|------------|--------------|
| `(abc)`  | Capturing group | `(go)+` → `gogo`, `gogogo` |
| `(?:abc)`| Non-capturing group | `(?:red|blue) car` → `red car`, `blue car` |
| `|`      | OR operator | `cat|dog` → Matches either `cat` or `dog` |

### **5. Character Classes & Shorthand**
| Pattern  | Description | Example Match |
|----------|------------|--------------|
| `\d`     | Any digit (0-9) | `\d+` → `123` |
| `\D`     | Any non-digit | `\D+` → `abc` |
| `\w`     | Any word character (a-z, A-Z, 0-9, _) | `\w+` → `hello_123` |
| `\W`     | Any non-word character | `\W+` → `?!@#` |
| `\s`     | Any whitespace character (space, tab, newline) | `\s+` → `" "` |
| `\S`     | Any non-whitespace character | `\S+` → `hello` |

---

## 🔍 Common Use Cases

### ✅ When to Use RegEx
1. **Validating Input:**
    - Email: `^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$`
    - Phone Number: `^\+?\d{1,3}?[-.\s]?$begin:math:text$?\\d{1,4}?$end:math:text$?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$`
2. **Finding & Replacing Text:**
    - Replace all whitespace: `\s+` → `replace with ''`
    - Replace multiple spaces with a single space: `\s{2,}` → `replace with ' '`
3. **Extracting Data from Text:**
    - Extract hashtags: `#(\w+)`
    - Extract URLs: `https?://[^\s]+`
4. **Parsing Logs & Data Files:**
    - Extract IP addresses: `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b`
    - Extract dates: `\b\d{4}-\d{2}-\d{2}\b`

---

### ❌ When *Not* to Use RegEx
1. **Parsing HTML/XML**
    - **Why?** HTML is hierarchical and regex is not built for structured parsing.
    - **Better Alternative:** Use an HTML parser like `BeautifulSoup` (Python) or `Cheerio` (JavaScript).

2. **Processing JSON**
    - **Why?** JSON is structured, and regex struggles with nested objects.
    - **Better Alternative:** Use `json.loads()` (Python) or `JSON.parse()` (JavaScript).

3. **Complex NLP Tasks (Natural Language Processing)**
    - **Why?** Language rules are too complex for regex.
    - **Better Alternative:** Use NLP libraries like `spaCy` or `NLTK`.

4. **Performance-Critical Applications**
    - **Why?** Regex can be slow on large datasets if not optimized properly.
    - **Better Alternative:** Use dedicated string operations or indexing methods.

---

## 🚀 Advanced Topics (Optional)
### 📌 Lookaheads & Lookbehinds
| Pattern  | Description | Example Match |
|----------|------------|--------------|
| `(?=...)` | Positive lookahead | `foo(?=bar)` → Matches `foo` in `foobar` |
| `(?!...)` | Negative lookahead | `foo(?!bar)` → Matches `foo` not followed by `bar` |
| `(?<=...)` | Positive lookbehind | `(?<=\$)\d+` → Matches `10` in `$10` |
| `(?<!...)` | Negative lookbehind | `(?<!\$)\d+` → Matches numbers not preceded by `$` |

---

## 🔗 Useful Resources
- **RegEx Testing:** [regex101.com](https://regex101.com/)
- **RegEx Cheat Sheet:** [cheatography.com/davechild/cheat-sheets/regular-expressions/](https://cheatography.com/davechild/cheat-sheets/regular-expressions/)
- **Interactive Learning:** [regexr.com](https://regexr.com/)

---

## 🎯 Summary
- **RegEx is great** for string validation, searching, and data extraction.
- **Use the right tools** when dealing with structured data like JSON or HTML.
- **Optimize performance** for large-scale pattern matching.

Happy Regex-ing! 🎉