# Node Directory Generator

Generates searchable HTML directory from node YAML files.

## Usage

```bash
npm install
npm run generate
```

This will:
1. Scan all `.yaml` files in `nodes/` directory
2. Parse and validate node data
3. Generate `docs/directory.html` (searchable web page)
4. Generate `docs/nodes.json` (machine-readable data)

## Automatic Generation

The GitHub Actions workflow runs this automatically when:
- Node YAML files are updated
- Changes are pushed to main branch
- Pull requests modify node files

See `.github/workflows/deploy-directory.yml`

## Output Files

- **directory.html**: Interactive searchable directory with filtering
- **nodes.json**: JSON data for programmatic access

## Development

To test locally:

```bash
cd tools/node-directory
npm install
node generate-directory.js
```

Then open `../../docs/directory.html` in a browser.

## Dependencies

- `js-yaml`: YAML parsing
- Node.js >= 18

## License

MIT
