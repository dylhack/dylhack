import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const getSettings = (): Settings => {
	const settingsFile = fs.readFileSync('./static/settings.json', 'utf8');
	return JSON.parse(settingsFile);
}

const settings = getSettings();

test('index has title as settings.name ', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(settings.title);
});
