export default class CacheConstants {
  public static readonly prefix = "RadioApp.";

  public static readonly artists = `${CacheConstants.prefix}Artists`;

  public static readonly countries = `${CacheConstants.prefix}Countries`;
  public static readonly countrySummaries = `${CacheConstants.prefix}CountrySummaries`;

  public static readonly formats = `${CacheConstants.prefix}Formats`;
  public static readonly formatsByCountry = `${CacheConstants.prefix}FormatsByCountry`;

  public static readonly languages = `${CacheConstants.prefix}Languages`;

  public static readonly monitors = `${CacheConstants.prefix}Monitors`;
  public static readonly monitorsByCountry = `${CacheConstants.prefix}MonitorsByCountry`;

  public static readonly songs = `${CacheConstants.prefix}Songs`;

  public static readonly stations = `${CacheConstants.prefix}Stations`;
  public static readonly stationsByCountry = `${CacheConstants.prefix}StationsByCountry`;

  public static readonly syndicatedTalent = `${CacheConstants.prefix}SyndicatedTalent`;
  public static readonly syndicatedTalentByStation = `${CacheConstants.prefix}SyndicatedTalentByStation`;
  public static readonly syndicatedTalentByCountry = `${CacheConstants.prefix}SyndicatedTalentByCountry`;

  public static readonly talent = `${CacheConstants.prefix}Talent`;
  public static readonly talentByStation = `${CacheConstants.prefix}TalentByStation`;
  public static readonly talentByCountry = `${CacheConstants.prefix}TalentByCountry`;

  public static readonly tweets = `${CacheConstants.prefix}Tweets`;
  public static readonly tweetsByLanguage = `${CacheConstants.prefix}Tweets`;
}
