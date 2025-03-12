# CSS Quiz 1 - Study Guide

This study guide covers the key concepts you'll need to know for the CSS quiz. Use this as a reference to prepare for both the multiple-choice questions and the coding section.

## CSS Box Model

![CSS Box Model](box-model.png)

- **Content**: The actual content of the element (text, images, etc.)
- **Padding**: The space between the content and the border
- **Border**: The line that surrounds the padding
- **Margin**: The space outside the border

**Key Properties**:
- `padding`: Adds space inside an element (between content and border)
- `margin`: Adds space outside an element (between border and other elements)
- `border`: Creates a visible border around an element

**Box Sizing**:
- `box-sizing: content-box`: Default. Width/height applies to content only
- `box-sizing: border-box`: Width/height includes padding and border, making layout calculations more intuitive

## CSS Units

**Absolute Units**:
- `px`: Pixels - fixed size regardless of screen size

**Relative Units**:
- `em`: Relative to the font-size of the element
- `rem`: Relative to the font-size of the root element (html)
- `%`: Relative to the parent element
- `vw/vh`: Relative to the viewport width/height

**Benefits of Relative Units**:
- Better accessibility - respects user font size preferences
- More responsive designs - scales with screen size
- Easier maintenance - change one value to scale many

## Layout Models

### Flexbox

```css
.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: space-between; /* horizontal alignment */
  align-items: center; /* vertical alignment */
}
```

**Key Concepts**:
- **Main Axis**: Determined by `flex-direction` (horizontal for row, vertical for column)
- **Cross Axis**: Perpendicular to the main axis
- **Main Axis Alignment**: `justify-content`
- **Cross Axis Alignment**: `align-items`

**When to Use Flexbox**:
- One-dimensional layouts (row OR column)
- Navigation menus
- Centering elements
- Distributing space among items

### CSS Grid

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto;
  gap: 10px;
}
```

**Key Concepts**:
- **Grid Container**: Element with `display: grid`
- **Grid Items**: Direct children of the grid container
- **Grid Lines**: The lines between rows and columns
- **Grid Tracks**: The rows and columns of the grid
- **Grid Cells**: The intersection of a row and column

**When to Use Grid**:
- Two-dimensional layouts (rows AND columns)
- Image galleries
- Complex page layouts
- Card layouts

### Choosing Between Flexbox and Grid

- Use **Flexbox** for simpler one-dimensional layouts
- Use **Grid** when you need precise control over both rows and columns
- Sometimes the best approach is to use both (Grid for the overall layout, Flexbox for components within it)

## CSS Selectors and Specificity

**Types of Selectors** (from lowest to highest specificity):
1. Universal selector (`*`)
2. Element selectors (`div`, `p`, `h1`)
3. Class selectors (`.container`, `.button`)
4. ID selectors (`#header`, `#nav`)
5. Inline styles (`style="color: red;"`)
6. `!important` (use sparingly!)

**Specificity Rules**:
- More specific selectors override less specific ones
- When specificity is equal, the last defined rule wins
- ID selectors have higher specificity than class selectors
- Class selectors have higher specificity than element selectors

## Responsive Design

```css
/* Mobile first approach */
.container {
  width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 970px;
  }
}
```

**Media Queries**:
- Allow you to apply different styles based on device characteristics
- Common breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop)
- `min-width` vs `max-width`: 
  - `min-width` is better for mobile-first approach
  - `max-width` is better for desktop-first approach

## CSS Transitions and Animations

**Transitions**: Simple property changes triggered by state changes

```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: darkblue;
}
```

**Animations**: More complex, multi-step animations that can run automatically

```css
@keyframes slide-in {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

.element {
  animation: slide-in 0.5s forwards;
}
```

**Key Differences**:
- Transitions need a trigger (like hover)
- Animations can play automatically when page loads
- Animations can have multiple keyframes (steps)

## CSS Positioning

```css
.element {
  position: relative;
  top: 10px;
  left: 20px;
}
```

**Position Values**:
- `static`: Default. Elements follow normal document flow
- `relative`: Positioned relative to its normal position
- `absolute`: Positioned relative to its nearest positioned ancestor
- `fixed`: Positioned relative to the viewport, stays in place when scrolling
- `sticky`: A hybrid that becomes fixed when it reaches a specified position

**Common Use Cases**:
- `fixed` for headers/navbars that stay visible when scrolling
- `absolute` for positioning elements precisely within a container
- `relative` for creating a positioning context for absolute elements
- `sticky` for elements that should stick after scrolling to a certain point

## Styling Navigation Menus

**Horizontal Navigation**:

```css
/* Using flexbox */
nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-right: 15px;
}

nav a {
  text-decoration: none;
  padding: 10px;
  display: block;
}

nav a:hover {
  color: #0066cc;
}
```

**Key Properties for Navigation Styling**:
- `list-style-type: none`: Removes bullet points
- `display: flex` or `display: inline-block`: Makes list items appear horizontally
- `text-decoration: none`: Removes underlines from links
- `padding`: Creates clickable area around links
- `:hover` pseudo-class: Changes styles when user hovers over links

## Other Important CSS Properties

**Text Styling**:
- `font-family`: Sets the font
- `font-size`: Sets the text size
- `line-height`: Sets the space between lines
- `text-align`: Controls horizontal text alignment
- `text-shadow`: Adds shadow effects to text

**Box Styling**:
- `border-radius`: Creates rounded corners
- `box-shadow`: Adds shadow effects to elements
- `opacity`: Controls transparency

**Background Properties**:
- `background-color`: Sets a solid background color
- `background-image`: Sets a background image
- `background-size`: Controls how the background image is sized
- `background-position`: Controls the position of the background image

## Best Practices for Clean CSS

1. **Use a consistent naming convention**
2. **Group related properties together**
3. **Use shorthand properties when possible**
4. **Add comments for complex code sections**
5. **Use a CSS reset or normalize.css to ensure cross-browser consistency**
6. **Keep selectors as simple as possible**
7. **Avoid using !important**
8. **Use variables for repeated values (colors, spacing, etc.)**

## Coding Exercise Practice

### Creating a Horizontal Navigation Menu

When creating a horizontal navigation menu, you'll typically start with a structure like this:

```html
<nav class="main-nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

**Steps to Create a Horizontal Navigation Menu**:
1. Remove default bullet points and spacing from the list
2. Make list items display horizontally (using flexbox or inline-block)
3. Add padding to create clickable areas
4. Style the links (color, remove underlines)
5. Add hover effects for better user feedback
6. Add background color to the navigation container
7. Ensure proper spacing between items

## Key Terms to Know

- **Box Model**: How content, padding, border, and margin work together
- **Flexbox**: A one-dimensional layout model
- **Grid**: A two-dimensional layout model
- **Specificity**: How browsers decide which CSS rules to apply
- **Media Query**: A feature that applies different styles based on device characteristics
- **Responsive Design**: Design approach that makes websites work well on all devices
- **Pseudo-class**: Selector that targets elements in a specific state (like :hover)
- **Pseudo-element**: Selector that targets a specific part of an element (like ::before)
- **Position**: How elements are positioned in the document flow
- **Transition**: Smooth change between property values
- **Animation**: Multi-step animation defined with keyframes