# Bucks2Bar2 GitHub Repository Setup

## Project Preparation (Completed)

1. ✅ Renamed project from Bucks2Bar to Bucks2Bar2 in all relevant files
2. ✅ Updated README.md with the new project name and structure
3. ✅ Initialized Git repository
4. ✅ Created initial commit with all project files
5. ✅ Added GitHub setup instructions

## Next Steps (To Be Completed)

### Option 1: Use GitHub Web Interface

1. Go to [GitHub](https://github.com/) and sign in
2. Create a new repository named "bucks2bar2"
3. Run the following commands to connect your local repository:

```powershell
# In PowerShell
cd c:\projectcode\github-copilot-course\bucks2bar
git remote add origin https://github.com/YOUR-USERNAME/bucks2bar2.git
git push -u origin master
```

### Option 2: Install and Use GitHub CLI

1. Install GitHub CLI using one of the following methods:

```powershell
# Using Chocolatey
choco install gh

# Using Scoop
scoop install gh

# Using winget
winget install --id GitHub.cli
```

2. Authenticate with GitHub:

```powershell
gh auth login
```

3. Create repository and push code:

```powershell
cd c:\projectcode\github-copilot-course\bucks2bar
gh repo create bucks2bar2 --private --source=. --remote=origin --push
```

## Troubleshooting

If you encounter issues with folder renaming from "bucks2bar" to "bucks2bar2":

1. Close all applications that might be using files in the folder
2. Try renaming the folder again:

```powershell
cd c:\projectcode\github-copilot-course
Rename-Item -Path "bucks2bar" -NewName "bucks2bar2"
```

3. If that still doesn't work, you can:
   - Create a new folder named "bucks2bar2"
   - Copy all files from "bucks2bar" to "bucks2bar2"
   - Update the remote URL after pushing to GitHub:

```powershell
cd c:\projectcode\github-copilot-course\bucks2bar2
git remote set-url origin https://github.com/YOUR-USERNAME/bucks2bar2.git
```

## After GitHub Repository Creation

1. Visit your repository on GitHub to verify the code was uploaded successfully
2. Consider setting up GitHub Pages to host your website:
   - Go to repository Settings > Pages
   - Select the branch to deploy (usually 'master' or 'main')
   - Save the configuration
   - Your site will be published at `https://YOUR-USERNAME.github.io/bucks2bar2/`
