/**
 * 職人名からユニークな抽象パターンのアバターを生成する。
 * サイトのカラーパレットを使用し、伝統工芸の雰囲気に合わせた
 * 温かみのあるデザイン。
 */

// 名前から決定的なハッシュ値を生成
function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ハッシュから0-1の疑似乱数を生成
function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// 伝統工芸に合うカラーパレット（暖色系）
const palettes = [
  ["#8b7355", "#c4b5a0", "#264e70", "#d4a574", "#6b5e54"],
  ["#a0522d", "#c4a882", "#4a6741", "#d4a06a", "#7b6b5a"],
  ["#6b4e3d", "#b8a090", "#2d5a7b", "#c9956b", "#8b7865"],
  ["#7a5c47", "#baa898", "#3d6b5e", "#d4a882", "#6b6058"],
  ["#5c4033", "#c4b09c", "#4a5568", "#b8946b", "#7a6e62"],
  ["#8b6e4e", "#c9baa8", "#2b4c6f", "#c4a07a", "#6b5e50"],
];

type Props = {
  name: string;
  size?: number;
};

export default function ArtisanAvatar({ name, size = 80 }: Props) {
  const hash = hashName(name);
  const palette = palettes[hash % palettes.length];

  // 5x5 グリッドパターン（左右対称）
  const cells: { x: number; y: number; color: string }[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      const r = seededRandom(hash, row * 3 + col);
      if (r > 0.35) {
        const color = palette[Math.floor(seededRandom(hash, row * 3 + col + 50) * palette.length)];
        cells.push({ x: col, y: row, color });
        // 左右対称（中央列以外）
        if (col < 2) {
          cells.push({ x: 4 - col, y: row, color });
        }
      }
    }
  }

  const cellSize = size / 7; // パディング含む
  const offset = cellSize; // 外側マージン

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-full"
      role="img"
      aria-label={`${name}のアバター`}
    >
      {/* 背景 */}
      <rect width={size} height={size} rx={size / 2} fill={palette[0] + "20"} />

      {/* パターン（円形マスク内に描画） */}
      <clipPath id={`clip-${hash}`}>
        <circle cx={size / 2} cy={size / 2} r={size / 2} />
      </clipPath>

      <g clipPath={`url(#clip-${hash})`}>
        {/* ベース色 */}
        <rect width={size} height={size} fill={palette[4] + "15"} />

        {/* パターンセル */}
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={offset + cell.x * cellSize}
            y={offset + cell.y * cellSize}
            width={cellSize * 0.9}
            height={cellSize * 0.9}
            rx={cellSize * 0.15}
            fill={cell.color}
            opacity={0.85}
          />
        ))}
      </g>

      {/* 外枠 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 0.5}
        fill="none"
        stroke={palette[0]}
        strokeWidth={1}
        opacity={0.2}
      />
    </svg>
  );
}
