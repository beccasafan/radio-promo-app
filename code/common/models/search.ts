import { Format } from "./formats/format";
import { Util } from "../util/util";

export class SearchOptions {
    public formats: Format[];
}
export class SearchValues {
    public format?: string;
    public parentGroup?: string;
    public location?: string;
    public name?: string;

    public twitter?: boolean;
    public instagram?: boolean;
    public facebook?: boolean;
    public email?: boolean;
    public text?: boolean;
    public phone?: boolean;
}