# Advanced Styling & Animation
## Mini-Course Lecture 3

---

## Course Overview

- **Lecture 1:** CSS Foundations & Basic Layout ✓
- **Lecture 2:** Responsive Layouts with Flexbox & Grid ✓
- **Lecture 3:** Advanced Styling & Animation ← *We are here*
- **Lecture 4:** Forms, Final Polish & Best Practices

---

## Today's Agenda

1. Pseudo-classes and pseudo-elements
2. CSS Variables (custom properties)
3. Transitions and transforms
4. Animations with @keyframes
5. CSS Filters
6. Hands-on workshop: Styling Projects and Social Links sections

---

## Pseudo-Classes

Pseudo-classes select elements based on their state or position.

Common pseudo-classes:
```css
/* User action states */
a:hover { color: red; }
a:active { color: darkred; }
a:focus { outline: 2px solid blue; }

/* Form states */
input:focus { border-color: blue; }
input:disabled { background-color: #eee; }
input:checked + label { font-weight: bold; }

/* Structural */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background-color: #f5f5f5; }
li:nth-child(even) { background-color: #e9e9e9; }
li:nth-child(3n+1) { color: blue; } /* every 3rd starting with 1st */
```

---

## More Pseudo-Classes

```css
/* Validation states */
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { border-left: 4px solid blue; }

/* Link states */
a:link { color: blue; } /* unvisited */
a:visited { color: purple; } /* visited */

/* Negation and targeting */
:not(.special) { opacity: 0.8; } 
p:has(img) { padding: 1rem; } /* paragraphs containing images */
```

---

## Pseudo-Elements

Pseudo-elements create "virtual" elements to style specific parts of an element:

```css
/* First letter/line */
p::first-letter { font-size: 2em; font-weight: bold; }
p::first-line { font-style: italic; }

/* Before and after (content insertion) */
.icon::before {
  content: "★";
  margin-right: 5px;
  color: gold;
}

.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}

/* Selection styling */
::selection {
  background-color: yellow;
  color: black;
}
```

---

## ::before and ::after Power

Common uses for `::before` and `::after`:

- Decorative elements (icons, markers)
- Tooltips
- Clearfix (for float layouts)
- Overlays
- Borders and dividers
- Content indicators
- Counters

```css
/* Clearfix example */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

---

## CSS Variables (Custom Properties)

CSS Variables allow us to define reusable values:

```css
/* Defining variables in the :root scope (global) */
:root {
  --primary-color: #0066cc;
  --secondary-color: #ff6600;
  --padding-standard: 1rem;
  --border-radius: 5px;
  --font-heading: 'Georgia', serif;
  --font-body: 'Arial', sans-serif;
}

/* Using variables */
button {
  background-color: var(--primary-color);
  padding: var(--padding-standard);
  border-radius: var(--border-radius);
}

h1 {
  font-family: var(--font-heading);
  color: var(--primary-color);
}
```

---

## Variable Benefits & Scope

**Benefits:**
- Easier theming and maintenance
- More readable code
- Can be changed with JavaScript
- Can be scoped to specific elements
- Can be changed with media queries

**Scoping variables:**
```css
/* Global variables */
:root {
  --base-padding: 1rem;
}

/* Scoped variables */
.card {
  --card-padding: 1.5rem;
  padding: var(--card-padding);
}

/* Dark theme with variables */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: white;
    --bg-color: #333;
  }
}
```

---

## CSS Transitions

Transitions allow elements to change values over time:

```css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  
  /* transition: property duration timing-function delay; */
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: darkblue;
}
```

Multiple transitions:
```css
.card {
  transition: 
    background-color 0.5s ease,
    transform 0.3s ease-out,
    box-shadow 0.3s linear;
}
```

---

## Transition Properties

- `transition-property`: Which property to animate (`all` or specific properties)
- `transition-duration`: How long the transition takes (e.g., `0.3s`, `300ms`)
- `transition-timing-function`: The "rhythm" of the transition
  - `ease`: Slow start, then fast, then slow end (default)
  - `linear`: Constant speed
  - `ease-in`: Slow start
  - `ease-out`: Slow end
  - `ease-in-out`: Slow start and end
  - `cubic-bezier(n,n,n,n)`: Custom curve
- `transition-delay`: How long to wait before starting

---

## CSS Transforms

Transforms modify the appearance of elements without disrupting document flow:

```css
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  /* 2D Transforms */
  transform: translateY(-10px); /* Move up 10px */
  transform: scale(1.05); /* Grow by 5% */
  transform: rotate(5deg); /* Rotate 5 degrees */
  
  /* Combined transforms */
  transform: translateY(-10px) scale(1.05) rotate(1deg);
}
```

---

## More Transform Functions

**2D Transforms:**
- `translate(x, y)`, `translateX(n)`, `translateY(n)`
- `scale(x, y)`, `scaleX(n)`, `scaleY(n)`
- `rotate(angle)` - e.g., `rotate(45deg)`
- `skew(x-angle, y-angle)`, `skewX(angle)`, `skewY(angle)`

**3D Transforms:**
- `translateZ(n)`, `translate3d(x, y, z)`
- `scaleZ(n)`, `scale3d(x, y, z)`
- `rotateX(angle)`, `rotateY(angle)`, `rotateZ(angle)`
- `perspective(n)` - controls 3D perspective

---

## Transform Origin

You can change the point of origin for transforms:

```css
.card {
  transform-origin: center; /* Default */
  transform: rotate(10deg);
}

