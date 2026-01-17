#!/usr/bin/env node

/**
 * Node Directory Generator
 * Generates searchable HTML directory from node YAML files
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Paths
const NODES_DIR = path.join(__dirname, '../../nodes');
const DOCS_DIR = path.join(__dirname, '../../docs');
const OUTPUT_HTML = path.join(DOCS_DIR, 'directory.html');
const OUTPUT_JSON = path.join(DOCS_DIR, 'nodes.json');

/**
 * Recursively find all .yaml files in nodes directory
 */
function findNodeFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'template') {
      findNodeFiles(filePath, fileList);
    } else if (file.endsWith('.yaml') && !file.includes('template')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Parse YAML file and return node data
 */
function parseNodeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const node = yaml.load(content);

    // Add file path for reference
    node._filePath = path.relative(NODES_DIR, filePath);

    return node;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Generate HTML directory page
 */
function generateHTML(nodes) {
  const activeNodes = nodes.filter(n => n.status === 'active');
  const nodesByCountry = {};

  // Group by country
  activeNodes.forEach(node => {
    const country = node.location.country;
    if (!nodesByCountry[country]) {
      nodesByCountry[country] = [];
    }
    nodesByCountry[country].push(node);
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meditation Node Directory - DMN</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    header {
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      color: #2c3e50;
    }

    .tagline {
      font-size: 1.2em;
      color: #666;
      margin-bottom: 20px;
    }

    .search-filter {
      margin: 30px 0;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    input, select {
      padding: 10px 15px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      flex: 1;
      min-width: 200px;
    }

    .stats {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 30px;
      font-size: 0.95em;
      color: #666;
    }

    .country-section {
      margin-bottom: 40px;
    }

    .country-header {
      font-size: 1.8em;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
    }

    .node-card {
      background: #fafafa;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 20px;
      transition: box-shadow 0.2s;
    }

    .node-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 15px;
    }

    .node-name {
      font-size: 1.3em;
      font-weight: 600;
      color: #2c3e50;
    }

    .node-type {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85em;
      font-weight: 500;
      text-transform: capitalize;
    }

    .type-physical { background: #d4edda; color: #155724; }
    .type-virtual { background: #d1ecf1; color: #0c5460; }
    .type-hybrid { background: #fff3cd; color: #856404; }

    .node-location {
      font-size: 1.05em;
      color: #555;
      margin-bottom: 10px;
    }

    .node-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin: 15px 0;
      padding: 15px;
      background: white;
      border-radius: 4px;
    }

    .detail-item {
      font-size: 0.95em;
    }

    .detail-label {
      font-weight: 600;
      color: #666;
      display: block;
      margin-bottom: 5px;
    }

    .schedule {
      margin-top: 10px;
    }

    .session {
      background: white;
      padding: 8px 12px;
      margin: 5px 0;
      border-radius: 4px;
      font-size: 0.9em;
    }

    .contact {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #e0e0e0;
    }

    .contact a {
      color: #0066cc;
      text-decoration: none;
    }

    .contact a:hover {
      text-decoration: underline;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 1.1em;
    }

    footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 0.9em;
    }

    footer a {
      color: #0066cc;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      .container { padding: 20px; }
      h1 { font-size: 2em; }
      .node-details { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Meditation Node Directory</h1>
      <p class="tagline">Find peer meditation groups worldwide</p>
    </header>

    <div class="stats">
      <strong>${activeNodes.length}</strong> active nodes in <strong>${Object.keys(nodesByCountry).length}</strong> countries
    </div>

    <div class="search-filter">
      <input type="text" id="searchInput" placeholder="Search by location, city, or keywords..." />
      <select id="typeFilter">
        <option value="">All Types</option>
        <option value="physical">Physical</option>
        <option value="virtual">Virtual</option>
        <option value="hybrid">Hybrid</option>
      </select>
    </div>

    <div id="nodeList">
      ${Object.keys(nodesByCountry).sort().map(country => `
        <div class="country-section" data-country="${country}">
          <h2 class="country-header">${country}</h2>
          ${nodesByCountry[country].map(node => generateNodeCard(node)).join('')}
        </div>
      `).join('')}
    </div>

    <div id="noResults" class="no-results" style="display: none;">
      No nodes found matching your search.
    </div>

    <footer>
      <p>
        <a href="../README.md">About DMN</a> |
        <a href="getting-started.md">Start a Node</a> |
        <a href="heart-protocol.md">Heart Protocol</a> |
        <a href="https://github.com/meditation-network/meditation-network">GitHub</a>
      </p>
      <p style="margin-top: 10px;">Open source meditation infrastructure • No gurus, no hierarchy, no fees</p>
    </footer>
  </div>

  <script>
    // Search and filter functionality
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const nodeList = document.getElementById('nodeList');
    const noResults = document.getElementById('noResults');

    function filterNodes() {
      const searchTerm = searchInput.value.toLowerCase();
      const typeValue = typeFilter.value.toLowerCase();

      const countrySections = nodeList.querySelectorAll('.country-section');
      let visibleCount = 0;

      countrySections.forEach(section => {
        const cards = section.querySelectorAll('.node-card');
        let sectionHasVisible = false;

        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          const cardType = card.dataset.type;

          const matchesSearch = !searchTerm || text.includes(searchTerm);
          const matchesType = !typeValue || cardType === typeValue;

          if (matchesSearch && matchesType) {
            card.style.display = 'block';
            sectionHasVisible = true;
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        section.style.display = sectionHasVisible ? 'block' : 'none';
      });

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', filterNodes);
    typeFilter.addEventListener('change', filterNodes);
  </script>
</body>
</html>`;

  return html;
}

/**
 * Generate HTML for a single node card
 */
function generateNodeCard(node) {
  const sessions = node.schedule?.sessions || [];
  const contact = node.contact || {};

  return `
    <div class="node-card" data-type="${node.type}">
      <div class="node-header">
        <div class="node-name">${node.name}</div>
        <span class="node-type type-${node.type}">${node.type}</span>
      </div>

      <div class="node-location">
        📍 ${node.location.city}, ${node.location.region ? node.location.region + ', ' : ''}${node.location.country}
      </div>

      <div class="node-details">
        <div class="detail-item">
          <span class="detail-label">Timezone</span>
          ${node.location.timezone}
        </div>

        <div class="detail-item">
          <span class="detail-label">Typical Size</span>
          ${node.details?.size || 'Not specified'}
        </div>

        <div class="detail-item">
          <span class="detail-label">Languages</span>
          ${node.details?.languages?.join(', ') || 'Not specified'}
        </div>

        <div class="detail-item">
          <span class="detail-label">Established</span>
          ${node.details?.established || 'Not specified'}
        </div>
      </div>

      ${sessions.length > 0 ? `
        <div class="schedule">
          <span class="detail-label">Schedule:</span>
          ${sessions.map(s => `
            <div class="session">
              ${s.day} at ${s.time} (${s.duration} min)
            </div>
          `).join('')}
          ${node.schedule.notes ? `<p style="font-size: 0.9em; margin-top: 8px; color: #666;">${node.schedule.notes}</p>` : ''}
        </div>
      ` : ''}

      ${node.details?.notes ? `
        <p style="margin-top: 12px; font-size: 0.95em; color: #555;">${node.details.notes}</p>
      ` : ''}

      <div class="contact">
        <span class="detail-label">Contact:</span>
        ${contact.email ? `<div>Email: <a href="mailto:${contact.email}">${contact.email}</a></div>` : ''}
        ${contact.signal ? `<div>Signal: ${contact.signal}</div>` : ''}
        ${contact.matrix ? `<div>Matrix: ${contact.matrix}</div>` : ''}
        ${contact.meeting_url ? `<div>Meeting: <a href="${contact.meeting_url}" target="_blank">${contact.meeting_url}</a></div>` : ''}
        ${contact.notes ? `<p style="font-size: 0.85em; margin-top: 8px; color: #666;">${contact.notes}</p>` : ''}
      </div>
    </div>
  `;
}

/**
 * Main execution
 */
function main() {
  console.log('Generating meditation node directory...\n');

  // Find all node files
  const nodeFiles = findNodeFiles(NODES_DIR);
  console.log(`Found ${nodeFiles.length} node files`);

  // Parse all nodes
  const nodes = nodeFiles
    .map(parseNodeFile)
    .filter(node => node !== null);

  console.log(`Successfully parsed ${nodes.length} nodes`);

  // Generate outputs
  const html = generateHTML(nodes);
  const json = JSON.stringify(nodes, null, 2);

  // Write files
  fs.writeFileSync(OUTPUT_HTML, html);
  fs.writeFileSync(OUTPUT_JSON, json);

  console.log(`\n✓ Generated: ${OUTPUT_HTML}`);
  console.log(`✓ Generated: ${OUTPUT_JSON}`);
  console.log(`\nActive nodes: ${nodes.filter(n => n.status === 'active').length}`);
  console.log('Done!\n');
}

// Run
main();
