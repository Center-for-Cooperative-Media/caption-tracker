# C4CM Caption Tracker

This project uses the [TV Kitchen](https://tv.kitchen) to extract closed captions from an array of HD HomeRun devices.

Captions are written to SRT files and uploaded to Amazon S3.

## Installation

1. Install the following prerequisites:

- Node 14+
- `ffmpeg`
- `CCExtractor`
- `Docker`

2. Set up configuration:

```
$> cp config/dropbox.example.json config/dropbox.json
$> $EDITOR config/dropbox.json
$> cp config/sources.example.json config/sources.json
$> $EDITOR config/sources.json
```

## Running
`yarn start:kafka`

wait a few moments

`yarn start`
