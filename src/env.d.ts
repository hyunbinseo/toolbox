/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_TITLE: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
