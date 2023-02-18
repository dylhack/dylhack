import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import settings from './settings.json';
import fs from 'node:fs';

const data = fs.readFileSync('./art.txt', 'utf8');

const config: UserConfig = {
	plugins: [sveltekit()],
	base: "./",
	define: { global: { settings, art: data.toString() }},
};

export default config;
