import * as vscode from 'vscode';
import ViewVsgPanel from './ViewVsgPanel';
import ViewVsgProvider from './ViewVsgProvider';

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('vsg');

  context.subscriptions.push(
    vscode.commands.registerCommand('vsg.start', () => {
      const panel: any = ViewVsgPanel.createOrShow(context.extensionUri);
      panel.sendConfig(config);
    })
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vsg.panel", new ViewVsgProvider(context.extensionUri, config))
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    // Make sure we register a serializer in activation event
    vscode.window.registerWebviewPanelSerializer(ViewVsgPanel.viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: any
      ) {
        console.log(`Got state: ${state}`);
        ViewVsgPanel.revive(webviewPanel, context.extensionUri);
      },
    });
  }
}
