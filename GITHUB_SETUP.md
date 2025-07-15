# GitHub Repository Setup Instructions

To create a GitHub repository for your Bucks2Bar2 project and push your code to it, follow these steps:

## 1. Create a new repository on GitHub

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Enter "bucks2bar2" as the repository name
4. Add a description (optional): "A currency converter that shows how many drinks your money can buy around the world"
5. Choose whether the repository should be public or private
6. Do NOT initialize the repository with a README, .gitignore, or license since we're importing an existing project
7. Click "Create repository"

## 2. Connect your local repository to GitHub

After creating the repository, GitHub will show you commands to connect your existing local repository. Use the following commands:

```powershell
# Navigate to your project directory
cd c:\projectcode\github-copilot-course\bucks2bar

# Connect your local repository to the GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/bucks2bar2.git

# Push your code to GitHub
git push -u origin master
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 3. Verify the repository

1. Refresh the GitHub repository page
2. You should see all your project files now uploaded to GitHub

## 4. Additional steps (optional)

- Set up GitHub Pages to host your website
- Add collaborators to your repository
- Set up branch protection rules
- Configure GitHub Actions for CI/CD

## Need help?

If you encounter any issues, refer to [GitHub's documentation](https://docs.github.com/en/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line) for detailed instructions.
