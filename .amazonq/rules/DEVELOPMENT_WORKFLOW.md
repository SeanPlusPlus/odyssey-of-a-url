# Development Workflow

## Commit Process

When Sean says "commit", follow this exact sequence:

1. **Format Code**: Run `npm run format` to apply Prettier formatting
2. **Lint Check**: Run `npm run lint` to check for ESLint errors
3. **Fix Issues**: If linting fails, run `npm run lint:fix` to auto-fix issues
4. **Professional Commit**: Use descriptive, professional commit messages following conventional commit format
5. **Push**: Push changes to remote repository

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
