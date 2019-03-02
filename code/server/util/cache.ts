export class CacheWrapper {
    public static ScriptCache = new CacheWrapper(CacheService.getScriptCache());
    
    private static MaxLength: number = 1024 * 90;
    private static CacheDuration: number = 60 * 60 * 6;

    constructor(private cache: GoogleAppsScript.Cache.Cache) {

    }

    public put(key: string, value: any): any {
        console.log("cache putting", key);
        try {
            var json = JSON.stringify(value);

            var chunkSize = Math.floor(CacheWrapper.MaxLength / 2);
            var chunks: Map<string, string> = new Map<string, string>();
            var index = 0;
            while (index < json.length) {
                var chunkKey = `${key}_${index}`;
                chunks.set(chunkKey, json.substr(index, chunkSize));
                index += chunkSize;
            }

            var cacheObject = {};
            var chunkKeys = [];
            for ([key, value] of chunks) {
                cacheObject[key] = value;
                chunkKeys.push(key);
            }
            cacheObject[key] = JSON.stringify(chunkKeys);
            this.cache.putAll(cacheObject, CacheWrapper.CacheDuration);

            return chunkKeys;
        }
        catch (e) {
            // just return the null
        }

        return null;
    }

    public get<T>(key: string): T {
        console.log("cache getting", key);
        try {
            var json = this.cache.get(key);
            if (json != null) {
                var chunkKeys = JSON.parse(json);
                var chunks = this.cache.getAll(chunkKeys);

                var chunkData = chunkKeys.map(chunkKey => chunks[chunkKey]);
                if (chunkData.every(datum => datum != null)) {
                    return JSON.parse(chunkData.join(""));
                }
            }
        }
        catch (e) {
            // just return the null
        }
        return null;
    }

    public remove(key: string): void {
        console.log("cache removing", key);
        var json = this.cache.get(key);
        if (json != null) {
            var chunks = JSON.parse(json);
            chunks.add(key);
            this.cache.removeAll(chunks);
        }
    }
}