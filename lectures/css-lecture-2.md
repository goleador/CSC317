# Responsive Layouts with Flexbox & Grid
## Mini-Course Lecture 2

---

## Course Overview

- **Lecture 1:** CSS Foundations & Basic Layout ✓
- **Lecture 2:** Responsive Layouts with Flexbox & Grid ← *We are here*
- **Lecture 3:** Advanced Styling & Animation
- **Lecture 4:** Forms, Final Polish & Best Practices

---

## Today's Agenda

1. Introduction to Flexbox
2. Introduction to CSS Grid
3. Media queries for responsive design
4. Hands-on workshop: Styling Education and Experience sections

---

## The Problem with Traditional Layouts

- Float-based layouts are complex and limiting
- Vertical centering was difficult
- Creating equal-height columns was challenging
- Responsive design required extensive media queries
- Complex layouts needed many nested containers

---

## Flexbox: A Better Way to Layout

Flexbox is a one-dimensional layout method designed for laying out items in rows or columns.

Key benefits:
- Flexible item dimensions
- Direction-agnostic
- Easy alignment (horizontal and vertical)
- Space distribution control
- Order control independent of HTML structure

---

## Flexbox Container Properties

```css
.container {
  display: flex; /* or inline-flex */
  
  /* Main axis (horizontal by default) */
  flex-direction: row | row-reverse | column | column-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* Cross axis (vertical by default) */
  align-items: stretch | flex-start | flex-end | center | baseline;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  
  /* Multi-line */
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

---

## Flexbox Direction

![Flexbox Direction](https://css-tricks.com/wp-content/uploads/2018/10/flex-direction.svg)

- `row` (default): left to right
- `row-reverse`: right to left
- `column`: top to bottom
- `column-reverse`: bottom to top

---

## Justify Content (Main Axis)

![Justify Content](https://css-tricks.com/wp-content/uploads/2018/10/justify-content.svg)

- `flex-start` (default): items at start
- `flex-end`: items at end
- `center`: items at center
- `space-between`: items with space between
- `space-around`: items with space around
- `space-evenly`: items with equal space

---

## Align Items (Cross Axis)

![Align Items](https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg)

- `stretch` (default): fill container height
- `flex-start`: items at top
- `flex-end`: items at bottom
- `center`: items at center
- `baseline`: items aligned by their text baseline

---

## Flexbox Item Properties

```css
.item {
  /* Flexibility */
  flex-grow: 0;   /* Default: 0 (don't grow) */
  flex-shrink: 1; /* Default: 1 (can shrink) */
  flex-basis: auto; /* Default size before growing/shrinking */
  
  /* Shorthand */
  flex: 0 1 auto; /* grow shrink basis */
  
  /* Alignment (overrides container) */
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
  
  /* Order (lower appears first) */
  order: 0; /* Default: 0 */
}
```

---

## Common Flexbox Patterns

**Centering an element**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

**Navigation bar**
```css
nav {
  display: flex;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  gap: 20px;
}
```

---

## CSS Grid: Two-Dimensional Layout

CSS Grid Layout is a two-dimensional layout system designed for complex layouts.

Key benefits:
- Control over both rows and columns
- Precise control over placement
- Overlap capabilities
- Named areas for layout
- Gap control (gutters)
- Alignment control similar to Flexbox

---

## CSS Grid Container Properties

```css
.container {
  display: grid; /* or inline-grid */
  
  /* Define structure */
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 200px auto;
  
  /* Grid gaps (gutters) */
  column-gap: 20px;
  row-gap: 20px;
  gap: 20px; /* shorthand for both */
  
  /* Alignment - similar to Flexbox */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  place-items: center; /* shorthand for both */
}
```

---

## Grid Template Columns & Rows

```css
.container {
  /* Fixed widths */
  grid-template-columns: 100px 200px 100px;
  
  /* Flexible with fr unit */
  grid-template-columns: 1fr 2fr 1fr;
  
  /* Mixed units */
  grid-template-columns: 200px 1fr 2fr;
  
  /* Repeat notation */
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  
  /* Auto-fill/auto-fit */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

---

## The fr Unit

The `fr` unit represents a fraction of the available space:

```css
.container {
  grid-template-columns: 1fr 2fr 1fr;
}
```

This creates three columns where:
- First column: 25% of space (1/4)
- Second column: 50% of space (2/4)
- Third column: 25% of space (1/4)

---

## Grid Item Placement

```css
.item {
  /* Specific grid lines */
  grid-column-start: 1;
  grid-column-end: 3; /* or span 2 */
  grid-row-start: 2;
  grid-row-end: 4; /* or span 2 */
  
  /* Shorthand */
  grid-column: 1 / 3; /* or 1 / span 2 */
  grid-row: 2 / 4; /* or 2 / span 2 */
  
  /* Super shorthand (grid-row-start / grid-column-start / grid-row-end / grid-column-end) */
  grid-area: 2 / 1 / 4 / 3;
}
```

---

## Named Grid Areas

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

---

## Auto Placement with Grid

Items that don't have explicit placement are placed automatically according to:

```css
.container {
  /* Flow direction */
  grid-auto-flow: row | column | dense;
  
  /* Sizing for automatically created tracks */
  grid-auto-rows: 100px;
  grid-auto-columns: 1fr;
}
```

---

## Flexbox or Grid: When to Use Which?

**Use Flexbox when:**
- You have a single row or column of items
- You need to align items within a container
- The layout is content-driven (size determined by content)

**Use Grid when:**
- You need to control both rows and columns
- You have a complex, two-dimensional layout
- You need precise control over item placement
- The layout is layout-driven (content fits the defined grid)

---

## Responsive Design Fundamentals

Three core components:
1. Fluid layouts (using relative units)
2. Flexible images and media
3. Media queries

---

## Media Queries

```css
/* Mobile First Approach (recommended) */
/* Base styles for mobile */
body {
  font-size: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  body {
    font-size: 20px;
  }
}
```

---

## Common Breakpoints

- **Small phones:** up to 576px
- **Large phones/Small tablets:** 577px to 767px
- **Tablets:** 768px to 991px
- **Laptops/Desktops:** 992px to 1199px
- **Large Desktops:** 1200px and above

```css
@media (min-width: 768px) { /* Tablet and above */ }
@media (min-width: 992px) { /* Desktop and above */ }
```

---

## Common Media Query Properties

You can target more than just width:

```css
/* Height-based */
@media (min-height: 800px) { ... }

/* Orientation */
@media (orientation: landscape) { ... }
@media (orientation: portrait) { ... }

/* Display type */
@media (hover: hover) { ... } /* Devices that support hover */
@media (pointer: fine) { ... } /* Devices with precise pointer */
@media print { ... } /* Styling for print mode */
```

---

## Responsive Images

```css
/* Make all images responsive */
img {
  max-width: 100%;
  height: auto;
}

/* Background images */
.hero {
  background-image: url('small.jpg');
}

@media (min-width: 768px) {
  .hero {
    background-image: url('medium.jpg');
  }
}

@media (min-width: 1200px) {
  .hero {
    background-image: url('large.jpg');
  }
}
```

---

## Let's Start the Workshop

**Portfolio Website Part 2:**
- Styling the Education section with Flexbox
- Creating the Experience section with Grid
- Making both sections responsive

---

## Workshop: Education Section with Flexbox

First, update your HTML to use more semantic elements:

```html
<section id="education">
  <h2>Education</h2>
  
  <div class="education-container">
    <div class="education-item">
      <h3>University of Technology</h3>
      <p class="degree">Bachelor of Science in Computer Science</p>
      <p class="dates">Expected Graduation: May 2025</p>
    </div>
    
    <div class="education-item">
      <h3>Tech High School</h3>
      <p class="degree">High School Diploma</p>
      <p class="dates">Graduated: June 2021</p>
    </div>
  </div>
</section>
```

---

## Workshop: Education Section Styling

```css
/* Education Section */
#education {
  padding: 3rem 0;
}

#education h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.education-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.education-item {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.education-item h3 {
  color: #0066cc;
  margin-bottom: 0.5rem;
}

.degree {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.dates {
  color: #666;
  font-style: italic;
}
```

---

## Workshop: Making Education Responsive

```css
/* Responsive Education Section */
@media (min-width: 768px) {
  .education-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .education-item {
    flex: 1 1 300px; /* grow shrink basis */
  }
}
```

---

## Workshop: Experience Section with Grid

First, update your HTML to be more semantic:

```html
<section id="experience">
  <h2>Experience</h2>
  
  <div class="experience-grid">
    <div class="experience-item">
      <div class="job-title">Software Development Intern</div>
      <div class="company">Tech Solutions Inc. - New York, NY</div>
      <div class="dates">June 2023 - August 2023</div>
      <ul class="responsibilities">
        <li>Developed and maintained web applications</li>
        <li>Collaborated with senior developers</li>
        <li>Participated in code reviews</li>
      </ul>
    </div>
    
    <div class="experience-item">
      <div class="job-title">IT Help Desk Assistant</div>
      <div class="company">University of Technology</div>
      <div class="dates">September 2022 - Present</div>
      <ul class="responsibilities">
        <li>Provide technical support to students and faculty</li>
        <li>Troubleshoot hardware and software issues</li>
        <li>Maintain IT documentation</li>
      </ul>
    </div>
  </div>
</section>
```

---

## Workshop: Experience Section Styling

```css
/* Experience Section */
#experience {
  padding: 3rem 0;
  background-color: #f5f5f5;
}

#experience h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.experience-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.experience-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: grid;
  grid-template-areas:
    "title"
    "company"
    "dates"
    "responsibilities";
  gap: 0.5rem;
}

.job-title {
  grid-area: title;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.company {
  grid-area: company;
  color: #0066cc;
}

.dates {
  grid-area: dates;
  color: #666;
  font-style: italic;
}

.responsibilities {
  grid-area: responsibilities;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.responsibilities li {
  margin-bottom: 0.5rem;
}
```

---

## Workshop: Making Experience Responsive

```css
/* Responsive Experience Section */
@media (min-width: 768px) {
  .experience-grid {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
  
  .experience-item {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title dates"
      "company company"
      "responsibilities responsibilities";
  }
  
  .job-title {
    font-size: 1.5rem;
  }
  
  .dates {
    text-align: right;
    align-self: center;
  }
}
```

---

## Homework

1. Complete the styling of the Education and Experience sections
2. Enhance the responsiveness for different screen sizes
3. Add transitions to hover effects for better interactivity
4. Start thinking about how to display your projects section (we'll implement it next class)

---

## Next Class: Advanced Styling & Animation

- Pseudo-classes and pseudo-elements
- CSS Variables (custom properties)
- Transitions and transforms
- Animations with @keyframes
- CSS Filters

---

## Questions?

---

## Resources

- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN: Using Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Flexbox Froggy](https://flexboxfroggy.com/) - A game for learning Flexbox
- [Grid Garden](https://cssgridgarden.com/) - A game for learning CSS Grid
