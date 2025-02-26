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

## What You Should Do Before Next Class

Between now and our next class, make sure you:

1️⃣ Read the assignment carefully and post any questions on Discord or Canvas discussions.

2️⃣ Set up your workspace:

• Create a new assignment-3 folder.

• Copy your existing code and images from assignments-2 into this folder.

• Double-check that everything still works.

3️⃣ Start styling!

• Inside assignment-3, create a styles folder.

• Add a styles.css file for your hand-coded CSS.

• Link your index.html to your styles file.

• Begin styling your header, profile image, and add a custom font of your choice.



---

## Questions?

---

## Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [CSS-Tricks](https://css-tricks.com/)
- [Google Fonts](https://fonts.google.com/)
- [Coolors - Color Palette Generator](https://coolors.co/)
- [Can I Use](https://caniuse.com/) - Browser compatibility checker
