import os
import re

def update_product(filepath, image_name):
    if not os.path.exists(filepath):
        print(f'{filepath} does not exist!')
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If there's an id="main-image", replace its src
    if 'id="main-image"' in content:
        content = re.sub(
            r'(<img[^>]*id="main-image"[^>]*src=")[^"]+(")',
            f'\\g<1>../assets/{image_name}\\g<2>',
            content
        )
    else:
        # Just replace the first unsplash image
        content = re.sub(
            r'src="https://images\.unsplash\.com/[^"]+"',
            f'src="../assets/{image_name}"',
            content,
            count=1
        )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {filepath}')

update_product('pages/producto-ay1688.html', 'prod-facial.jpg')
update_product('pages/producto-jt600.html', 'prod-cuello.jpg')
update_product('pages/producto-pistola-pro.html', 'prod-pistola.jpg')
update_product('pages/producto-bandas-set5.html', 'prod-bandas-set.jpg')
