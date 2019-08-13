import NormalizedEntity, { INormalizableEntity } from "./normalized-entity";

export class IAJAXState<T extends INormalizableEntity> {
    items: NormalizedEntity<T>;
    isLoading: boolean;
    hasError: boolean;

    constructor() {
        this.items = new NormalizedEntity<T>();
        this.isLoading = false;
        this.hasError = false;
    }
}