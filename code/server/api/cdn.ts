export class CdnApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput|GoogleAppsScript.Content.TextOutput {
        var file = e.parameter.file.toLowerCase();
        var template = HtmlService.createTemplateFromFile(`client/dist/${file}`);
        (template as any).baseUrl = ScriptApp.getService().getUrl();
        var output = template.evaluate();
        output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
        output.setTitle("Radio Request Database - Louis");
        return output;
    }
}