
export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}

export interface BuildOptions {
    mode: 'development' | 'production';
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
}

export interface BuildEnv {
    mode: 'development' | 'production';
    port: number;
    apiUrl: string;
}