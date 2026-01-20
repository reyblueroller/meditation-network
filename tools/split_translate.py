import requests
import subprocess
import os
import sys

# FIX: Force UTF-8 for Windows Console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

MODEL = "demonbyron/HY-MT1.5-1.8B:latest"

def call_ollama(prompt):
    """Communicates with Ollama via the Local API for full control."""
    url = "http://localhost:11434/api/generate"
    
    # We set num_predict to -1 (infinite/max) so it never stops midway
    # We set num_ctx to 8192 to give it a large memory window
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {
            "num_predict": -1,  
            "num_ctx": 8192,
            "temperature": 0.3
        }
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json().get("response", "").strip()
    except Exception as e:
        print(f"API Connection Error: {e}")
        return ""

def split_text(text):
    """Splits text into two halves at the nearest paragraph break."""
    midpoint = len(text) // 2
    # Look for the nearest double newline to split cleanly
    split_pos = text.find('\n\n', midpoint)
    if split_pos == -1:
        split_pos = midpoint
    return text[:split_pos], text[split_pos:]

def translate_large_file(file_path, target_lang):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        return
    
    # Expanded mapping including Korean
    lang_map = {
        'es': 'Spanish', 'de': 'German', 'fr': 'French', 
        'zh': 'Simplified Chinese', 'pt': 'Portuguese', 
        'nl': 'Dutch', 'sv': 'Swedish', 'ja': 'Japanese', 
        'hi': 'Hindi', 'ko': 'Korean'  # Added Korean here
    }
    
    target_language = lang_map.get(target_lang, target_lang)

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    part1, part2 = split_text(content)
    
    translated_parts = []
    for i, part in enumerate([part1, part2]):
        print(f"  -> Translating Part {i+1}/2 to {target_language}...")
        
        # Refined prompt for pure translation
        prompt = f"Translate the following Markdown to {target_language}. Output ONLY the translated text. Preserve ALL frontmatter (YAML between --- markers) EXACTLY as-is. DO NOT translate YAML keys like title, description, type, layout - only translate their VALUES. Preserve all Markdown structure and frontmatter:\n\n{part}"
        
        translated_text = call_ollama(prompt)
        
        # BASIC HEALING: If output is suspiciously short (less than 30% of original), try once more
        if len(translated_text) < (len(part) * 0.3):
            print(f"     [!] Warning: Part {i+1} seems too short. Retrying...")
            translated_text = call_ollama(prompt)
            
        translated_parts.append(translated_text)

    final_translation = "\n\n".join(translated_parts)
    output_name = file_path.replace(".md", f".{target_lang}.md")
    
    with open(output_name, 'w', encoding='utf-8') as f:
        f.write(final_translation)
    
    print(f"Successfully Saved: {output_name}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        translate_large_file(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python tools/split_translate.py <file> <lang>")