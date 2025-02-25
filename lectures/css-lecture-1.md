# CSS Foundations & Basic Layout
## Mini-Course Lecture 1

---

## Course Overview

- **Lecture 1:** CSS Foundations & Basic Layout
- **Lecture 2:** Responsive Layouts with Flexbox & Grid
- **Lecture 3:** Advanced Styling & Animation
- **Lecture 4:** Forms, Final Polish & Best Practices

---

## Today's Agenda

1. CSS syntax and selectors
2. The CSS Box Model
3. CSS units (px, em, rem, %, vh/vw)
4. Working with color (hex, rgb, rgba)
5. Typography basics
6. Hands-on workshop: Styling the portfolio header and about section

---

## What is CSS?

- **C**ascading **S**tyle **S**heets
- Describes how HTML elements should be displayed
- Separates content (HTML) from presentation (CSS)
- Allows for consistent styling across multiple pages
- Enables responsive design for different devices

---

## Three Ways to Add CSS

1. **External CSS** (Recommended)
   ```html
   <link rel="stylesheet" href="styles.css">
   ```

2. **Internal CSS**
   ```html
   <style>
     body { background-color: lightblue; }
   </style>
   ```

3. **Inline CSS** (Avoid when possible)
   ```html
   <h1 style="color: blue;">Heading</h1>
   ```

---

## CSS Syntax

```css
selector {
  property: value;
  property: value;
}
```

Example:
```css
h1 {
  color: blue;
  font-size: 24px;
}
```

---

## CSS Selectors: The Basics

- **Element selector:** Selects all elements of a specific type
  ```css
  p { color: red; }
  ```

- **Class selector:** Selects elements with a specific class attribute
  ```css
  .intro { font-weight: bold; }
  ```

- **ID selector:** Selects a single element with a specific ID
  ```css
  #header { background-color: black; }
  ```

---

## CSS Selectors: Combinations

- **Descendant selector:** Selects all elements that are descendants of a specified element
  ```css
  section p { color: blue; }
  ```

- **Child selector:** Selects all elements that are direct children of a specified element
  ```css
  article > p { color: blue; }
  ```

- **Adjacent sibling selector:** Selects an element that is directly after another specific element
  ```css
  h1 + p { margin-top: 0; }
  ```

---

## Specificity

Order of precedence (lowest to highest):
1. Element selectors (`p`, `h1`)
2. Class selectors (`.intro`, `.header`)
3. ID selectors (`#main`, `#nav`)
4. Inline styles
5. `!important` (use sparingly)

```css
p { color: blue; }                 /* Specificity: 1 */
.text { color: red; }              /* Specificity: 10 */
#content { color: green; }         /* Specificity: 100 */
p.text#content { color: purple; }  /* Specificity: 111 */
```

---

## The CSS Box Model

![CSS Box Model](assets/box-model.png)

- **Content:** The actual content of the box
- **Padding:** Space between the content and the border
- **Border:** A border that goes around the padding and content
- **Margin:** Space outside the border

---

## Box Model Properties

```css
.box {
  /* Content dimensions */
  width: 300px;
  height: 200px;
  
  /* Padding */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  /* Shorthand: padding: 10px 20px; (top/bottom right/left) */
  
  /* Border */
  border: 1px solid black;
  
  /* Margin */
  margin: 30px;
}
```

---

## Box-Sizing Property

```css
/* Default box sizing */
.box-content {
  box-sizing: content-box;
  width: 300px; /* Total width = 300px + padding + border */
}

/* Alternative box sizing */
.box-border {
  box-sizing: border-box;
  width: 300px; /* Total width = 300px (including padding and border) */
}

/* Apply to all elements (recommended) */
* {
  box-sizing: border-box;
}
```

---

## CSS Units

Absolute units:
- **px:** Pixels (1px = 1/96th of 1in)
- **pt:** Points (1pt = 1/72nd of 1in)

Relative units:
- **em:** Relative to the font-size of the element
- **rem:** Relative to the font-size of the root element
- **%:** Relative to the parent element
- **vw/vh:** Relative to the viewport width/height (1vw = 1% of viewport width)

