
module.exports = { extends: ["@commitlint/config-conventional"] }
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", [
      "feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"
    ]],
    "type-case": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-empty": [0],
    "header-max-length": [0, "always", 72]

  }
}