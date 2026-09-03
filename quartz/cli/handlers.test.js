import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import test from "node:test"

test("sync pulls main without a v4 branch and preserves local content", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "quartz-sync-"))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const origin = path.join(root, "origin")
  const checkout = path.join(root, "checkout")
  const git = (cwd, ...args) =>
    execFileSync("git", ["-c", "commit.gpgsign=false", ...args], {
      cwd,
      encoding: "utf8",
      stdio: "pipe",
    }).trim()

  mkdirSync(origin)
  git(origin, "init", "--initial-branch=main")
  git(origin, "config", "user.name", "Quartz Test")
  git(origin, "config", "user.email", "quartz-test@example.invalid")
  writeFileSync(path.join(origin, "package.json"), JSON.stringify({ version: "4.5.2" }))
  mkdirSync(path.join(origin, "content"))
  writeFileSync(path.join(origin, "content/index.md"), "Original content\n")
  git(origin, "add", ".")
  git(origin, "commit", "-m", "Initial site")
  git(root, "clone", origin, checkout)
  git(checkout, "switch", "--create", "topic")
  writeFileSync(path.join(checkout, "content/index.md"), "Local unpublished content\n")

  writeFileSync(path.join(origin, "synced.txt"), "Update from main\n")
  git(origin, "add", "synced.txt")
  git(origin, "commit", "-m", "Update main")
  assert.equal(git(origin, "branch", "--format=%(refname:short)"), "main")

  const handler = new URL("./handlers.js", import.meta.url).href
  execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `const { handleSync } = await import(${JSON.stringify(handler)});
       await handleSync({ directory: "content", commit: false, pull: true, push: false });`,
    ],
    { cwd: checkout, stdio: "pipe", timeout: 15000 },
  )

  assert.equal(readFileSync(path.join(checkout, "synced.txt"), "utf8"), "Update from main\n")
  assert.equal(
    readFileSync(path.join(checkout, "content/index.md"), "utf8"),
    "Local unpublished content\n",
  )
  assert.equal(git(checkout, "branch", "--show-current"), "topic")
})
