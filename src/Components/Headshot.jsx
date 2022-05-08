/**
 * Credit to Joseph Myers for the MD5 Hash Function
 * Source: http://www.myersdaily.org/joseph/javascript/md5-text.html
 */
import md5 from '../lib/md5.js';


function getGravatarUrl(email) {
  const hashed = md5(email);
  return `https://www.gravatar.com/avatar/${hashed}?s=500`;
}

export default function Headshot(props) {
  const headshotUrl = getGravatarUrl(props.email);
  return (
    <img src={headshotUrl} className="headshot" alt="This is me"></img>
  )
}
