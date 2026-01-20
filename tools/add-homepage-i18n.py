#!/usr/bin/env python3
"""
Add homepage i18n keys to all language files
"""

import subprocess
import re
import sys
from pathlib import Path

# Force UTF-8 for Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

# Homepage keys that need translation
homepage_keys = {
    'homepage_vision': 'Think Global • Start Small • Build Together',
    'homepage_status_label': 'STATUS:',
    'homepage_status_value': 'Alpha (Pre-Launch)',
    'homepage_phase_label': 'PHASE:',
    'homepage_phase_value': 'Infrastructure Development',
    'homepage_launch_label': 'LAUNCH:',
    'homepage_launch_value': 'January 24, 2026',
    'homepage_vision_title': '🌍 The Vision',
    'homepage_vision_subtitle': 'Global distributed network for consciousness evolution',
    'homepage_vision_item1': '50+ nodes by March 2027',
    'homepage_vision_item2': '500+ nodes by 2030',
    'homepage_vision_item3': 'Quarterly global synchronizations',
    'homepage_vision_item4': 'Planetary infrastructure operational',
    'homepage_reality_title': '🔨 The Reality',
    'homepage_reality_subtitle': 'One person starting solo',
    'homepage_reality_item1': 'Week 1: Solo practice (testing protocol)',
    'homepage_reality_item2': 'Month 3-6: Find first members (hopefully)',
    'homepage_reality_item3': 'Year 1: First stable node',
    'homepage_reality_item4': 'Year 2-5: Others replicate globally',
    'homepage_building_public': 'Not hiding that this is Day 1. Building in public. Documenting the journey.',
    'homepage_active_nodes': 'Active Nodes',
    'homepage_view_directory': 'View Full Node Directory',
    'homepage_contact_node': 'Contact Node',
    'homepage_node_status': 'Status',
    'homepage_node_format': 'Format',
    'homepage_two_lenses_title': 'Two Perspectives, Same Infrastructure',
    'homepage_lens_evidence': '🔬 Evidence-Based',
    'homepage_lens_evidence_desc': 'Research, systems thinking, measurable outcomes',
    'homepage_lens_evidence_item1': 'Distributed architecture',
    'homepage_lens_evidence_item2': 'Heart-brain coherence research',
    'homepage_lens_evidence_item3': 'Peer structure benefits',
    'homepage_lens_evidence_item4': 'Open-source methodology',
    'homepage_read_mission': 'Read Mission',
    'homepage_lens_consciousness': '✨ Consciousness-Based',
    'homepage_lens_consciousness_desc': 'Heart activation, planetary evolution, soul mission',
    'homepage_lens_consciousness_item1': 'Starseed coalition (Andromedan/Pleiadean/Arcturian)',
    'homepage_lens_consciousness_item2': 'March 2027 timing significance',
    'homepage_lens_consciousness_item3': 'Soul mission recognition',
    'homepage_lens_consciousness_item4': 'Consciousness infrastructure',
    'homepage_read_deeper': 'Read Deeper Purpose',
    'homepage_same_protocols': 'Same protocols. Different languages.',
    'homepage_see_alignment': 'See how they align',
    'homepage_get_involved': 'Get Involved',
    'homepage_join_sydney': '🧘 Join Sydney Node 001',
    'homepage_join_sydney_desc': 'Be a founding member of the first node',
    'homepage_join_sydney_detail': 'Mondays 7pm, Northern Beaches\\nStarting January 24, 2026',
    'homepage_start_own': '🌱 Start Your Own Node',
    'homepage_start_own_desc': 'Launch peer meditation in your city',
    'homepage_start_own_detail': 'Protocols ready. Documentation complete.\\nFork and build.',
    'homepage_contribute_code': '💻 Contribute Code',
    'homepage_contribute_desc': 'Help build the infrastructure',
    'homepage_contribute_detail': 'Tools, docs, protocols, research\\nOpen-source development',
    'homepage_view_github': 'View GitHub',
    'homepage_movements_title': 'How Movements Start',
    'homepage_timeline_week1': 'Week 1',
    'homepage_timeline_week1_desc': 'One person, alone, practicing',
    'homepage_timeline_week4': 'Week 4',
    'homepage_timeline_week4_desc': 'Maybe one other joins',
    'homepage_timeline_week12': 'Week 12',
    'homepage_timeline_week12_desc': 'Small group (2-5 people)',
    'homepage_timeline_month6': 'Month 6',
    'homepage_timeline_month6_desc': 'Stable node established',
    'homepage_timeline_year1': 'Year 1',
    'homepage_timeline_year1_desc': 'Node helping others start',
    'homepage_sydney_started': 'Sydney started with one person. Your city can too.',
    'homepage_start_where': 'Start Where You Are',
    'homepage_context_family': '🏠 **Family:** You + partner + kids',
    'homepage_context_friends': '👥 **Friends:** Small trusted circle',
    'homepage_context_workplace': '💼 **Workplace:** Lunch meditation crew',
    'homepage_context_neighborhood': '🏘️ **Neighborhood:** Local community',
    'homepage_context_virtual': '🌐 **Virtual:** Global connections',
    'homepage_context_solo': '🧘 **Solo:** Just you (valid node!)',
}

