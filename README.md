
# Hashi

Hashi is a NPM package that wraps and implements features from Discord.js library.
Including a command handler, an event handler, integrated database system, and more.
Documentation link: (hashi.marikobot.com)[https://hashi.marikobot.com/]

## Authors

- [@elouannh](https://www.github.com/elouannh)


## Compatible with

<a><img src="https://media.botmarket.ovh/3go1ei.png" width="55px"/></a>
<a><img src="https://media.botmarket.ovh/f1dzqa.png" width="55px"/></a>
<a><img src="https://media.botmarket.ovh/8vrpcv.png" width="55px"/></a>

We recommand using TypeScript to take benefits with all of our exported types that could simplify your programming experience.
(Anyway, TypeScript is better :>)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Requirements

Node.js and a package manager (Yarn, PNPM, NPM) installed in your environment. We recommand using PNPM.

## Installation

Simply run the command:
```bash
pnpm install hashi@latest
```

### Creating a new version

First, let's build the package:
> On Windows (burk):
```batch
.\scripts\build.bat ; git add .
```
> On Linux/Mac (gigachad):
```bash
./scripts/build.sh && git add .
```

Secondly, let's box our files into a commit:
```bash
git commit -m "My message!"
```

Then, let's update the version:
```bash
npm version <patch|minor|major|prerelease --preid=devbuild>
```

Finally, let's publish the new version and push it to GitHub:
```bash
git push; npm publish; git push --tags
```

Well done!

### Testing the code

To run the code placed into the lab/ folder, just run:
```bash
ts-node lab/lab.test.ts
```
(Don't forget to build just before running it.)

## Used by

You? What are you waiting for?
