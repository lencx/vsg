# vsg

> Explore Github repositories directly from Visual Studio Code.

## Features

- GitHub Trending
  - search languages
  - date range
  - layout

## Extension Settings

- Go to the [`Settings > Personal Access Tokens > New personal access token`](https://github.com/settings/tokens/new?description=vsg&scopes=public_repo) of your github profile.
- Click Generate Token.
- You will be presented with the generated token. Copy the token and add it below.

  ```json
  // setting.json
  {
    "vsg": {
      "token": "xxxxxx",
      // layout: grid | list
      "search.layout": "grid",
      // search date range: yearly | monthly | weekly | daily
      "search.range": "weekly",
      // more languages: vsg/src/github/colors.json
      "search.language": "all_languages",
    }
  }
  ```

## Usage

Just press Ctrl+P or Cmd+P and type:

> vsg: Open GitHub Explore

## Community

The vsg community can be found on [GitHub Discussions](https://github.com/lencx/vsg/discussions), where you can ask questions, voice ideas.

## Contributors 🙏❤

- lencx ([@lencx](https://github.com/lencx))
