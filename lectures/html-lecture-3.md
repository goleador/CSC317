# HTML Lecture 3: Forms, Media, and Best Practices

---

## Review: Building Blocks

Last week you built your first portfolio page using:
- Semantic structure tags
- Headings and paragraphs
- Lists and links
- Basic page organization

**Today:** Making pages interactive and media-rich!

---

## HTML Forms: Getting User Input

Forms are how users send data to websites:
- Contact forms
- Login screens
- Search boxes
- Shopping carts

**Basic Form Structure:**
```html
<form action="/submit" method="POST">
  <!-- Form elements go here -->
</form>
```

---

## Form Attributes

**`action`** → Where to send the data
```html
<form action="/contact">
```

**`method`** → How to send it
- `GET` → Data visible in URL (search)
- `POST` → Data hidden (passwords, messages)

---

## The `<input>` Element

The most versatile form element!

```html
<input type="text" name="username" placeholder="Enter username">
```

**Key Attributes:**
- `type` → What kind of input
- `name` → Identifies the data
- `placeholder` → Helper text
- `required` → Must be filled out
- `value` → Default value

---

## Input Types: Text

**Text Input:**
```html
<input type="text" name="fullname">
```

**Email (with validation):**
```html
<input type="email" name="email" required>
```

**Password (hidden):**
```html
<input type="password" name="password">
```

**Search:**
```html
<input type="search" name="query">
```

---

## Input Types: Numbers & Dates

**Number:**
```html
<input type="number" min="1" max="100">
```

**Date:**
```html
<input type="date" name="birthday">
```

**Time:**
```html
<input type="time" name="appointment">
```

**Range (slider):**
```html
<input type="range" min="0" max="10">
```

---

## Input Types: Choices

**Checkbox (multiple choices):**
```html
<input type="checkbox" name="interests" value="coding"> Coding
<input type="checkbox" name="interests" value="design"> Design
```

**Radio (one choice):**
```html
<input type="radio" name="level" value="beginner"> Beginner
<input type="radio" name="level" value="advanced"> Advanced
```

---

## Other Form Elements

**Dropdown Menu:**
```html
<select name="country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="mx">Mexico</option>
</select>
```

**Text Area (multi-line):**
```html
<textarea name="message" rows="4" cols="50">
  Default text here...
</textarea>
```

---

## Labels: Accessibility is Key!

**Always use labels** with form elements:

```html
<label for="email">Email Address:</label>
<input type="email" id="email" name="email">
```

**Or wrap the input:**
```html
<label>
  Email Address:
  <input type="email" name="email">
</label>
```

✅ Makes forms accessible to screen readers
✅ Clicking label focuses the input

---

## Form Validation

HTML5 provides built-in validation:

```html
<input type="email" required>
<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
<input type="number" min="18" max="100">
<input type="text" minlength="3" maxlength="20">
```

The browser checks these before submission!

---

## Complete Form Example

```html
<form action="/register" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="13">
  
  <button type="submit">Sign Up</button>
</form>
```

---

## Images: Best Practices

**Always include alt text:**
```html
<img src="team.jpg" alt="Our development team at the office">
```

**Specify dimensions (prevents layout shift):**
```html
<img src="logo.png" alt="Company logo" width="200" height="100">
```

**Image Formats:**
- **JPEG** → Photos
- **PNG** → Graphics with transparency
- **SVG** → Logos, icons (scalable)
- **WebP** → Modern format, smaller files

---

## Video & Audio

**Video with controls:**
```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser doesn't support video.
</video>
```

**Audio:**
```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
</audio>
```

---

## Embedding Content: iframe

**YouTube Videos:**
```html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player">
</iframe>
```

**Google Maps:**
```html
<iframe 
  src="https://www.google.com/maps/embed?..."
  width="600" height="450">
</iframe>
```

⚠️ Always include `title` for accessibility!

---

## The `<head>` Section: Meta Tags

**Viewport (mobile-friendly):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Description (for search engines):**
```html
<meta name="description" content="Learn web development with our comprehensive courses">
```

**Character encoding:**
```html
<meta charset="UTF-8">
```

---

## Social Media Preview Tags

**Open Graph (Facebook, LinkedIn):**
```html
<meta property="og:title" content="My Portfolio">
<meta property="og:description" content="Check out my work!">
<meta property="og:image" content="preview.jpg">
```

**Twitter Cards:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="My Portfolio">
```

---

## More Semantic HTML5 Tags

**`<aside>` → Related but separate content:**
```html
<aside>
  <h3>Related Articles</h3>
  <ul>...</ul>
</aside>
```

**`<figure>` & `<figcaption>` → Images with captions:**
```html
<figure>
  <img src="chart.png" alt="Sales data">
  <figcaption>Q4 2024 Sales Results</figcaption>
</figure>
```

---

## File Organization

**Good Structure:**
```
my-website/
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── images/
│   ├── logo.png
│   └── team.jpg
└── js/
    └── script.js
```

---

## Linking Between Pages

**Relative Paths:**
```html
<!-- Same folder -->
<a href="about.html">About</a>

<!-- Subfolder -->
<a href="pages/contact.html">Contact</a>

<!-- Parent folder -->
<a href="../index.html">Home</a>

<!-- Root-relative -->
<a href="/index.html">Home</a>
```

---

## Accessibility Checklist

✅ **Every image has alt text**
✅ **Form inputs have labels**
✅ **Headings in logical order** (h1 → h2 → h3)
✅ **Links have descriptive text**
✅ **Page has one `<main>` element**
✅ **Language declared:** `<html lang="en">`

---

## Common Form Mistakes

❌ **Missing labels**
❌ **No form validation**
❌ **Forgetting the name attribute**
❌ **Not specifying input types**
❌ **No placeholder or helper text**
❌ **Submit button outside form**

---

## Best Practices Summary

1. **Always validate user input** (client & server side)
2. **Use semantic HTML** wherever possible
3. **Include alt text** on all images
4. **Organize files** in folders
5. **Test forms** before deploying
6. **Think mobile-first** with viewport meta
7. **Make it accessible** from the start

---

## What You Can Build Now

With HTML alone, you can create:
- Multi-page websites
- Contact forms
- Photo galleries
- Video players
- Embedded maps
- Accessible, SEO-friendly content

**Next: CSS will make it beautiful!**

---

## Next Week: Introduction to CSS

- Colors and typography
- Layout and spacing  
- Making pages responsive
- Your HTML will finally look professional!

---

## Resources

* [MDN Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)
* [HTML5 Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
* [Web Accessibility Guidelines](https://www.w3.org/WAI/tips/developing/)
* [Can I Use](https://caniuse.com/) - Browser compatibility

---
