class Utils {
    public static getURLSearchParamOrNull(urlStr: string | undefined | null, param: string): string | null {
        if (urlStr != null) {
            const url = new URL(urlStr);
            const searchParams = url.searchParams
            return searchParams?.get(param) || null
        }
        return null;
    }
}

export default Utils;