import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import settings from './settings.json';

const config: UserConfig = {
	plugins: [sveltekit()],
	base: "./",
	define: { global: { settings }},
};

export default config;
