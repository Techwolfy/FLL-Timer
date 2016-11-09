FLL-Timer
=========

A web-based timer and score display for FIRST Lego League competitions.

I worked A/V at the 2016 Stevenson Ranch District FLL Qualifying Tournament, and the official timer provided by FIRST lagged repeatedly and occasionally crashed, resulting in one mid-match field reset and several issues with the accurate time not being visible to teams or spectators. I developed this timer during the tournament to mitigate the issues; while it may lag under heavy browser load, it will skip ahead to compensate and does not drop time as the official timer does.


Usage
-----

Scores can be exported directly from the official Excel sheet used for timing and scoring by simply saving the score sheet as a CSV. For scores to be displayed in the correct order, the sheet must be sorted by rank before saving. Additionally, blank lines in the sheet should be removed, as they will otherwise appear as empty rows on the display.


Demo
----

A live demo using scores from the aforementioned tournament is available online [here](https://wolfishly.me/flltimer).


Known Issues
------------

- Scores are not displayed when the timer is viewed locally in browsers other than Firefox, due to default security settings; the `--allow-file-access-from-files` flag should mitigate this for Chrome, and a usage of a lightweight local web server such as [Caddy](https://caddyserver.com/) resolves this in all cases.
- Scores do not automatically scroll when the page is viewed in Chrome. I am currently unsure why this occurs; pull requests would be appreciated.


License
-------

FLL-Timer is released under the GNU General Public License, version 3.0. For more informaion, please see [COPYING](COPYING).
