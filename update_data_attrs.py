import os
import re

def update_file(filepath, is_home):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    prefix = './assets/' if is_home else '../assets/'
    
    # Facial AY-1688
    content = re.sub(
        r'(data-product-id="gl-facial-ay1688"[^>]*data-product-img=")https://images\.unsplash\.com/[^"]+(")',
        f'\\g<1>{prefix}prod-facial.jpg\\g<2>',
        content
    )

    # Cuello JT-600
    content = re.sub(
        r'(data-product-id="gl-cuello-jt600"[^>]*data-product-img=")https://images\.unsplash\.com/[^"]+(")',
        f'\\g<1>{prefix}prod-cuello.jpg\\g<2>',
        content
    )
    
    # Pistola de Masaje Pro
    content = re.sub(
        r'(data-product-id="gl-pistola-pro"[^>]*data-product-img=")https://images\.unsplash\.com/[^"]+(")',
        f'\\g<1>{prefix}prod-pistola.jpg\\g<2>',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('index.html', True)
update_file('pages/categoria-masajeadores.html', False)

print('Updated data attributes.')
