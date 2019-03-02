import { Countries } from "./countries";
import { Stations } from "./stations";
import { Talents } from "./talent";

export class Cache {
    public static reset() {
        Cache.clear();

        Cache.load();
    }

    private static clear() {
        Countries.clear();
        Stations.clear();
        Talents.clear();
    }

    private static load() {
        var countries = Countries.load();

        var stations = Stations.load();

        var talent = Talents.load();

        countries.forEach(c => Stations.loadByCountry(c.id));
        stations.forEach(s => Talents.loadByStation(s.id));
    }
}