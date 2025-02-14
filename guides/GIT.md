# Git Crash Course

## Initial Setup
```git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"```

## Basic Commands

### Starting a Repository
```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone <repository-url>
```

### Daily Workflow
```bash
# Check status of your repository
git status

# Add files to staging area
git add <filename>      # Add specific file
git add .              # Add all files

# Commit changes
git commit -m "Your commit message"

# Push changes current branch
git push

# Push changes to remote repository
git push origin <branch-name>

# Pull latest changes from remote
git pull origin <branch-name>
```

### Branch Management
```bash
# List all branches
git branch

# Create new branch
git branch <branch-name>

# Switch to a branch
git checkout <branch-name>

# Create and switch to new branch
git checkout -b <branch-name>

# Delete branch
git branch -d <branch-name>
```

### Merging
```bash
# Merge another branch into current branch
git merge <branch-name>

# Abort merge in case of conflicts
git merge --abort
```

## Advanced Operations

### Stashing
```bash
# Temporarily store modified files
git stash

# List stashed changes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{n}
```

### History and Logs
```bash
# View commit history
git log

# View compact log
git log --oneline

# View changes in commit
git show <commit-hash>
```

### Undoing Changes
```bash
# Discard changes in working directory
git checkout -- <filename>

# Reset staging area to last commit
git reset HEAD <filename>

# Undo last commit but keep changes
git reset --soft HEAD^

# Undo last commit and discard changes
git reset --hard HEAD^
```

### Remote Repository Management
```bash
# List remote repositories
git remote -v

# Add remote repository
git remote add <name> <url>

# Remove remote repository
git remote remove <name>
```

## Best Practices

1. Write clear, descriptive commit messages
2. Commit early and often
3. Create branches for new features
4. Pull before pushing to avoid conflicts
5. Don't commit sensitive information

## Common Workflows

### Feature Branch Workflow
1. Create feature branch: `git checkout -b feature-name`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push branch: `git push origin feature-name`
4. Create pull request
5. Merge after review

### Hotfix Workflow
1. Create hotfix branch: `git checkout -b hotfix-name`
2. Fix bug and commit: `git commit -m "Fix bug"`
3. Merge to main: `git checkout main && git merge hotfix-name`
4. Push changes: `git push origin main`

## Troubleshooting

### Common Issues
```bash
# Fix last commit message
git commit --amend -m "New message"

# Undo git add before commit
git reset

# Remove untracked files
git clean -fd

# Show conflicted files
git diff --name-only --diff-filter=U
```

### .gitignore Basics
Create a `.gitignore` file to exclude:
- Build directories
- Dependencies
- System files
- Personal IDE settings
- Sensitive information

Example `.gitignore`:
```
node_modules/
*.log
.env
.DS_Store
```

## Git Command Reference Sheet

### Setup and Configuration
- Configure name: `git config --global user.name "name"`
- Configure email: `git config --global user.email "email"`
- Configure editor: `git config --global core.editor "editor"`

### Repository Operations
- Initialize: `git init`
- Clone: `git clone <url>`
- Status: `git status`
- Add: `git add <file>`
- Commit: `git commit -m "message"`
- Push: `git push origin <branch>`
- Pull: `git pull origin <branch>`

### Branch Operations
- List: `git branch`
- Create: `git branch <name>`
- Switch: `git checkout <name>`
- Create & Switch: `git checkout -b <name>`
- Delete: `git branch -d <name>`
- Merge: `git merge <branch>`

Remember: Git is about tracking changes, not files. Always think in terms of changes you want to record and share.