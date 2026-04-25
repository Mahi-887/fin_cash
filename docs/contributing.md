# Contributing

Thank you for contributing to FinVerse AI!

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes following the style guide below
4. Commit: `git commit -m "feat: add my feature"`
5. Push: `git push origin feat/my-feature`
6. Open a pull request against `main`

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation only |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Tooling, deps, config |

## Code Style

- **TypeScript**: strict mode enabled; no `any` without justification
- **Python**: PEP 8; use type hints; Ruff for linting
- **React**: functional components + hooks; no class components
- **Naming**: camelCase for TS/JS, snake_case for Python

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Include a description of what changed and why
- Ensure no new TypeScript errors (`npm run type-check`)
- Test your changes locally before submitting

## Reporting Issues

Open a GitHub issue with:
1. Steps to reproduce
2. Expected vs actual behaviour
3. Environment (OS, Node version, browser)
