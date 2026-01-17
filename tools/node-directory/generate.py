import json
import requests
import re

# Configuration
REPO = "reyblueroller/meditation-network"
ISSUE_LABEL = "node-registration" # Make sure your Issues have this label

def fetch_node_issues():
    url = f"https://api.github.com/repos/{REPO}/issues?labels={ISSUE_LABEL}&state=all"
    response = requests.get(url)
    return response.json()

def parse_issue_body(body):
    # This regex looks for the fields in your Issue Template
    location = re.search(r"Location:\s*(.*)", body)
    op = re.search(r"Operator:\s*(.*)", body)
    return {
        "location": location.group(1).strip() if location else "Unknown",
        "operator": op.group(1).strip() if op else "Anonymous",
        "status": "active"
    }

def main():
    issues = fetch_node_issues()
    nodes = [parse_issue_body(i['body']) for i in issues if 'body' in i]
    
    with open('nodes.json', 'w') as f:
        json.dump({"nodes": nodes}, f, indent=4)

if __name__ == "__main__":
    main()