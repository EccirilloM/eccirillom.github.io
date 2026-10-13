

export default function SailingPipeline() {

  return <>
    <image href="/illustrations/moth-side.svg" x="12" y="34" width="86" height="132" />
    <g className="pipeline-sensors">
      <circle cx="45" cy="140" r="3" /><circle cx="63" cy="140" r="3" /><circle cx="84" cy="142" r="3" />
    </g>
    <path className="pipeline-wire" d="M94 141h12q10 0 10-10v-19q0-10 10-10h13" />
    <path className="pipeline-packet pipeline-upload" pathLength="100" d="M94 141h12q10 0 10-10v-19q0-10 10-10h13" />
    <path className="pipeline-arrow" d="m134 98 5 4-5 4" />
    <g className="pipeline-cloud">
      <path className="pipeline-cloud-shape" d="M151 113a15 15 0 0 1-1-30 23 23 0 0 1 44-1 16 16 0 0 1 0 31Z" />
      <path className="scene-line" d="M163 93h18M163 100h18" />
      <circle className="scene-signal" cx="157" cy="93" r="1.5" /><circle className="scene-signal" cx="157" cy="100" r="1.5" />
    </g>
    <path className="pipeline-wire" d="M210 101h21" />
    <path className="pipeline-packet pipeline-delivery" pathLength="100" d="M210 101h21" />
    <path className="pipeline-arrow" d="m226 97 5 4-5 4" />
    <g className="pipeline-dashboard">
      <rect className="scene-panel" x="232" y="66" width="74" height="65" rx="6" />
      <path className="scene-line" d="M232 80h74M257 140h25M269 131v9" />
      <circle fill="#60a5fa" cx="240" cy="73" r="1.5" />
      <path className="scene-line" d="M248 73h20M241 120h55" />
      <path className="pipeline-chart" pathLength="100" d="m241 111 8-9 9 6 9-18 9 11 9-4 11-10" />
      <rect className="pipeline-metric" x="241" y="115" width="10" height="3" rx="1" />
      <rect className="pipeline-metric" x="256" y="115" width="18" height="3" rx="1" />
    </g>
  </>;
}
