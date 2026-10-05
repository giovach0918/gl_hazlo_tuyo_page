import re

filepath = 'pages/categoria-masajeadores.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'(data-product-id="gl-pistola-pro-negro"[^>]*data-product-img=")https://images\.unsplash\.com/[^"]+(")',
    r'\g<1>../assets/prod-pistola.jpg\g<2>',
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
