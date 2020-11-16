# Contributing
## General Workflow:
  Start by forking the repository.

  Next, cut a namespaced feature branch from master. Recommend naming conventions are listed below. 
  - bug/... 
  - feat/... 
  - test/... 
  - doc/... 
  - refactor/... 

  When make commits to your feature branch, rrefix each commit like so: 
  - (add) ...
  - (fix) ...
  - (refactor) ... 
  - (cleanup) ... 
  - (test) ... 
  - (doc) ... 
  
  When you’ve finished with your fix or feature, rebase upstream changes into your branch.
  
  Then, submit a pull request directly to master, describing your changes. Your pull request will be reviewed by another maintainer. If your code reviewer requests you make a change you don’t understand,we encourage you to speak to them. Once any issues raised by your code reviwer are addressed, push your fixes as a single new commit. 
  
  Lastly, once the pull request has been reviewed, it will be merged by another member of the team.

## Detailed Workflow
### Fork the repository
 Use github’s interface to make a fork of the repo, then add that repo as an upstream remote: 
 ```
 git remote add upstream https://github.com/reactorcore/<NAME_OF_REPO>.
 ```
Make a namespaced feature branch from main using the naming conventions above.
 
This command will creates your branch and brings you there
```
git checkout -b your-branch-name
```

Make commits to your feature branch. 
Prefix each commit like so:
-  (feat) ...
-  (fix) ...
-  (refactor) ... 
-  (cleanup) ... 
-  (test) ... 
-  (doc) ... 
 
 
 Make changes and commits on your branch, and make sure that you only make changes that are relevant to this branch. If you find yourself making unrelated changes, make a new branch for those changes. 
 
 ### Commit Message Guidelines 
 
 Commit messages should be written in the present tense; 
 e.g. “Fix continuous integration script”. 
 
 The first line of your commit message should be a brief summary of what the commit changes. Aim for about 70 characters max. 
 Remember: This is a summary, not a detailed description of everything that changed. If you want to explain the commit in more depth, following the first line should be a blank line and then a more detailed description of the commit. This can be as detailed as you want, so dig into details here and keep the first line short. 
 
 Rebase upstream changes into your branch. 
 Once you are done making changes, you can begin the process of getting your code merged into the main repo. 
 
**Step 1** is to rebase upstream changes to the main branch into yours by running this command from your branch: 
```
git pull --rebase upstream main
```
This will start the rebase process. You must commit all of your changes before doing this. If there are no conflicts, this should just roll all of your changes back on top of the changes from upstream, leading to a nice, clean, linear commit history. 

For **Step 2**, if there are conflicting changes, git will start yelling at you part way through the rebasing process. Git will pause rebasing to allow you to sort out the conflicts. You do this the same way you solve merge conflicts, by checking all of the files git says have been changed in both histories and picking the versions you want. Be aware that these changes will show up in your pull request, so try and incorporate upstream changes as much as possible. You pick a file by git adding it - you do not make commits during a rebase. 
```
git add {file name}
```
Once you are done fixing conflicts for a specific commit, run: 
```
git rebase --continue
```

## Guidelines
Uphold the current code standard: Keep your code [dry](https://metova.com/dry-programming-practices/). Apply the [boy scout rule](https://deviq.com/boy-scout-rule/#:~:text=Leave%20your%20code%20better%20than%20you%20found%20it.&text=The%20Boy%20Scout%20Rule%20can,cleaner%20than%20they%20found%20it). Run the test before submitting a pull request. Tests are very, very important. Submit tests if your pull request contains new, testable behavior. Your pull request is comprised of a single [squashed](https://medium.com/@slamflipstrom/a-beginners-guide-to-squashing-commits-with-git-rebase-8185cf6e62ec) commit.

## Checklist:
This is just to help you organize your process.
- Did I cut my work branch off of main (don’t cut new branches from existing feature brances)? 
- Did I follow the correct naming convention for my branch? 
- Is my branch focused on a single main change? 
- Do all of my changes directly relate to this change? 
- Did I rebase the upstream main branch after I finished all my work? 
- Did I write a clear pull request message detailing what changes I made? 
- Did I get a code review? 
- Did I make any requested changes from that code review? 

If you follow all of these guidelines and make good changes, you should have no problem getting your changes merged in.