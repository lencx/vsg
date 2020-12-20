import * as vscode from "vscode";
import * as path from 'path';
import ViewVsgPanel from "./ViewVsgPanel";

export default class ViewVsgProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  config: any;
  // _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri, _config: any) {
    this.config = _config;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    // context: vscode.WebviewViewResolveContext,
    // _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };


    // vscode.window.showErrorMessage();
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    webviewView.webview.postMessage({ command: 'configuration', config: this.config });
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
				<title>vsg 🔥 GitHub</title>
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
