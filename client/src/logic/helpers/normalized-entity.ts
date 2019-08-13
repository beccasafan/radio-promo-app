export interface INormalizableEntity {
    id: string;
}

export default class NormalizedEntity<T extends INormalizableEntity> {
    public allIds: string[];
    public byId: { [id: string]: T };

    public constructor() {
        this.allIds = [];
        this.byId = {};
    }

    private clone(): NormalizedEntity<T> {
        var clone = new NormalizedEntity<T>();
        clone.allIds = [...this.allIds];
        clone.byId = { ...this.byId };

        return clone;
    }
    


    addItems(items: T[]): NormalizedEntity<T> {
        if (items == null) { return this.clone(); }
        
        const clone = items.reduce((clone, i) => {
            if (!clone.allIds.includes(i.id)) {
                clone.allIds.push(i.id);
            }

            clone.byId[i.id] = i;

            return clone;
        }, this.clone());

        return clone;
    }
}