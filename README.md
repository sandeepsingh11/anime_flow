# Anime Finder
_discover anime by via a flowchart_

This is inspired by lukeatlook's [anime recommendation flowchart](https://imgur.com/gallery/q9Xjv4p), which via a series of questions leads the user to a specific anime to watch.

~~The project uses an offline database complied by manami-project's [anime-offline-database](https://github.com/manami-project/anime-offline-database).~~
UPDATE: to deploy to Netlify ([which I have for now](https://jolly-bose-3d51bb.netlify.app/)), I cannot use PHP as the platform does not support it. Currently, I had done the offline db retrieving in PHP, which means it will not work in the Netlify deployment. I *could* fetch the data in JS, but I'm not feeling it atm lol (perhaps in the future?). 

Instead, Netlify does support API calls, so I am using [Jikan](https://jikan.moe/) instead to get the anime info for the client. Check out their [Github here](https://github.com/jikan-me/jikan)!

\*the use-netlify branch has the directory set up for Netlify deployment and incorporates the Jikan API.
