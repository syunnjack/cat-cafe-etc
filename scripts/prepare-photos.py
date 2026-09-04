# -*- coding: utf-8 -*-
"""スマホで撮った写真を、日記に載せられる形にする。

  python scripts/prepare-photos.py <写真が入っているフォルダ> <slug>

やること:
  1. **位置情報を落とす。** スマホの写真には撮影場所の緯度経度と端末情報が
     EXIF として埋まっている。そのまま公開すると、行った場所と生活圏が
     読み取れてしまう。撮影日時も落とす。
  2. 横幅1600pxまで縮める。スマホの原寸（4000px超・数MB）はページが重く、
     スマホ回線で開くと待たされる。
  3. 撮った順（ファイル名順）に 01.jpg, 02.jpg … と付け直す。
  4. 縦横を正しい向きに直す（EXIF の Orientation を画素に反映してから落とす）。

出力: public/diary/<slug>/01.jpg …
元の写真には触らない。
"""
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
MAX_WIDTH = 1600
QUALITY = 82
SUFFIXES = {'.jpg', '.jpeg', '.png', '.heic', '.webp'}


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1

    source = Path(sys.argv[1]).expanduser()
    slug = sys.argv[2]

    if not source.is_dir():
        print(f'フォルダが見つかりません: {source}')
        return 1
    if not slug.replace('-', '').isalnum() or not slug.islower():
        print('slug は英小文字とハイフンだけにしてください（URLになります）。')
        return 1

    files = sorted(p for p in source.iterdir() if p.suffix.lower() in SUFFIXES)
    if not files:
        print(f'{source} に写真がありません。対応: {", ".join(sorted(SUFFIXES))}')
        return 1

    out_dir = ROOT / 'public' / 'diary' / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    written = []
    for index, path in enumerate(files, 1):
        try:
            with Image.open(path) as image:
                # EXIF の向きを画素に反映する。このあと EXIF を捨てるため、
                # ここで直しておかないと横向きのまま公開される。
                image = ImageOps.exif_transpose(image)
                if image.mode not in ('RGB', 'L'):
                    image = image.convert('RGB')
                if image.width > MAX_WIDTH:
                    height = round(image.height * MAX_WIDTH / image.width)
                    image = image.resize((MAX_WIDTH, height), Image.LANCZOS)

                name = f'{index:02d}.jpg'
                # exif= を渡さずに保存すると、EXIF は書き込まれない。
                # 位置情報・端末名・撮影日時はこの時点で消える。
                image.save(out_dir / name, 'JPEG', quality=QUALITY, optimize=True)
                written.append((name, image.width, image.height, path.name))
        except Exception as exc:
            print(f'  読めませんでした（そのまま置きます）: {path.name} … {exc}')
            fallback = out_dir / f'{index:02d}{path.suffix.lower()}'
            shutil.copy2(path, fallback)
            written.append((fallback.name, 0, 0, path.name))

    print(f'{len(written)}枚を {out_dir} に書き出しました。位置情報は落としてあります。')
    print()
    print('entries.ts に貼る photos はこの形です:')
    print('    photos: [')
    for name, w, h, original in written:
        size = f'{w}x{h}' if w else '不明'
        print(f'      {{ file: "{name}", alt: "" }},   // 元: {original} / {size}')
    print('    ],')
    print()
    print('alt には「何が写っているか」を short に書いてください（読み上げに使われます）。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
