import "./app.css";
import App from "./App.svelte";

export const VITE_SOCIALS = JSON.parse(
  import.meta.env.VITE_SOCIALS 
  || '[{ "name": "GitHub", "href": "https://github.com/dylhack"}]',
);
export const VITE_HOST = import.meta.env.VITE_HOST || "example.com";

const hpadding = 2;
let i = 0,
  width = 0;

const getI = () => i++;
export const getSocial = (social) => {
  const i = getI();
  const padding = " ".repeat(hpadding / 2);
  return `${padding}${i} ${social.href}${padding}`;
};

/**
 * @param {number | undefined} offset
 * @returns {string}
 */
export const getPadding = (offset = undefined) => {
  const w = getWidth();
  return " ".repeat(offset ? w - offset : w);
};

/**
 * @returns {number}
 */
const getWidth = () => {
  if (width > 0) return width;
  VITE_SOCIALS.forEach((social) => {
    const preview = getSocial(social);
    if (preview.length > width) width = preview.length;
  });
  return width;
};

/**
 *
 * @param {string} x
 * @param {offset | undefined} offset
 * @returns {string}
 */
export const repeat = (x, offset = undefined) => {
  const w = getWidth();
  return x.repeat(offset !== undefined ? w - offset : w);
};

export default new App({
  target: document.getElementById("app"),
});
