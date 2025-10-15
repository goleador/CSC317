# CSC317 Assignment 3 - Portfolio Styling Assignment (Group Version)
## Human vs. AI CSS Challenge

## Group Information Requirements

**THIS IS A GROUP ASSIGNMENT**: Students work in their already-formed groups of 3-4 members. Each group submits ONE solution.

### Submission Requirements

- **Elect one group member** to submit the assignment via their existing CSC317 repository
- **Submission location**: Submit in the `assignments/3/` folder of the elected member's repository
- **Portfolio copies**: All group members should keep a copy of the final project for their personal portfolios
- **Group identification**: Include group information in your submission markdown (see format below)

## Overview
In this group assignment, you will collaboratively build upon a personal portfolio website by creating multiple CSS stylesheets using different approaches. Your group will compare hand-written CSS with AI-generated styles and create a hybrid solution that demonstrates collective understanding of effective CSS practices.

## Objectives
- Apply CSS concepts learned throughout the course to style a portfolio website
- Compare manual CSS development with AI-generated solutions through group collaboration
- Evaluate the strengths and weaknesses of different styling approaches as a team
- Create a cohesive, professional design by combining the best elements from multiple sources
- Demonstrate effective group collaboration and Git workflow practices

## Assignment Requirements

### 1. Hand-Written CSS (`styles.css`) - **Group Responsibility**
**Assigned to: [Member Name 1] and [Member Name 2]** - Collaboratively create a handwritten CSS file:
- Implement a responsive layout that works well on mobile, tablet, and desktop screens
- Use CSS variables for a consistent color scheme and easy theming
- Apply appropriate spacing, typography, and visual hierarchy
- Style all sections of the portfolio (navigation, about, education, experience, projects, skills)
- (OPTIONAL) Include at least one transition or animation effect
- Ensure all interactive elements have appropriate hover/focus states
- Add comments explaining your approach to each major section
- **Work Distribution**: Divide sections between both members (e.g., Member 1: header/nav/footer, Member 2: main content sections)

### 2. AI-Generated CSS with Text Prompt (`ai-1.css`) - **Group Responsibility**
**Assigned to: [Member Name 3]** - Use an AI tool to generate a complete CSS file:
- Use an AI tool (like Claude, ChatGPT, or Copilot) to generate a complete CSS file
- Provide the AI with a detailed text prompt describing desired look and feel
- Your prompt should include specific details about:
    - Color scheme preferences
    - Typography style
    - Layout preferences
    - Any specific design elements you want included
- Save the AI's response as `styles/ai-1.css` without modifications
- Save the prompt used as `prompts/ai-1-css-prompt.md`

### 3. AI-Generated CSS with Image + Text Prompt (`ai-2.css`) - **Group Responsibility**
**Assigned to: [Member Name 4]** - Create AI-generated CSS with visual reference:
- Use an AI tool that accepts images as input (like Claude, Midjourney, DALL-E)
- Find a website, UI design, or style reference image that represents desired aesthetic
- Create a prompt that includes both the image and text description
- Save the AI's response as `styles/ai-2.css` without modifications
- Save the prompt used as `prompts/ai-2-css-prompt.md`
- **If 3-member group**: Member 3 handles both AI-generated CSS files

### 4. Hybrid Solution (`hybrid.css`) - **Group Collaborative Effort**
**Assigned to: All Members** - Create a new CSS file that combines the best elements:
- Combine the best elements from at least two of your other CSS files
- Include comments that clearly identify which parts came from which source file
- Ensure the final design is cohesive and consistent
- Fix any issues or inconsistencies from the AI-generated code
- Add optimizations or improvements based on course learning

### 5. CSS Switcher Implementation - **Group Responsibility**
**Assigned to: All Members (collaborative)** - Implement the provided JavaScript switcher:
- Integrate the provided `switcher.js` file
- Create navigation/button interface for switching between CSS files
- Ensure all stylesheets work properly with the switcher
- Test functionality across different browsers and devices

### Group Collaboration Requirements

1. **Git Workflow**: Use branches, pull requests, and code reviews
2. **Communication**: Document group meetings and decisions
3. **Code Review**: All code must be reviewed by at least one other member
4. **Documentation**: Maintain clear documentation throughout development
5. **Equal Participation**: Ensure meaningful contribution from all members

### File Structure Requirements

