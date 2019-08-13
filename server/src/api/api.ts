import { getArtists } from "../domain/artists";
import { reset, viewCache } from "../domain/cache";
import { getCountries } from "../domain/countries";
import { getFormatsByCountry } from "../domain/formats";
import { getSongs } from "../domain/songs";
import { getStation, getStationsByCountry } from "../domain/stations";
import { getTweetsByLanguage } from "../domain/tweets";
import { createJSONOutput } from "../util";

function doGet(
  e: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  const getParameter = <T>(key: string): T =>
    (e.parameter as { [key: string]: T })[key];
  const method = getParameter<string>("item").toLowerCase();

  let data: any = {}; // { [key: string]: any } | undefined

  switch (method) {
    case "reset":
      reset();
      break;
    case "getcountries":
      data = getCountries();
      break;
    case "getsearchoptions":
      data = {
        formats: getFormatsByCountry(getParameter("country"))
      };
      break;
    case "getsongs":
      data = {
        artists: getArtists(),
        songs: getSongs()
      };
      break;
    case "getstationsbycountry":
      data = getStationsByCountry(getParameter("country"));
      break;
    case "getstation":
      data = getStation(getParameter("country"), getParameter("station"));
      break;
    case "gettweetsbylanguages":
      const languages = (e.parameters as { [key: string]: any[] }).languages;
      languages.forEach(l => (data![l] = getTweetsByLanguage(l)));
      break;
    case "view-cache":
      data = viewCache(getParameter("key"));
      break;
  }

  if (data != null) {
    const callback = getParameter<string>("callback");
    return createJSONOutput(data, callback);
  }

  return createJSONOutput({}, "_");
}
