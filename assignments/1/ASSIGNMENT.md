
# CSC317 F25 Assignment One

## Getting Started with GitHub

### Objective

The goal of this assignment is to get familiar with GitHub, the command line, and the basics of version control. By the end of the assignment, you will:

1. Create a GitHub account (if you don’t already have one).
2. Fill out the **GitHub Form**: [CSC317 GitHub Form](https://docs.google.com/forms/d/e/1FAIpQLSeZFR6TxnDzMDKFLMgIRvb66Y32-AVzlmNjC4VIamDtZxQoJg/viewform?usp=header).
3. Create a GitHub repository named `CSC317` (exactly).
4. Use the command line to add, commit, and push two files, `README.md` and `index.html`, to the repository.

---

### Instructions

#### 1. Create a GitHub Account
1. If you don’t already have a GitHub account, go to [GitHub Signup](https://github.com/) and create one.  
2. Log in to your GitHub account.

#### 2. Fill Out the CSC317 GitHub Form
- Click here to access the form: [CSC317 GitHub Form](https://docs.google.com/forms/d/1O9Y0Byrqt93SeCU30pHBuoxGla-VFS0HVutbQKWmrgM/edit).  
- Provide all the required information, including your:
  - Full name  
  - GitHub username  
  - SFSU email address  
  - Link to your GitHub profile (e.g., `https://github.com/yourusername`)  
  - Link to the repository you’ll create for this assignment (you can update this later after completing Step 6).  
- Submit the form.

#### 3. Set Up Git
Ensure Git is installed and configured on your computer.  

**Check if Git is Installed**
```bash
git --version
````

If Git is installed, you’ll see the version number. If not, install Git as follows:

* [Installing Git](https://git-scm.com/downloads)
* [Configuring Git](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git)
* [Authentication (SSH setup)](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)

#### 4. Create a Repository on GitHub

1. Log in to your GitHub account.
2. Follow this guide: [Creating a Repository](https://docs.github.com/en/get-started/quickstart/create-a-repo).

   * Name your repository `CSC317`.
   * Leave the repository **public**.
   * Do **NOT** initialize it with a README file.

#### 5. Clone the Repository and Add Files

**5.1. Clone Your Repository**
Follow this guide: [Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

**5.2. Create Files Locally**

* Create a `README.md` file with the following content:

```markdown
# CSC317 Repository
```

* Create an `index.html` file with the following content:

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSC317</title>
</head>
<body>
    <h1>Hello CSC317</h1>
</body>
</html>
```

**5.3. Add and Commit Files**

```bash
git add README.md index.html
git commit -m "Initial commit with README.md and index.html"
```

**5.4. Push Files to GitHub**

```bash
git push origin main
```

#### 6. Verify Your Work

1. Open your GitHub repository.
2. Ensure that the `README.md` and `index.html` files are visible.

#### 7. Submission

Submit your **repository link** on the course’s assignment page, and ensure the repository is public.

---

### Troubleshooting

* **Git Push Authentication Issues**: Use a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) if prompted for a password. Replace your password with this token.
* **Git Errors**: If you encounter issues, take a screenshot or copy the error and share it on the class forum for assistance.

---

Good luck!s