The elected group member's repository should include the assignment in the following structure:
```
[username]/CSC317/
└── assignments/
    └── 3/
        ├── GROUP_INFO.md
        ├── SUBMISSION.md
        ├── index.html          (Portfolio HTML)
        ├── styles/
        │   ├── styles.css      (Hand-written CSS - collaborative)
        │   ├── ai-1.css        (AI-generated with text prompt)
        │   ├── ai-2.css        (AI-generated with image + text prompt)
        │   └── hybrid.css      (Combined solution)
        ├── js/
        │   └── switcher.js     (Provided JavaScript)
        ├── images/
        │   └── [all images used in portfolio and for AI generation]
        └── prompts/
            ├── ai-1-css-prompt.md
            ├── ai-2-css-prompt.md
            └── [reference images used for AI generation]
```

**Important**: All group members should copy the final project to their own repositories in the same `assignments/3/` structure for portfolio purposes.

## Validation Requirements
- All HTML and CSS must be validated using:
    - [W3C HTML Validator](https://validator.w3.org/)
    - [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- Group must ensure all files pass validation before submission

## Assessment Criteria

### Project Quality (80%)

All components of the project will be evaluated using the same four criteria:

#### Completeness (20%)
- **Hand-written CSS**: All required sections styled, responsive layout fully implemented, CSS variables used
- **AI-Generated CSS**: Complete prompts documented, resulting CSS files saved without modification
- **Hybrid Solution**: Thoughtful integration combining elements from multiple sources with clear attribution
- **Switcher Implementation**: Fully functional JavaScript integration with appropriate UI elements
- **Documentation**: Complete GROUP_INFO.md and SUBMISSION.md with all required sections

#### Correctness (20%)
- **HTML/CSS Validation**: All files pass W3C HTML and CSS validators without errors
- **Functional Implementation**: All CSS files work properly with the portfolio HTML
- **Cross-browser Compatibility**: Consistent functionality across major browsers (Chrome, Firefox, Safari, Edge)
- **Responsive Design**: Layout works correctly across mobile, tablet, and desktop breakpoints
- **JavaScript Functionality**: Switcher works without errors and smoothly transitions between styles

#### Look and Feel (20%)
- **Visual Design Quality**: Professional appearance with effective use of color, typography, and spacing
- **Layout Consistency**: Well-organized visual hierarchy and balanced compositions
- **User Experience**: Intuitive navigation and interaction patterns
- **Aesthetic Appeal**: Cohesive design that enhances the portfolio's presentation
- **Design System**: Consistent styling patterns and visual elements across all versions

#### Best Practices (20%)
- **CSS Organization**: Logical structure, meaningful class names, appropriate commenting
- **Separation of Concerns**: Clear distinction between content (HTML), presentation (CSS), and behavior (JS)
- **Semantic HTML**: Proper use of HTML5 semantic elements and accessibility considerations
- **Code Quality**: Clean, readable code with consistent formatting and naming conventions
- **Performance**: Optimized CSS without unnecessary redundancy or inefficient selectors

### Collaboration (20%)
- **Git Participation**: At least one meaningful commit per group member with descriptive commit messages
- **Work Distribution**: Clear evidence of balanced responsibilities and meaningful contributions from all members
- **Code Review Process**: Evidence of collaborative review and improvement through pull requests or documented feedback
- **Documentation Quality**: Complete and accurate group documentation showing collaborative effort

## Group Submission Format

Your elected group member's repository must include a `GROUP_INFO.md` file with the following format:

```markdown
# Group Information

**Group Members:**
- [Student Name 1] - [Student ID] - [GitHub Username] - **Hand-written CSS (Part 1)**
- [Student Name 2] - [Student ID] - [GitHub Username] - **Hand-written CSS (Part 2)**
- [Student Name 3] - [Student ID] - [GitHub Username] - **AI Text Prompt CSS**
- [Student Name 4] - [Student ID] - [GitHub Username] - **AI Image+Text Prompt CSS** (if applicable)

**Elected Submitter:** [Name and GitHub username of person submitting]
**Repository Link:** https://github.com/[submitter-username]/CSC317/tree/main/assignments/3

## Work Distribution
- Hand-written CSS (Collaborative): [Member 1 Name] and [Member 2 Name]
  - [Member 1]: [Specific sections/responsibilities]
  - [Member 2]: [Specific sections/responsibilities]
- AI Text Prompt CSS: [Member 3 Name]
- AI Image+Text Prompt CSS: [Member 4 Name] (or Member 3 if 3-person group)
- Hybrid Solution: [All Members - collaborative effort]
- Switcher Implementation: [All Members - collaborative effort]
- Documentation & Analysis: [Lead member name(s)]
```

## SUBMISSION.md Template

```markdown
# CSC 317 Assignment 3 Group Submission

**Group Members:**
- [Student Name 1] - [Student ID] - [GitHub Username]
- [Student Name 2] - [Student ID] - [GitHub Username]
- [Student Name 3] - [Student ID] - [GitHub Username]
- [Student Name 4] - [Student ID] - [GitHub Username] (if applicable)

**Elected Submitter:** [Name and GitHub username]
**Repository Link:** https://github.com/[submitter-username]/CSC317/tree/main/assignments/3

# Portfolio Styling Assignment Analysis

## Group Analysis (250-500 words)
[Write a collaborative analysis comparing the different approaches. Each member should contribute to this section.]

## Individual Reflections

### [Member 1 Name] - Hand-written CSS (Part 1)
[Individual reflection on lessons learned and contribution to hand-written CSS]

### [Member 2 Name] - Hand-written CSS (Part 2)
[Individual reflection on lessons learned and contribution to hand-written CSS]

### [Member 3 Name] - AI Text Prompt CSS
[Individual reflection on AI prompting experience and lessons learned]

### [Member 4 Name] - AI Image+Text Prompt CSS (if applicable)
[Individual reflection on AI prompting with images and lessons learned]

## Group Preferred Version
[Explain which version the group prefers and why - this should be a consensus decision]

## Collaboration Experience
[Describe how the group worked together, challenges faced, and lessons learned about teamwork]
```

## Bonus Challenge (Extra Credit) - **Group Optional**
Choose one of the following as a group:
1. **Enhanced Theme Switcher**: Extend the provided switcher with additional features like:
   - Smooth transitions between styles
   - Local storage to remember user preference
   - Additional custom themes created by the group
2. **Advanced CSS Animation**: Add a complex CSS animation to your portfolio that was not present in any of the AI-generated versions
3. **Accessibility Enhancement**: Implement comprehensive accessibility features including:
   - Dark mode using CSS variables in hybrid solution
   - Screen reader optimization
   - Keyboard navigation improvements
4. **Performance Optimization**: Optimize all CSS files for performance and create a detailed performance comparison report

## Submission Process

1. **Elect Submitter**: Your group chooses one member whose repository will be used for submission
2. **Repository Setup**: The elected member creates the `assignments/3/` folder structure in their existing CSC317 repository
3. **Add Collaborators**: The elected member adds all group members as collaborators to their repository
4. **Development Workflow**: 
   - Use feature branches for different CSS files
   - Create pull requests for code review
   - Merge only after group approval
5. **Portfolio Copies**: After completion, all group members copy the final project to their own `assignments/3/` folders
6. **Final Submission**: The assignment is automatically submitted via the elected member's repository

## Important Notes

- **Single Repository**: Only the elected member's repository counts for submission
- **Portfolio Preservation**: All members should maintain personal copies for their portfolios
- **Late Penalties**: Apply to the entire group
- **Academic Integrity**: All group members are responsible for the submitted work
- **Individual Accountability**: Instructor may ask individual members to explain any part of the submission
- **Balanced Participation**: Hand-written CSS requires two members to ensure workload distribution

## Getting Started

1. **Assign roles** within your existing group:
   - Two members for hand-written CSS (divide sections between them)
   - One member for AI text prompt CSS
   - One member for AI image+text prompt CSS (or same member as text prompt if 3-person group)
2. **Elect the submitter** whose repository will be used
3. **Create the assignment folder** structure in the elected member's repository
4. **Set up collaboration** by adding all members as collaborators
5. **Plan the design approach** as a group before starting individual work
6. **Begin development** using collaborative Git workflow

## Due Date
This assignment is due Oct 26th at midnight. 

## Tips for Success

- **Plan Early**: Discuss design direction as a group before starting individual CSS files
- **Communicate Regularly**: Use Discord for ongoing communication
- **Review Each Other's Work**: Use GitHub to code review eachothers code.
- **Test Everything**: Ensure all CSS files work properly with the switcher
- **Document Everything**: Keep detailed records of your collaboration process

**Remember**: This is a collaborative effort that combines individual creativity with team coordination. Plan your work, communicate effectively, and ensure all members contribute meaningfully to create a professional portfolio showcase.
