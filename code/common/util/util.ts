export class Util {
    public static isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
    public static createJSONOutput = (obj: any, callback: string): GoogleAppsScript.Content.TextOutput => {
        let output = ContentService.createTextOutput(`${callback}(${JSON.stringify(obj, null, 4)})`);
        output.setMimeType(ContentService.MimeType.JAVASCRIPT);
        return output;
    }
    public static groupByProperty = <T extends { [key: string]: string; }>(data: T[], property: string) => {
        return data.reduce((groups: { [key: string]: T[]; }, item: T) => {
            var groupKey = item[property].toString();
            var group = groups[groupKey] || [];
            group.push(item);
            groups[groupKey] = group;
            return groups;
        }, {});
    };

    public static shuffle = <T>(array: T[]) => {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }
}