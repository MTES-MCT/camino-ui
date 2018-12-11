# Contributing Guide

## Git setup

From the browser, go to the project repo on [Github](https://github.com): `https://github.com/MTES-MCT/camino-ui`

Click on the `fork` button to create your own fork of the project.

Then, from the terminal:

```bash
# Clone your fork locally. This add a remote named 'origin' pointing to your fork.
git clone git@github.com:<your-user-name>/camino-ui.git

# Go to the project directory
cd camino-ui

# Define the main repo as a remote named 'upstream'.
git remote add upstream https://github.com/MTES-MCT/camino-ui.git

# Now you have two remotes: 'origin' (your fork) and 'upstream' (main repo).
```

---

## Git workflow

### 1. Update your master

```bash
# Switch to your 'master' branch.
git checkout master

# Update your local 'master' branch with the 'master' branch from the 'upstream' remote.
git pull upstream master

# Update your 'origin' remote.
git push origin master
```

### 2. Create a fix branch

```bash
# Create a new branch for your fix, and switch to that branch.
git checkout -b <my-fixes>
```

### 3. Work on that branch

Do your work: create, modify and save files…

```bash
# Check the current files status.
git status

# Then commit changes.
git commit -a -m "fix: my fix message"

# When needed, update your '<my-fixes>' branch from 'upstream'.
git pull --rebase upstream master
```

**This can result in conflicts** and this is normal. Fixing them is part of the process. To avoid conflicts, **warn your co-workers so you don't work on the same files**.

### 4. Push your changes to your remote

```bash
# Push to the server
git push origin <my-fixes>
```

### 5. Make a merge request

Go to [github.com/MTES-MCT/camino-ui](https://github.com/MTES-MCT/camino-ui/). Make a new merge request from your `<my-fixes>` branch against the `master` branch from the main repo. See [Github Doc](http://docs.github.com/ce/github-basics/add-merge-request.html) for more details.

**For the next fix, start over at 1.**

### 6. Clean up

When the fix is merged in the main repo.

```bash
# Switch to your master branch.
git checkout master

# Delete the corresponding branch locally.
git branch -D <my-fixes>

# Delete the corresponding branch remotely.
git push origin --delete <my-fixes>
```

---

### Warnings

**Never commit api tokens**: remove those from code before committing or add the files name to the gitignore.
