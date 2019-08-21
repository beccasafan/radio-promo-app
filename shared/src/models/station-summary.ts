import Format from "./format";
import Station from "./station";

export default class StationSummary extends Station {
  public talent: number = 0;
  public syndicated: number = 0;
  public talentNames: string[] = [];
  public format!: Format;
}
