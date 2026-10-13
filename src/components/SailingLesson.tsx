

export default function SailingLesson() {

  return <>
    <rect className="scene-panel" x="20" y="43" width="77" height="28" rx="4" />
    <path className="scene-accent" d="M35 63h43m-5-4 5 4-5 4" />
    <path className="lesson-dock" d="M18 148h89v8H18zM30 157v15m63-15v15" />
    <g className="lesson-instructor">
      <circle className="lesson-person" cx="55" cy="88" r="7" />
      <path className="lesson-limbs" d="M51 119l-7 27m15-27 9 27M47 101l-9 18m25-18 18 3 13-12" />
      <path className="lesson-coach-vest" d="M48 99h14l3 24H45z" />
      <path className="scene-line" d="m52 99 3 10 4-10" />
      <circle fill="#fbbf24" cx="55" cy="111" r="2" />
    </g>
    <path className="lesson-guidance" d="M103 96q15-17 34-13" />
    <path className="lesson-guidance-arrow" d="m132 78 6 5-7 4" />
    <g className="lesson-dinghy">
      <path className="scene-fill" d="M204 50v84h-51zM214 78l40 56h-40z" />
      <path className="scene-line" d="M205 49v94M142 141h126l-19 16h-86z" />
      <circle className="lesson-person" cx="226" cy="118" r="5" />
      <path className="lesson-student-vest" d="M222 125h9l3 15h-15z" />
      <circle className="lesson-person" cx="248" cy="122" r="4.5" />
      <path className="lesson-student-vest" d="M244 128h8l3 12h-14z" />
      <path className="scene-line" d="M221 130l-10 7M244 133l-9 4" />
    </g>
    <path className="lesson-buoy" d="m284 136-7 19h14z" />
    <path className="scene-water" d="M-40 166q20-5 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" />
  </>;
}
