import os
import re

def update_file(filepath, is_home):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    prefix = './assets/' if is_home else '../assets/'
    
    # 1. Facial AY-1688
    content = re.sub(
        r'src="https://images\.unsplash\.com/[^"]+"(?=[^>]*alt="Masajeador facial y anti-papada \(Ref\. AY-1688\)")',
        f'src="{prefix}prod-facial.jpg"',
        content
    )
    content = re.sub(
        r'data-product-img="https://images\.unsplash\.com/[^"]+"(?=[^>]*data-product-id="gl-facial-ay1688")',
        f'data-product-img="{prefix}prod-facial.jpg"',
        content
    )

    # 2. Cuello JT-600
    content = re.sub(
        r'src="https://images\.unsplash\.com/[^"]+"(?=[^>]*alt="Masajeador de cuello \(Ref\. JT-600\)")',
        f'src="{prefix}prod-cuello.jpg"',
        content
    )
    content = re.sub(
        r'data-product-img="https://images\.unsplash\.com/[^"]+"(?=[^>]*data-product-id="gl-cuello-jt600")',
        f'data-product-img="{prefix}prod-cuello.jpg"',
        content
    )
    
    # 3. Pistola de Masaje Pro
    content = re.sub(
        r'src="https://images\.unsplash\.com/[^"]+"(?=[^>]*alt="Pistola de Masaje Pro")',
        f'src="{prefix}prod-pistola.jpg"',
        content
    )
    content = re.sub(
        r'data-product-img="https://images\.unsplash\.com/[^"]+"(?=[^>]*data-product-id="gl-pistola-pro")',
        f'data-product-img="{prefix}prod-pistola.jpg"',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('index.html', True)
update_file('pages/categoria-masajeadores.html', False)

print('Updated index and category.')
