import subprocess
import re
import sys
import os

def ollama_translate(content, target_lang, model="ds7b-fast"):
    # Language mapping for natural phrasing
    lang_map = {
        'es': 'Spanish', 'de': 'German', 'fr': 'French', 
        'zh': 'Simplified Chinese', 'pt': 'Portuguese', 
        'nl': 'Dutch', 'sv': 'Swedish', 'ja': 'Japanese', 'hi': 'Hindi'
    }
    target_language = lang_map.get(target_lang, target_lang)

    # Tencent HY-MT models work best with a direct, single-line instruction
    # We do NOT use <translation> tags here because this model is 
    # trained to be a "pure" translator (it doesn't chat).
    prompt = f"Translate the following segment into {target_language}, without additional explanation. Preserve all Markdown formatting:\n\n{content}"

    try:
        # Running via subprocess to ensure we can pass internal parameters
        process = subprocess.Popen(
            ['ollama', 'run', model, '--verbose'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding='utf-8'
        )
        stdout, stderr = process.communicate(input=prompt)
        
        clean = re.sub(r'<think>.*?</think>', '', stdout, flags=re.DOTALL).strip()
        match = re.search(r'<translation>(.*?)</translation>', clean, flags=re.DOTALL)
    
        return match.group(1).strip() if match else clean

    except Exception as e:
        print(f"Failed to translate: {e}")
        return None

def main():
    if len(sys.argv) < 4:
        print("Usage: python ollama-translate.py <file_path> <langs_comma_sep> <model>")
        return

    file_path = sys.argv[1]
    languages = sys.argv[2].split(',')
    model_name = sys.argv[3]

    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        original_content = f.read()

    for lang in languages:
        print(f"Translating to {lang}...")
        translated = ollama_translate(original_content, lang, model_name)
        
        if translated:
            # Create filename: index.md -> index.zh.md
            base, ext = os.path.splitext(file_path)
            output_path = f"{base}.{lang}{ext}"
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(translated)
            print(f"Saved: {output_path}")

if __name__ == "__main__":
    main()