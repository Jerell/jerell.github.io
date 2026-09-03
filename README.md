# jerell.me

Personal website built with [Quartz](https://quartz.jzhao.xyz/).

## Development

Use npm and the committed `package-lock.json` to match CI and Dependabot updates.

```sh
npm ci
npx quartz build --serve
```

The site deploys from `main`. `npx quartz sync` pulls from `origin/main`; Quartz
updates still come from `upstream/v4`.

## Update Quartz

```sh
npx quartz update
```
