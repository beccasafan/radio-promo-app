import Station from "./station";
import Talent from "./talent";

export default class StationDetail extends Station {
  public talent: Talent[] = [];
  public syndicatedTalent: Talent[] = [];
}
