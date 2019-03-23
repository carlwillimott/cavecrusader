[![Build Status](https://travis-ci.org/carlwillimott/cavecrusader.svg?branch=master)](https://travis-ci.org/carlwillimott/cavecrusader)
[![Coverage Status](https://coveralls.io/repos/github/carlwillimott/cavecrusader/badge.svg?branch=master)](https://coveralls.io/github/carlwillimott/cavecrusader?branch=master)

# Cave Crusader
A simple canvas game that involves moving a character around the map in order to collect randomly generated stars.

<a href="https://carlwillimott.github.io/cavecrusader/docs/index.html" target="_blank">Demo</a>

## Usage
```html
        <canvas id="cc" width="525px" height="550px"></canvas>
        
        <script type="module">

            import CaveCrusader from "./script.js";

            const map = [
                '######################',
                '######################',
                '##         @        ##',
                '##  ##  ##  ##  ##  ##',
                '##  ##  ##  ##  ##  ##',
                '##                  ##',
                '######################',
                '######################',
            ];

            new CaveCrusader('cc', map);

        </script>
```

## Example
<p align="center">
  <img src="cavecrusader.png" alt="Cave Crusader" width="505" height="545"/>
</p>