---

## When to Use Different Units

- **px:** For precise control (borders, small details)
- **rem:** For font sizes and most measurements (scales with user preferences)
- **em:** For measurements relative to an element's font size
- **%:** For responsive widths relative to parent containers
- **vw/vh:** For elements that should be relative to viewport size

---

## Working with Color

- **Named colors:** `red`, `blue`, `green`
- **Hexadecimal:** `#ff0000` (red), `#0000ff` (blue)
- **Short hex:** `#f00` (red), `#00f` (blue)
- **RGB:** `rgb(255, 0, 0)` (red), `rgb(0, 0, 255)` (blue)
- **RGBA:** `rgba(255, 0, 0, 0.5)` (semi-transparent red)
- **HSL:** `hsl(0, 100%, 50%)` (red), `hsl(240, 100%, 50%)` (blue)
- **HSLA:** `hsla(0, 100%, 50%, 0.5)` (semi-transparent red)

---

## Typography Basics

```css
body {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 400; /* normal */
  line-height: 1.5;
  color: #333;
  text-align: left;
}

h1 {
  font-family: 'Georgia', serif;
  font-size: 2rem; /* 32px if body is 16px */
  font-weight: 700; /* bold */
  line-height: 1.2;
}
```

---

## Web Safe Fonts vs. Web Fonts

**Web Safe Fonts:**
- Arial, Helvetica, sans-serif
- Times New Roman, Times, serif
- Courier New, Courier, monospace

**Web Fonts (Google Fonts Example):**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```
```css
body {
  font-family: 'Roboto', sans-serif;
}
```

---

## Best Practices for Typography

- Use a limited number of fonts (2-3 maximum)
- Maintain proper contrast between text and background
- Set appropriate line height (1.4-1.6 for body text)
- Use relative units (rem) for font sizes
- Create a clear typographic hierarchy
- Ensure readability across devices

---

## Let's Start the Workshop

**Portfolio Website Part 1:**
- Setting up CSS file
- Styling the navigation bar
- Creating header and about sections
- Adding basic responsiveness

---

## Workshop: Setting Up CSS

Create a file named `styles.css` in the same directory as your HTML file.

Link it in your HTML file's `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>John Doe - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Content here -->
</body>
</html>
```

---

## Workshop: CSS Reset

At the top of your CSS file, add:

```css
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

---

## Workshop: Navigation Bar

```css
/* Navigation */
nav {
  background-color: #333;
  padding: 1rem;
  position: sticky;
  top: 0;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
}

nav a:hover {
  color: #ddd;
}
```

Remember to update your HTML to use `<nav>` instead of `<div>` for navigation.

---

## Workshop: Header & About Section

```css
/* Header/About Section */
#about {
  padding: 3rem 0;
  text-align: center;
}

#about img {
  border-radius: 50%;
  margin: 1.5rem 0;
  border: 5px solid #eee;
}

#about h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

#about h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #555;
}

#about p {
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
```

---

## Workshop: Social Links

```css
/* Social Links */
#about h3 {
  margin-top: 2rem;
  font-size: 1.3rem;
}

#about a {
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
}

#about a:hover {
  text-decoration: underline;
}
```

---

## Workshop: Basic Responsiveness

```css
/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  nav {
    text-align: center;
  }
  
  nav a {
    display: inline-block;
    margin: 5px 10px;
  }
  
  #about h1 {
    font-size: 2rem;
  }
  
  #about h2 {
    font-size: 1.5rem;
  }
}
```

---

## Next Steps

1. Complete the remaining portfolio sections on your own
2. Make sure to adapt the navigation to semantic HTML
3. Experiment with different colors and typography
4. Next lecture: Flexbox and Grid for more advanced layouts

---

## Questions?

---

## Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [CSS-Tricks](https://css-tricks.com/)
- [Google Fonts](https://fonts.google.com/)
- [Coolors - Color Palette Generator](https://coolors.co/)
- [Can I Use](https://caniuse.com/) - Browser compatibility checker
