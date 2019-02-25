export class CdnApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput|GoogleAppsScript.Content.TextOutput {
        var file = e.parameter.file.toLowerCase();

        if (file.indexOf("js") > 0) {
            var content = HtmlService.createHtmlOutputFromFile(`client/dist/${file}`).getContent();
            var output = ContentService.createTextOutput(content);
            output.setMimeType(ContentService.MimeType.JAVASCRIPT);

            return output;
        } else if (file.indexOf(".css") > 0) {
            var content = HtmlService.createHtmlOutputFromFile(`client/dist/${file}`).getContent();
            var output = ContentService.createTextOutput(content);
            output.setMimeType(ContentService.MimeType.TEXT);
        } else {
            var template: any = HtmlService.createTemplateFromFile(`client/dist/${file}`);
            template.baseUrl = ScriptApp.getService().getUrl();
            return template.evaluate();
        }
    }
}