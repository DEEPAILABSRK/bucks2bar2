# GitHub CLI Command for Repository Creation

If you have GitHub CLI (`gh`) installed, you can create a GitHub repository and push your code with the following commands:

```powershell
# Navigate to your project directory
cd c:\projectcode\github-copilot-course\bucks2bar

# Create a new GitHub repository and push your code
gh repo create bucks2bar2 --private --source=. --remote=origin --push

# Or for a public repository
# gh repo create bucks2bar2 --public --source=. --remote=origin --push
```

If you don't have GitHub CLI installed, you can install it with:

```powershell
# Using Chocolatey
choco install gh

# Using Scoop
scoop install gh

# Using winget
winget install --id GitHub.cli
```

After installation, authenticate with GitHub:

```powershell
gh auth login
```

Then run the repository creation command above.

For more information about GitHub CLI, visit: https://cli.github.com/
