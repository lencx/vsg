# vscode-github

<!-- This is the README for your extension "vscode-github". After writing up a brief description, we recommend including the following sections. -->

## Features

- GitHub Trending

## Extension Settings

- Go to the [`Settings > Personal Access Tokens > New personal access token`](https://github.com/settings/tokens/new?description=vsgh&scopes=public_repo) of your github profile.
- Click Generate Token.
- You will be presented with the generated token. Copy the token and add it below.

  ```json
  // .vscode/setting.json
  {
    "vsgh": {
      "token": "xxxxxx"
    }
  }
  ```

## Usage

Just press Ctrl+P or Cmd+P and type:

> vsgh: Open Github Trending

<!--
Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something -->

<!-- ## Known Issues -->

<!-- Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

<!-- Users appreciate release notes as you update your extension. -->

### 0.0.1

Initial

<!-- ----------------------------------------------------------------------------------------------------------- -->

<!-- ## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets -->

<!-- ### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
* [GitHub language colors](https://github.com/ozh/github-colors) -->

<!-- **Enjoy!** -->
