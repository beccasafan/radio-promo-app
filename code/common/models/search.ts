import { Format } from "./formats/format";

export class SearchOptions {
    public formats: Format[];
}
export class SearchValues {
    public selectedFormat?: string;
    public selectedParent?: string;
    public location?: string;
    public name?: string;

    public twitter?: boolean;
    public instagram?: boolean;
    public facebook?: boolean;
    public email?: boolean;
    public text?: boolean;
    public phone?: boolean;
}