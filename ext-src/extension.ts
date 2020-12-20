import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('vsg.start', () => {
      const panel: any = ViewPanel.createOrShow(context.extensionUri);

      const config = vscode.workspace.getConfiguration('vsg');
      panel.sendConfig(config);
    })
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    // Make sure we register a serializer in activation event
    vscode.window.registerWebviewPanelSerializer(ViewPanel.viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: any
      ) {
        console.log(`Got state: ${state}`);
        ViewPanel.revive(webviewPanel, context.extensionUri);
      },
    });
  }
}

/**
 * Manages cat coding webview panels
 */
class ViewPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: ViewPanel | undefined;

  public static readonly viewType = 'catCoding';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (ViewPanel.currentPanel) {
      ViewPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      ViewPanel.viewType,
      'GitHub',
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `build` directory.
        // localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'build')],
      }
    );

    ViewPanel.currentPanel = new ViewPanel(panel, extensionUri);

    return ViewPanel.currentPanel;
  }

  public sendConfig(config: any) {
    // Send a message to the webview webview.
    // You can send any JSON serializable data.
    this._panel.webview.postMessage({ command: 'configuration', config });
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    ViewPanel.currentPanel = new ViewPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    ViewPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Local path to main script run in the webview
    const buildPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      'build'
    ).with({ scheme: 'vscode-resource' });

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    const getPath = (filename: string) => {
      const basePath = `vscode-resource:${buildPathOnDisk.path}`;
      return path.join(basePath, manifest[filename]);
    };

    const manifestUri = vscode.Uri.joinPath(
      this._extensionUri,
      'build',
      'asset-manifest.json'
    );
    const manifest = require(manifestUri.path)['files'];

    // load script into webview
    const mainScript = getPath('main.js');
    // load styles into webview
    const mainStyle = getPath('main.css');

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="./vsg.png" />
				<link href="${mainStyle}" rel="stylesheet">
				<title>GitHub</title>
				<base href="${buildPathOnDisk}/">
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
    		<div id="root"></div>
				<script nonce="${nonce}" src="${mainScript}"></script>
			</body>
			</html>`;
  }
}

function getNonce() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
