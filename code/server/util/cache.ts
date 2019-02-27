class CacheWrapper {
    public static ScriptCache = new CacheWrapper(CacheService.getScriptCache());
    private static MaxLength: number = 1024 * 90;

    constructor(private cache: GoogleAppsScript.Cache.Cache) {

    }

    public put(key: string, value: any): any {
        var json = JSON.stringify(value);

        var chunkSize = Math.floor(CacheWrapper.MaxLength / 2);
        var chunks = [];
        var index = 0;
        while (index < json.length) {
            var chunkKey = key + "_" + index;
            chunks.push(chunkKey);
            this.cache.put(chunkKey, json.substr(index, chunkSize), 21600);
            index += chunkSize;
        }

        this.cache.put(key, JSON.stringify(chunks), 21600);

        return chunks;
    }

    public get<T>(key: string): T {
        var json = this.cache.get(key);
        if (json != null) {
            var chunks = JSON.parse(json);
            var chunksJSON = chunks.map((chunkKey: any) => this.cache.get(chunkKey));
            if (chunksJSON.every((chunk: any) => chunk != null)) {
                return JSON.parse(chunksJSON.join(""));
            }
        }
        return null;
    }
}