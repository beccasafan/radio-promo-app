import { Countries } from "./countries";
import { Stations } from "./stations";

export class Cache {
    public static reset() {
        Cache.clear();

        Cache.load();
    }

    private static clear() {
        Countries.clear();
        Stations.clear();
    }

    private static load() {
        var countries = Countries.get();

        var stations = Stations.get();

        countries.forEach(c => Stations.getByCountry(c.code));
    }
}