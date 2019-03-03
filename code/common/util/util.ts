export class Util {
    public static isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
    public static createJSONOutput = (obj: any): GoogleAppsScript.HTML.HtmlOutput => HtmlService.createHtmlOutput(`<pre>${JSON.stringify(obj, null, 4)}</pre>`);
    public static groupBy = <T extends {[key: string]: string;}>(data: T[], property: string) => {
        return data.reduce((groups: {[key: string]: T[];}, item: T) => {
            var groupKey = item[property].toString();
            var group = groups[groupKey] || [];
            group.push(item);
            groups[groupKey] = group;
            return groups;
        }, {});
    };
}