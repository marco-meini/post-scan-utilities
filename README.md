# Post scan utilities

At the moment this tool has only a comand to merge 2 pdf files alternating the pages.
This is useful after a scan of even pages and odd pages into two separate files, if the scanner has not double-sided option.

## Merge alternating

```bash
node dist/merge-alternating.js -h

Usage: merge-alternating [options]

Options:
  -V, --version             output the version number
  -f, --first-file <path>   First file to merge
  -s, --second-file <path>  Second file to merge
  -r, --revert-second       Revert seconf file pages (default: false)
  -o, --output-file <path>  Output file
  -h, --help                display help for command
```