.custom-origin {
  /* Options: left, center, right, top, bottom, or percentages */
  transform-origin: top left;
  transform: rotate(10deg);
}
```

---

## CSS Animations

Animations allow elements to change styles over multiple steps:

```css
/* Step 1: Define the keyframes */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Step 2: Apply the animation */
.bouncing-element {
  animation: bounce 1s ease infinite;
}
```

---

## Animation Properties

```css
.element {
  /* Individual properties */
  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite; /* or a number */
  animation-direction: normal; /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: forwards; /* none, forwards, backwards, both */
  animation-play-state: running; /* running, paused */
  
  /* Shorthand */
  animation: bounce 1s ease 0s infinite normal forwards;
}
```

---

## Multiple Animations

```css
.loading-icon {
  /* Multiple animations on one element */
  animation: 
    spin 2s linear infinite,
    pulse 3s ease-in-out infinite alternate;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  from { opacity: 0.4; }
  to { opacity: 1; }
}
```

---

## CSS Filters

Filters apply visual effects similar to image processing:

```css
.image {
  /* Single filter */
  filter: grayscale(100%);
  
  /* Multiple filters */
  filter: contrast(150%) brightness(110%);
  
  /* Transition for filters */
  transition: filter 0.3s ease;
}

.image:hover {
  filter: grayscale(0%);
}
```

---

## Common Filter Functions

- `blur(px)` - Applies a Gaussian blur
- `brightness(%)` - Adjusts brightness
- `contrast(%)` - Adjusts contrast
- `grayscale(%)` - Converts to grayscale
- `hue-rotate(deg)` - Shifts hue
- `invert(%)` - Inverts colors
- `opacity(%)` - Adjusts opacity
- `saturate(%)` - Adjusts saturation
- `sepia(%)` - Converts to sepia
- `drop-shadow(x y blur color)` - Adds shadow (similar to box-shadow)

---

## Let's Start the Workshop

**Portfolio Website Part 3:**
- Styling the Projects section
- Creating interactive project cards
- Designing the social links section
- Adding animations and transitions

---

## Workshop: Projects Section HTML Update

```html
<section id="projects">
  <h2>Projects</h2>
  
  <div class="projects-container">
    <div class="project-card">
      <div class="project-image">
        <img src="/api/placeholder/300/200" alt="Weather App Screenshot">
      </div>
      <div class="project-content">
        <h3><a href="https://github.com/johndoe/weather-app" target="_blank">Weather App</a></h3>
        <p>A web application that shows real-time weather information.</p>
        <div class="project-tags">
          <span class="tag">HTML</span>
          <span class="tag">CSS</span>
          <span class="tag">JavaScript</span>
          <span class="tag">API</span>
        </div>
      </div>
    </div>
    
    <div class="project-card">
      <div class="project-image">
        <img src="/api/placeholder/300/200" alt="Task Manager Screenshot">
      </div>
      <div class="project-content">
        <h3><a href="https://github.com/johndoe/task-manager" target="_blank">Task Manager</a></h3>
        <p>A simple task management application.</p>
        <div class="project-tags">
          <span class="tag">HTML</span>
          <span class="tag">CSS</span>
          <span class="tag">JavaScript</span>
          <span class="tag">LocalStorage</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Workshop: Projects Section Styling

```css
/* Projects Section */
#projects {
  padding: 3rem 0;
}

#projects h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.projects-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.project-image {
  width: 100%;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  margin-bottom: 0.8rem;
}

.project-content h3 a {
  color: var(--primary-color, #0066cc);
  text-decoration: none;
  transition: color 0.3s ease;
}

.project-content h3 a:hover {
  color: var(--secondary-color, #004499);
}

.project-content p {
  color: #555;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;