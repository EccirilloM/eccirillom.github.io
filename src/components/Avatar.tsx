// Avataaars artwork: Pablo Stanley / Fang-Pen Lin. See public/AVATAAARS-LICENSE.txt.
export default function Avatar({ size = 36 }: { size?: number }) {
  return <img className="portfolio-avatar" src="/avatar.svg" alt="" aria-hidden="true"
    width={size} height={size} style={{ width: size, height: size }} />;
}
