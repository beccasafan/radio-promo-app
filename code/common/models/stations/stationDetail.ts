import { Station } from "./station";
import { Talent } from "../talent/talent";
import { SyndicatedTalent } from "../syndicated/syndicated";

export class StationDetail extends Station {
    public talent: Talent[];
    public syndicatedTalent: SyndicatedTalent[];
}