// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type If<T, Y, N> = T extends true ? Y : N;

declare global {
		declare enum SocialType {
			Link,
			Value,
		}

		declare type Socials<T extends SocialType> = {
			name: string;
			href: If<T extends SocialType.Link ? true : false, string, undefined>;
			value: If<T extends SocialType.Value ? true : false, string, undefined>;
		}

		declare type Settings = {
			title: string;
			description: string;
			hostname: string;
			socials: Social[];
			art: string;
			splitAt: number;
		}

		declare global = {
			settings: Settings,
			art: string,
		}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
