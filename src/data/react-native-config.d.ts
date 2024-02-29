declare module 'react-native-config' {
    export interface NativeConfig {
        MAL_API_URL?: string;
        MAL_API_KEY?: string;
    }
    
    export const Config: NativeConfig
    export default Config
}