import { Format } from "./formats/format";

export class SearchOptions {
    public formats: Format[];
}
export class SearchValues {
    public selectedFormat?: string;
    public selectedParent?: string;
}