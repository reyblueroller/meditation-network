# Node Registry

This directory contains all registered meditation nodes in the Distributed Meditation Network.

## Structure

```
nodes/
├── template/
│   └── node-template.yaml    # Template for new nodes
└── [country]/
    └── [city]/
        └── [node-id].yaml    # Individual node files
```

## Registering a Node

1. Copy `template/node-template.yaml`
2. Fill in your node details
3. Save as `[country]/[city]/[unique-id].yaml`
4. Submit a pull request

See [Getting Started](../docs/getting-started.md) for detailed instructions.

## Node Naming Convention

- **Country**: Full country name in lowercase (e.g., `australia`, `united-states`)
- **City**: City name in lowercase (e.g., `sydney`, `new-york`)
- **Node ID**: Format `[city]-[number]` (e.g., `sydney-001`, `new-york-042`)

## Node Types

- **Physical**: In-person meditation sessions at a specific location
- **Virtual**: Online sessions via video conferencing
- **Hybrid**: Both physical and virtual participation options

## Requirements

All nodes must:
- Follow the [Heart Protocol](../docs/heart-protocol.md)
- Maintain peer structure (no gurus/teachers)
- Be completely free (no fees)
- Be open to new practitioners
- Update their YAML file if details change

## Directory

The searchable directory is auto-generated from these YAML files and published at GitHub Pages.

View the live directory: [Directory](../docs/directory.html)
