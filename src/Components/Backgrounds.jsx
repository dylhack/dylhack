// This function will return the proper background based on the user's
// screen-size
export default function getBackground() {
  // TODO: that.
  return DesktopBG();
}

export function DesktopBG() {
  return (
    <svg
      className="background"
      id="visual"
      viewBox="0 0 1920 1080"
      width="1920"
      height="1080"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g fill="none" stroke="#937666" stroke-width="2">
        <circle r="287" cx="1786" cy="460"></circle>
        <circle r="125" cx="212" cy="945"></circle>
        <circle r="176" cx="324" cy="161"></circle>
      </g>
    </svg>
  );
}

export function MobileBG() {
  return (
    <svg
      className="background"
      id="visual"
      viewBox="0 0 540 960"
      width="540"
      height="960"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g fill="none" stroke="#937666" stroke-width="2">
        <circle r="143" cx="9" cy="100"></circle>
        <circle r="62" cx="274" cy="670"></circle>
        <circle r="124" cx="478" cy="356"></circle>
      </g>
    </svg>
  );
}
