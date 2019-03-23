class CaveCrusader {

    canvas;
    context;
    map;
    position = [];
    score = 0;
    target = [];
    controls = {
        left: {
            move: false,
            position: []
        },
        up: {
            move: false,
            position: []
        },
        right: {
            move: false,
            position: []
        },
        down: {
            move: false,
            position: []
        }
    };

    constructor(element, map) {
        this.canvas = document.getElementById(element);
        this.context = this.canvas.getContext("2d");
        this.context.font = '30px monospace';
        this.map = map;
        this._render(true);
        this._registerEventListeners();
    }

    _render(position) {

        if (position) {
            this._positionObject();
        }

        this._drawOnCanvas();

        this._getPosition();

        this._resetControls('left', [this.position[0] - 1, this.position[1]]);
        this._resetControls('up', [this.position[0], this.position[1] - 1]);
        this._resetControls('right', [this.position[0] + 1, this.position[1]]);
        this._resetControls('down', [this.position[0], this.position[1] + 1]);

        let positionSearch = [];
        let x;
        let y = 0;

        this.map.map(row => {

            x = 0;

            row.split('').map(char => {

                positionSearch = [x, y];

                if (positionSearch !== this.position) {

                    this._positionSearchHelper(positionSearch, char, 'left');
                    this._positionSearchHelper(positionSearch, char, 'up');
                    this._positionSearchHelper(positionSearch, char, 'right');
                    this._positionSearchHelper(positionSearch, char, 'down');

                }

                x++;

            });

            y++;

        });

    }

    _positionObject() {

        let positions = [];
        let x;
        let y = 0;

        this.map.map(row => {

            x = 0;

            row.split('').map(char => {

                if (char === ' ') {
                    positions.push([x, y]);
                }

                x++;

            });

            y++;

        });

        const location = positions[Math.floor(Math.random() * positions.length)];

        this.target = location;

        this.map[location[1]] = this._replaceAt(this.map[location[1]], location[0], '*');

    }

    _drawOnCanvas() {

        let line = 50;

        this.map.map(row => {

            let space = 20;

            row.split('').map(char => {
                this.context.fillStyle = char === '@' ? 'white' : char === '*' ? 'yellow' : 'green';
                this.context.fillText(char, space, line);
                space += this.context.measureText(char).width;
            });

            line += 25;

        });

        this.context.fillStyle = 'blue';
        let text = 'Score: ';
        let scoreLine = line + 25;
        this.context.fillText(text, 20, scoreLine);
        let space = this.context.measureText(text).width + 20;
        this.context.fillStyle = 'red';
        this.context.fillText(this.score, space, scoreLine);

    }

    _getPosition() {

        let x;
        let y = 0;

        map.map(row => {

            x = 0;

            row.split('').map(char => {

                if (char === '@') {
                    this.position = [x, y];
                }

                x++;

            });

            y++;

        });

    }

    _resetControls(direction, position) {
        this.controls[direction] = {
            position: [position],
            move: false
        };
    }

    _positionSearchHelper(positionSearch, char, direction) {

        if (positionSearch.toString() === this.controls[direction].position.toString()) {

            if (char !== '#') {
                this.controls[direction].move = true;
            }
        }

    }

    _reRender(newPosition) {

        let found = false;

        if (newPosition.toString() === this.target.toString()) {
            found = true;
            this.score++;
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let position = [];
        let x;
        let y = 0;

        this.map.map(row => {

            x = 0;

            row.split('').map(char => {

                if (char === '@') {
                    this.map[y] = this._replaceAt(this.map[y], x, ' ');
                }

                position = [x, y];

                if (position.toString() === newPosition.toString()) {
                    this.map[y] = this._replaceAt(this.map[y], x, '@');
                }

                x++;

            });

            y++;

        });

        this._render(found);

    };

    _registerEventListeners() {

        document.addEventListener('keydown', (event) => {

            this._keydownHelper(event, 37, 'left');
            this._keydownHelper(event, 38, 'up');
            this._keydownHelper(event, 39, 'right');
            this._keydownHelper(event, 40, 'down');

        });

    }

    _keydownHelper(event, code, key) {

        if (event.keyCode === code && this.controls[key].move) {
            this._reRender(this.controls[key].position);
        }

    }

    // https://stackoverflow.com/a/1431113
    _replaceAt(input, index, replacement) {
        return input.substr(0, index) + replacement + input.substr(index + replacement.length);
    }

}