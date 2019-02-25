export class Util {
    public static isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
    public static createJSONOutput = (obj: any): GoogleAppsScript.HTML.HtmlOutput => HtmlService.createHtmlOutput(`<pre>${JSON.stringify(obj, null, 4)}</pre>`);
}