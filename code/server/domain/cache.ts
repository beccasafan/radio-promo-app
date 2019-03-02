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
        var countries = Countries.load();

        var stations = Stations.load();

        countries.slice(0,3).forEach(c => Stations.loadByCountry(c.id));
    }
}