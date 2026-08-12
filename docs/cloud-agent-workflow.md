# Cloud agent workflow guidance

- For feature work, Cloud agents must create or switch to a working branch before making code changes.
- Name the working branch after the feature using a short kebab-case description, such as `feature/add-link-analytics`.
- If the feature changes behavior, add or update unit tests as part of the same change.
- Before opening a pull request, confirm that all unit tests pass.
- Pull requests created by Cloud agents must include comments that summarize what changed and note the validation that was run.