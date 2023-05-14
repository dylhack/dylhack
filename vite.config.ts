import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import settings from './static/settings.json';
import fs from 'node:fs';

const data = fs.readFileSync('./static/art.txt', 'utf8');
const art = data.toString().replace(/\n$/, "");
const app_settings = {
	...settings,
	art,
}

const config: UserConfig = {
	plugins: [sveltekit()],
	define: {
		app_settings,
	},
};

export default config;
