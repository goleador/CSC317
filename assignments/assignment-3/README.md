# Portfolio Styling Assignment: Human vs. AI CSS Challenge

## Overview
In this assignment, you will build upon your personal portfolio website by creating multiple CSS stylesheets using different approaches. You'll compare hand-written CSS with AI-generated styles and create a hybrid solution that demonstrates your understanding of effective CSS practices.

## Objectives
- Apply CSS concepts learned throughout the course to style your portfolio website
- Compare manual CSS development with AI-generated solutions
- Evaluate the strengths and weaknesses of different styling approaches
- Create a cohesive, professional design by combining the best elements from multiple sources

## Requirements

### 1. Hand-Written CSS (`styles.css`)
Create a completely handwritten CSS file that styles your portfolio website according to these specifications:
- Implement a responsive layout that works well on mobile, tablet, and desktop screens
- Use CSS variables for a consistent color scheme and easy theming
- Apply appropriate spacing, typography, and visual hierarchy
- Style all sections of your portfolio (navigation, about, education, experience, projects, skills)
- (OPTIONAL)Include at least one transition or animation effect
- Ensure all interactive elements have appropriate hover/focus states
- Add comments explaining your approach to each major section

### 2. AI-Generated CSS with Text Prompt (`ai-1.css`)
- Use an AI tool (like Claude, ChatGPT, or Copilot) to generate a complete CSS file
- Provide the AI with a detailed text prompt describing your desired look and feel
- Your prompt should include specific details about:
    - Color scheme preferences
    - Typography style
    - Layout preferences
    - Any specific design elements you want included
- Save the AI's response as `ai-1.css` without modifications
- Include your prompt as a comment at the top of the file

### 3. AI-Generated CSS with Image + Text Prompt (`ai-2.css`)
- Use an AI tool that accepts images as input (like Claude, Midjourney, DALL-E)
- Find a website, UI design, or style reference image that represents your desired aesthetic
- Create a prompt that includes both the image and text description
- Save the AI's response as `ai-2.css` without modifications
- Include a link to your reference image and your prompt as comments at the top of the file

### 4. Hybrid Solution (`hybrid.css`)
- Create a new CSS file that combines the best elements from at least two of your other CSS files
- Include comments that clearly identify which parts came from which source file
- Ensure the final design is cohesive and consistent
- Fix any issues or inconsistencies from the AI-generated code
- Add optimizations or improvements based on what you've learned in the course

## Folder Structure
Your assignment should be organized in the following folder structure:
```
/CSC317/assignments/assignment-3/
├── SUBMISSION.md      (Analysis document)
├── index.html         (Your portfolio HTML)
├── styles/
│   ├── styles.css     (Hand-written CSS)
│   ├── ai-1.css       (AI-generated with text prompt)
│   ├── ai-2.css       (AI-generated with image + text prompt)
│   └── hybrid.css     (Combined solution)
└── images/
│   └── [all images used in your portfolio incluiding images used for generation]
└── prompts/
│   ├── ai-1-css-prompt.md     (Prompt used for ai-1.css)
│   ├── ai-2-css-prompt.md     (Prompt used for ai-2.css)
│   └── [all images used in your portfolio incluiding images used for generation]
```

## Deliverables
1. Your original portfolio HTML file (`index.html`)
2. Four CSS files in the `styles` directory:
    - `styles.css` (hand-written)
    - `ai-1.css` (AI-generated with text prompt)
    - `ai-2.css` (AI-generated with image + text prompt)
    - `hybrid.css` (combined solution with source comments)
3. A `SUBMISSION.md` file containing:
    - A brief analysis (250-500 words) comparing the different approaches
    - Discussion of what you learned from this exercise
    - Which version you prefer and why

## Validation Requirements
- All HTML and CSS must be validated using:
    - [W3C HTML Validator](https://validator.w3.org/)
    - [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- 

## Assessment Criteria
- **Hand-written CSS (30%)**: Proper implementation of CSS concepts, responsiveness, code quality
- **AI Prompting (20%)**: Quality and specificity of prompts, resulting AI output quality
- **Hybrid Solution (30%)**: Thoughtful integration of multiple sources, improvements made, consistency
- **Analysis (20%)**: Depth of comparison, insights about the different approaches, lessons learned

## Bonus Challenge (Extra Credit)
Choose one of the following:
1. Create a theme switcher that allows toggling between your different CSS files with a button click
2. Add a CSS animation to your portfolio that was not present in any of the AI-generated versions
3. Implement dark mode using CSS variables in your hybrid solution

## Due Date
This assignment is due one week after Lecture 4.

## SUBMISSION.md Template

```markdown
# CSC 317 Assignment 2 Submission

**Name:** Your Name  
**Student ID:** 900######  
**GitHub Username:** yourgithubusername  
**Assignment Number:** 3

# Portfolio Styling Assignment Analysis

## Analysis
[Write a 250-500 word analysis comparing the different approaches]

## Lessons Learned
[Discuss what you learned from this exercise]

## Preferred Version
[Explain which version you prefer and why]
```