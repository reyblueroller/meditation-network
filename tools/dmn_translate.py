import subprocess
import re
import sys
import os
import time

# --- SETTINGS ---
# Use the model you pulled: demonbyron/HY-MT1.5-1.8B
MODEL = "demonbyron/HY-MT1.5-1.8B:latest"
LANGS = ["es", "de", "fr", "zh", "pt", "nl", "sv", "ja", "hi"]
FILES = [
    "content/docs/mission.md",
    "content/docs/getting-started.md",
    "content/docs/deeper-purpose.md",
    "content/docs/heart-protocol.md",
    "content/docs/about.md",
    "content/docs/faq.md",
    "content/docs/comparison.md",
    "content/nodes/_index.md",
    "content/timer/_index.md"
]

def translate_with_retry(content, target_lang, max_retries=3):
    lang_map = {'zh': 'Chinese', 'es': 'Spanish', 'ja': 'Japanese', 'hi': 'Hindi'}
    target_name = lang_map.get(target_lang, target_lang)

    # Specific prompt for HY-MT models
    prompt = f"Translate the following Markdown content into {target_name}. Preserve all formatting. Wrap the translation in <translation> tags:\n\n{content}"

    for attempt in range(max_retries):
        try:
            print(f"  -> Attempt {attempt + 1} for {target_lang}...")
            process = subprocess.Popen(
                ['ollama', 'run', MODEL],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                text=True, encoding='utf-8'
            )
            stdout, stderr = process.communicate(input=prompt, timeout=120)

            # Verification: Check if the translation is complete
            if "<translation>" in stdout and "</translation>" in stdout:
                match = re.search(r'<translation>(.*?)</translation>', stdout, flags=re.DOTALL)
                if match:
                    return match.group(1).strip()
            
            print(f"  [!] Incomplete output for {target_lang}. Retrying...")
            time.sleep(2) # Brief pause before retry
            
        except Exception as e:
            print(f"  [!] Error: {e}")
            continue

    return None # Failed after all retries

def main():
    print(f"Starting DMN Translation using {MODEL}")
    
    for file_path in FILES:
        if not os.path.exists(file_path):
            print(f"Skipping: {file_path} (Not found)")
            continue

        print(f"\nProcessing: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            original_text = f.read()

        for lang in LANGS:
            output_file = file_path.replace(".md", f".{lang}.md")
            
            # Check if translation is needed (optional: skip if exists)
            translated_text = translate_with_retry(original_text, lang)
            
            if translated_text:
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(translated_text)
                print(f"  [✓] Saved: {output_file}")
            else:
                print(f"  [X] FAILED: Could not fully translate {file_path} to {lang}")

if __name__ == "__main__":
    main()