def translate_text(text, target_lang, model="gpt-oss:20b"):
    """Translate a single text string"""
    
    # 1. Regex to find emojis and specific symbols like •
    emoji_pattern = r'([\u2600-\u27BF]|[\u1f300-\u1f64f]|[\u1f680-\u1f6ff]|•)'
    # Find all emojis and store them in a list
    emojis = re.findall(emoji_pattern, text)
    # Replace emojis with [[0]], [[1]], etc.
    temp_text = text
    for i, emoji in enumerate(emojis):
        temp_text = temp_text.replace(emoji, f"[[{i}]]", 1)

    lang_names = {
        'de': 'German',
        'es': 'Spanish',
        'fr': 'French',
        'zh': 'Simplified Chinese',
        'pt': 'Brazilian Portuguese',
        'nl': 'Dutch',
        'sv': 'Swedish',
        'ja': 'Japanese',
        'hi': 'Hindi'
    }
    
    prompt = f"""Translate this text to {lang_names[target_lang]}. Output ONLY the translation, nothing else.

Text: {text}

Translation:"""
    
    process = subprocess.Popen(
        ['ollama', 'run', model],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding='utf-8',
        errors='replace'
    )
    
    try:
        stdout, _ = process.communicate(input=prompt, timeout=30)
         
         # 3. Put emojis back into the placeholders
        for i, emoji in enumerate(emojis):
            stdout = stdout.replace(f"[[{i}]]", emoji)
            # Sometimes models add spaces around brackets, clean that up
            stdout = stdout.replace(f"[[ {i} ]]", emoji)

        return stdout.strip() if stdout else text
    except:
        return text

def add_keys_to_language(lang_code):
    """Add homepage keys to a language file"""
    
    i18n_file = Path(f'i18n/{lang_code}.yaml')
    
    if not i18n_file.exists():
        print(f"Warning: {i18n_file} not found")
        return
    
    print(f"\nAdding homepage keys to {lang_code}.yaml...")
    
    # Read existing content
    with open(i18n_file, 'r', encoding='utf-8') as f:
        existing = f.read()
    
    # Append new keys
    with open(i18n_file, 'a', encoding='utf-8') as f:
        f.write('\n\n# Homepage Additional Keys (auto-generated)\n\n')
        
        for key_id, english_text in homepage_keys.items():
            print(f"  Translating: {key_id}...")
            
            if lang_code == 'en':
                translated = english_text
            else:
                translated = translate_text(english_text, lang_code)
            
            f.write(f'- id: {key_id}\n')
            f.write(f'  translation: "{translated}"\n\n')
    
    print(f"✓ Completed {lang_code}.yaml")

if __name__ == '__main__':
    languages = ['es', 'de', 'fr', 'zh', 'pt', 'nl', 'sv', 'ja', 'hi']
    
    print("Adding homepage i18n keys to all language files...")
    print("This will take 10-20 minutes...")
    print()
    
    for lang in languages:
        add_keys_to_language(lang)
    
    print("\n✓ All homepage keys added!")
    print("You can now update layouts/index.html to use these keys")