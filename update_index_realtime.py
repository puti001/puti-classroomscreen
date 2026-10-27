# -*- coding: utf-8 -*-
with open(r'c:\antigravity\puti-classroomscreen\public\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = '<script src="js/audio.js"></script>'
replacement = '''<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js"></script>
  <script src="js/realtime-engine.js"></script>
  <script src="js/audio.js"></script>'''

if 'js/realtime-engine.js' not in html:
    html = html.replace(target, replacement)
    with open(r'c:\antigravity\puti-classroomscreen\public\index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("index.html updated with realtime-engine.js successfully!")
else:
    print("Already in index.html!")
