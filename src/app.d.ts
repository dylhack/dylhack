// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

declare type Socials = {
  name: string;
  href?: string;
}

declare type Settings = {
  title: string;
  description: string;
  hostname: string;
  image: string;
  socials: Social[];
}
