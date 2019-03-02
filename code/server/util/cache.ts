export class CacheWrapper {
    public static ScriptCache = new CacheWrapper(CacheService.getScriptCache());

    private static MaxLength: number = 1024 * 90;
    private static CacheDuration: number = 60 * 60 * 6;

    constructor(private cache: GoogleAppsScript.Cache.Cache) {

    }

    public put(key: string, value: any): any {
        console.log("cache putting", key);
        var json = JSON.stringify(value);

        var chunkSize = Math.floor(CacheWrapper.MaxLength / 2);
        var chunks = {};
        var chunkKeys = [];
        var index = 0;
        while (index < json.length) {
            var chunkKey = `${key}_${index}`;
            chunkKeys.push(chunkKey);
            chunks[chunkKey] = json.substr(index, chunkSize);
            index += chunkSize;
        }

        chunks[key] = JSON.stringify(chunkKeys);
        this.cache.putAll(chunks, CacheWrapper.CacheDuration);

        console.log("cache put", chunkKeys);
        return chunkKeys;

    }

    public get<T>(key: string): T {
        console.log("cache getting", key);
        var json = this.cache.get(key);
        if (json != null) {
            var chunkKeys = JSON.parse(json);
            var chunks = this.cache.getAll(chunkKeys);

            var chunkData = chunkKeys.map(chunkKey => chunks[chunkKey]);
            if (chunkData.every(datum => datum != null)) {
                console.log("cache got", chunkKeys);
                return JSON.parse(chunkData.join(""));
            }
        }
    }

    public remove(key: string): void {
        console.log("cache removing", key);
        var json = this.cache.get(key);
        if (json != null) {
            var chunks = JSON.parse(json) as string[];
            chunks.push(key);
            console.log("cache removed", chunks);
            this.cache.removeAll(chunks);
        }
    }
}