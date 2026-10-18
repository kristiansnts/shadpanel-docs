#!/usr/bin/env python3
"""Generate favicon set + Open Graph image without third-party imaging libs."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public"

# 5x7 uppercase bitmap font (cols packed in bits 0-4, top row first)
FONT: dict[str, list[int]] = {
    "A": [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
    "B": [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
    "C": [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110],
    "D": [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
    "E": [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
    "F": [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000],
    "G": [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01110],
    "H": [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
    "I": [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b11111],
    "J": [0b00111, 0b00010, 0b00010, 0b00010, 0b00010, 0b10010, 0b01100],
    "K": [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
    "L": [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
    "M": [0b10001, 0b11011, 0b10101, 0b10101, 0b10001, 0b10001, 0b10001],
    "N": [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
    "O": [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
    "P": [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000],
    "Q": [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b10010, 0b01101],
    "R": [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
    "S": [0b01111, 0b10000, 0b10000, 0b01110, 0b00001, 0b00001, 0b11110],
    "T": [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
    "U": [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
    "V": [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100],
    "W": [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b11011, 0b10001],
    "X": [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001],
    "Y": [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
    "Z": [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111],
    " ": [0, 0, 0, 0, 0, 0, 0],
    "-": [0, 0, 0, 0b11111, 0, 0, 0],
    ".": [0, 0, 0, 0, 0, 0b00100, 0b00100],
    "0": [0b01110, 0b10001, 0b10011, 0b10101, 0b11001, 0b10001, 0b01110],
    "1": [0b00100, 0b01100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
    "6": [0b01110, 0b10000, 0b10000, 0b11110, 0b10001, 0b10001, 0b01110],
}


def chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def write_png(path: Path, width: int, height: int, pixels: bytearray) -> None:
    raw = b"".join(b"\x00" + bytes(pixels[y * width * 4 : (y + 1) * width * 4]) for y in range(height))
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


def fill(pixels: bytearray, w: int, x0: int, y0: int, x1: int, y1: int, color: tuple[int, int, int, int]) -> None:
    r, g, b, a = color
    for y in range(max(0, y0), min(h_of(pixels, w), y1)):
        row = y * w * 4
        for x in range(max(0, x0), min(w, x1)):
            i = row + x * 4
            pixels[i : i + 4] = bytes((r, g, b, a))


def h_of(pixels: bytearray, w: int) -> int:
    return len(pixels) // (w * 4)


def rounded_rect(
    pixels: bytearray,
    w: int,
    x0: int,
    y0: int,
    x1: int,
    y1: int,
    radius: int,
    color: tuple[int, int, int, int],
) -> None:
    r2 = radius * radius
    for y in range(y0, y1):
        for x in range(x0, x1):
            dx = 0
            dy = 0
            if x < x0 + radius and y < y0 + radius:
                dx, dy = x0 + radius - x, y0 + radius - y
            elif x >= x1 - radius and y < y0 + radius:
                dx, dy = x - (x1 - radius - 1), y0 + radius - y
            elif x < x0 + radius and y >= y1 - radius:
                dx, dy = x0 + radius - x, y - (y1 - radius - 1)
            elif x >= x1 - radius and y >= y1 - radius:
                dx, dy = x - (x1 - radius - 1), y - (y1 - radius - 1)
            if dx * dx + dy * dy <= r2 or (dx == 0 and dy == 0):
                i = (y * w + x) * 4
                pixels[i : i + 4] = bytes(color)


def draw_glyph(
    pixels: bytearray,
    w: int,
    x: int,
    y: int,
    ch: str,
    scale: int,
    color: tuple[int, int, int, int],
) -> int:
    rows = FONT.get(ch.upper(), FONT[" "])
    for gy, bits in enumerate(rows):
        for gx in range(5):
            if bits & (1 << (4 - gx)):
                fill(
                    pixels,
                    w,
                    x + gx * scale,
                    y + gy * scale,
                    x + (gx + 1) * scale,
                    y + (gy + 1) * scale,
                    color,
                )
    return 6 * scale


def draw_text(
    pixels: bytearray,
    w: int,
    x: int,
    y: int,
    text: str,
    scale: int,
    color: tuple[int, int, int, int],
) -> None:
    cx = x
    for ch in text:
        cx += draw_glyph(pixels, w, cx, y, ch, scale, color)


def mark(pixels: bytearray, size: int) -> None:
    """Dark rounded tile with a geometric S mark."""
    bg = (9, 9, 11, 255)
    fill(pixels, size, 0, 0, size, size, bg)
    pad = max(1, size // 16)
    rounded_rect(
        pixels,
        size,
        pad,
        pad,
        size - pad,
        size - pad,
        max(2, size // 6),
        (24, 24, 27, 255),
    )
    accent = (250, 250, 250, 255)
    scale = max(2, size // 12)
    glyph_w, glyph_h = 5 * scale, 7 * scale
    gx = (size - glyph_w) // 2
    gy = (size - glyph_h) // 2
    draw_glyph(pixels, size, gx, gy, "S", scale, accent)


def icon(size: int) -> bytearray:
    pixels = bytearray([0, 0, 0, 255] * size * size)
    mark(pixels, size)
    return pixels


def write_ico(path: Path, png_32: Path) -> None:
    png = png_32.read_bytes()
    # ICO with a single PNG image (Vista+)
    header = struct.pack("<HHH", 0, 1, 1)
    entry = struct.pack("<BBBBHHII", 32, 32, 0, 0, 1, 32, len(png), 6 + 16)
    path.write_bytes(header + entry + png)


def og_image() -> bytearray:
    w, h = 1200, 630
    pixels = bytearray([9, 9, 11, 255] * w * h)
    # left accent stripe
    fill(pixels, w, 0, 0, 16, h, (63, 63, 70, 255))
    # card
    rounded_rect(pixels, w, 80, 90, 1120, 540, 28, (24, 24, 27, 255))
    white = (250, 250, 250, 255)
    muted = (161, 161, 170, 255)
    draw_text(pixels, w, 140, 180, "SHADPANEL", 8, white)
    draw_text(pixels, w, 140, 280, "ADMIN PANEL CLI FOR NEXT.JS", 3, muted)
    draw_text(pixels, w, 140, 380, "DOCS  -  CLI 1.6.0", 3, (212, 212, 216, 255))
    return pixels


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    for size, name in ((16, "favicon-16x16.png"), (32, "favicon-32x32.png"), (180, "apple-touch-icon.png")):
        write_png(ROOT / name, size, size, icon(size))
    write_png(ROOT / "og-image.png", 1200, 630, og_image())
    write_ico(ROOT / "favicon.ico", ROOT / "favicon-32x32.png")
    print("wrote brand assets to", ROOT)


if __name__ == "__main__":
    main()
