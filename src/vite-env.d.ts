/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL_IR: string
    readonly VITE_BASE_URL_ORG: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}