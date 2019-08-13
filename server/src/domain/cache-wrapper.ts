const maxLength: number = 1024 * 90;
const duration: number = 60 * 60 * 6;

class CacheWrapper {
  constructor(private cache: GoogleAppsScript.Cache.Cache) {}

  public put(key: string, value: any): void {
    // console.log({ message: "cache putting " + key });
    const json = JSON.stringify(value);

    const chunkSize = Math.floor(maxLength / 2);
    const chunkKeys: string[] = [];
    const chunks: { [key: string]: string } = {};
    let index: number = 0;

    while (index < json.length) {
      const chunkKey = `${key}_${index}`;
      chunkKeys.push(chunkKey);
      chunks[chunkKey] = json.substr(index, chunkSize);
      index += chunkSize;
    }

    chunks[key] = JSON.stringify(chunkKeys);

    this.cache.putAll(chunks, duration);
  }

  public get<T>(key: string): T | undefined {
    const json = this.cache.get(key);

    if (json != null) {
      const chunkKeys = JSON.parse(json) as string[];
      const chunks = this.cache.getAll(chunkKeys);

      const chunkData = chunkKeys.map(chunkKey => chunks[chunkKey]);
      return JSON.parse(chunkData.join("")) as T;
    }

    return undefined;
  }

  public remove(key: string): void {
    const json = this.cache.get(key);

    if (json != null) {
      const chunkKeys = JSON.parse(json) as string[];
      chunkKeys.push(key);

      this.cache.removeAll(chunkKeys);
    }
  }
}

const ScriptCache = new CacheWrapper(CacheService.getScriptCache());

export function getScriptCache(): CacheWrapper {
  return ScriptCache;
}
