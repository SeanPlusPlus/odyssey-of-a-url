# Development Workflow

## Commit Process

When Sean says "commit", follow this exact sequence:

1. **Format and Fix**: Run `npm run fix` to apply Prettier formatting and ESLint auto-fixes
2. **Professional Commit**: Use descriptive, professional commit messages following conventional commit format
3. **Push**: Push changes to remote repository

## Commit Message Standards

- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Follow conventional commit format when appropriate:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests

## Quality Gates

- No Prettier formatting issues
- No ESLint errors
- All files properly formatted and linted before commit
