# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Switched package manager from Bun to npm to resolve dependency resolution hanging issues during `mastra build` (addresses [Mastra issue #11575](https://github.com/mastra-ai/mastra/issues/11575)).
  - Removed `bunfig.toml` and `bun.lock`.
  - Updated scripts to use npm instead of bun.
  - Regenerated lock file with npm.

### Dependencies
- Updated dependencies via npm install, resolving peer dependency conflicts.