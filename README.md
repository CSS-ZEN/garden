<a href="https://czg.vercel.app"><img src="https://czg.vercel.app/Enso.svg?sanitize=true" height="150" align="right"></a>

# CSS Zen Garden

It originates from [mezzoblue/csszengarden.com](https://github.com/mezzoblue/csszengarden.com) which seems [not maintained any more](https://github.com/mezzoblue/csszengarden.com/issues/114).

Deployed with [Vercel](https://vercel.com/) at [https://czg.vercel.app](https://czg.vercel.app).

## How does it work?

It uses gists as themes and [builds static pages incremently](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) with [Next.js](https://nextjs.org/). Url like `https://czg.vercel.app/theme/[gistid]` will be built with the corresponding gist's content when viewed. Thank to this stack, you can share your own theme freely. Any gist can be viewed as a theme in this way, as long as it confronts to specifications of a theme gist.

## Submission Guidelines

The theme gist is supposed to have these things at least:

```bash
gist
├── theme.css
└── manifest.json
```

All contents of the gist can be accessed with `https://czg.vercel.app/api/theme/[gistid]/[filename]` like [https://czg.vercel.app/api/theme/f4b657c4e3b99c63281b079f66d4dc34/theme.css](https://czg.vercel.app/api/theme/f4b657c4e3b99c63281b079f66d4dc34/theme.css).

You can take [the default theme we use](https://gist.github.com/csszen/f4b657c4e3b99c63281b079f66d4dc34) as an example.

All private gists of [csszen](https://gist.github.com/csszen) will be included as an offical themes. You may [submit an issue](https://github.com/csszen/garden/issues/new) labeled `theme request` for theme fork request if you want to make your theme one of our page's theme choices like [csszen/garden#4](https://github.com/csszen/garden/issues/4).

Note that keep a track of forkings for upcoming updates, we may delete the forked theme and refork the lastest version.

## FAQ

### How can I use images in my theme?

The problem is actually how to save images to gist in our circumstances.

If it's convinent for you to encode the images, I suggest hard-coded [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). Besides instructions in MDN, you can also consider [csszen/toDataURL.js](https://gist.github.com/csszen/0f7b07d59fdafdc4856213133e4d42fb)

Or you may choose to push images directly into a gist with git, take [how-to-add-image-to-gist.md](https://gist.github.com/csszen/158006258c922e2f2b8d6ee78014a33b) as a hint. You can fetch the image like [`/api/theme/10a7af172c2469f0b6481eedfb4ce63c/robot.png`](https://czg.vercel.app/api/theme/10a7af172c2469f0b6481eedfb4ce63c/robot.png). And you can use them as relative path in themes like `background: url(robot.png)`.

These rules all work when it comes to fonts.

### How can I use fonts in my theme?

You may add import css declartion in your theme like [the default theme](https://gist.github.com/csszen/f4b657c4e3b99c63281b079f66d4dc34#file-theme-css-L5). It looks like `@import url("https://use.typekit.net/xxxxxxx.css");`.

Or you may mannully attach fonts to the gist like images and declare font faces in your theme.

### Is postcss tools built in? Can I write Sass?

Yes. You can enable Sass by editing the `manifest.json` and set `option.language` to `scss`, the editor will add `theme.scss` and compile it to `theme.css` automatically when you edit it. Take [http://czg.vercel.app/submit?theme=cadbc727a641595682916bea906346d0](http://czg.vercel.app/submit?theme=cadbc727a641595682916bea906346d0) as an example.

### What's the point of this project since we can use codepen/jsfiddle .etc to customize themes and see what they look like?

First, speed. [Vercel](https://vercel.com/) provides an extremely fast and stable rendering exprience.

Second, we always need a place/project to gather things around. We need a project to maintain the site for issues. And we need a real website.

### Can I inject javascript to the page?

No, it's easy to implement, but you shouldn't. Let's explore and see what we can do with the Zen of CSS.

### What's relation between this project and the original?

This is **unofficial** and personal maintained currently. Submit an [issue](https://github.com/csszen/garden/issues) for things related to development or things other than that.

The whole project is provided with [Vercel](https://vercel.com/)/[Github](https://github.com) free plans so sponsorships are unnecessary, or at least for now.

Contributions welcomed. Thoughts welcomed.

## Started here, heading...?

I just implemented the original csszengarden.com functions. But as it was started years ago, time flies, and the web tech flies. Even this project is javascript-only instead of the PHP mixtuned like the original project. Other than stick to the traditional ancient Zen of CSS like a guru, do we need to support modern patterns like [Tailwind CSS](https://tailwindcss.com/)?

Recent years, we finally find that we are living on the earth that has days and nights. So, is light/dark theme shift necessay?

Open to new thoughts. Let me know what you think about it at [csszen/garden#3](https://github.com/csszen/garden/issues/3).

## Contributions

If you would like to contribute to the project or just interesed in what is confirmed to be done, you can access those informations at [issues labeled `todo`](https://github.com/csszen/garden/issues?q=is%3Aopen+is%3Aissue+label%3Atodo) or the [CZG project dashboard](https://github.com/CSS-ZEN/garden/projects/1).

You may join [the slack workspace](https://join.slack.com/t/csszen/shared_invite/zt-qzopmgzo-F15aU9C0sTYnO13_qc4ZRg) where most of discussions on development take place.

Thanks to `Next.js`, it's easy to get envolved with only a basic knowledge of react.js framework required. If you know how to use react, I believe that you are supposed to know how to clone a repository and install requirements with `npm` or `yarn`.

To run it on your machine, just run `npm run dev` and the prompt will guide you to page served on localhost.

To load theme choices from gists, you are supposed to declare your Github token at `/.env.local`. You may follow github's official lead to [create a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). Its absence will display no choices silently, no errors will be raised.

## LICENSE

CC0 1.0 Universal
