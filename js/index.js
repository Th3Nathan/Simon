"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Simon = function (_React$Component) {
  _inherits(Simon, _React$Component);

  function Simon(props) {
    _classCallCheck(this, Simon);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      display: "",
      power: false,
      power_switch: "power_switch_off",
      strict: false,
      strict_light: "strict-off",
      playing: false,
      inputSounds: [],
      outputSounds: [],
      game: false,
      light: [.7, .7, .7, .7]
    };
    return _this;
  }

  Simon.prototype.lightup = function lightup(index) {
    var light = this.state.light;

    light[index] = 1;
    this.setState({
      light: light
    });
    var that = this;
    setTimeout(function () {
      that.setState({
        light: [.7, .7, .7, .7]
      });
    }, 300);
  };

  Simon.prototype.playback = function playback(soundArr) {
    var that = this;
    for (var i = 0; i < soundArr.length; i++) {
      (function (i) {
        that.setState({
          playing: true
        });
        setTimeout(function () {
          that.lightup(soundArr[i]);
          var url = sounds[soundArr[i]];
          var audioElement = document.createElement('audio');
          audioElement.setAttribute('src', url);
          audioElement.play();
          if (i === soundArr.length - 1) {
            that.setState({
              playing: false
            });
          }
        }, 1250 * i);
      })(i);
    };
  };

  Simon.prototype.startGame = function startGame() {
    if (this.state.power === true) {
      var outputSounds = this.state.outputSounds;

      if (outputSounds.length > 0) return;
      outputSounds.push(Math.floor(Math.random() * 4));
      this.setState({
        outputSounds: outputSounds,
        inputSounds: [],
        game: true,
        display: 1

      });
      this.playback(outputSounds);
    } else return;
  };

  Simon.prototype.playSound = function playSound(index) {
    if (!this.state.power || this.state.playing) {
      return;
    }
    this.lightup(index);
    var _state = this.state;
    var inputSounds = _state.inputSounds;
    var outputSounds = _state.outputSounds;
    var game = _state.game;

    inputSounds.push(index);
    this.setState({
      inputSounds: inputSounds
    });

    //If game is being played, check if move is right and handle
    if (game && inputSounds[inputSounds.length - 1] !== outputSounds[inputSounds.length - 1]) {
      this.wrong();
      return;
    }

    if (String(inputSounds) == String(outputSounds)) this.advance();

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', sounds[index]);
    audioElement.play();
  };

  Simon.prototype.wrong = function wrong() {
    var outputSounds = this.state.outputSounds;

    if (!this.state.strict) {
      this.setState({
        inputSounds: [],
        playing: true
      });
      var snd = new Audio("http://soundbible.com/grab.php?id=1218&type=mp3");
      snd.play();
      var that = this;
      setTimeout(function () {
        that.playback(outputSounds);
      }, 2250);
    } else {
      this.setState({
        inputSounds: [],
        outputSounds: [],
        display: 0,
        playing: true
      });
      var snd = new Audio("http://soundbible.com/grab.php?id=1218&type=mp3");
      snd.play();
      var that = this;
      setTimeout(function () {
        that.startGame();
      }, 2250);
    }
  };

  Simon.prototype.advance = function advance() {
    var _state2 = this.state;
    var outputSounds = _state2.outputSounds;
    var display = _state2.display;
    var playing = _state2.playing;

    var that = this;

    //This is in case user rapidly clicks the same button after clearning a level, it wont trigger an error
    this.setState({
      playing: true
    });

    setTimeout(function () {
      outputSounds.push(Math.floor(Math.random() * 4));
      that.setState({
        outputSounds: outputSounds,
        inputSounds: [],
        display: display + 1
      });
      that.playback(outputSounds);
    }, 1250);
  };

  Simon.prototype.togglePower = function togglePower() {
    var _state3 = this.state;
    var power = _state3.power;
    var display = _state3.display;
    var playing = _state3.playing;

    if (playing) return;
    var updateDisplay = display == "" ? "00" : "";
    this.setState({
      power: !power,
      display: updateDisplay,
      inputSounds: [],
      playing: false,
      outputSounds: [],
      inputSounds: [],
      game: false
    });
    var css = this.state.power_switch === "power_switch_off" ? "power_switch_on" : "power_switch_off";
    this.setState({ power_switch: css });
    if (power == true) {
      this.setState({
        strict_light: "strict-off",
        strict: false
      });
    }
  };

  Simon.prototype.toggleStrict = function toggleStrict() {
    if (!this.state.power) {
      return;
    }
    var strict = this.state.strict;

    this.setState({
      strict: !strict
    });
    var css = this.state.strict_light === "strict-off" ? "strict-on" : "strict-off";
    this.setState({ strict_light: css });
  };

  Simon.prototype.render = function render() {
    var _this2 = this;

    var _state4 = this.state;
    var power = _state4.power;
    var light = _state4.light;

    var opacityRed = { opacity: light[0] };
    var opacityBlue = { opacity: light[1] };
    var opacityYellow = { opacity: light[2] };
    var opacityGreen = { opacity: light[3] };
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "simon" },
        React.createElement("span", { style: opacityRed, onClick: function onClick() {
            return _this2.playSound(0);
          }, className: "red-note note" }),
        React.createElement("span", { style: opacityBlue, onClick: function onClick() {
            return _this2.playSound(1);
          }, className: "blue-note note" }),
        React.createElement("span", { style: opacityYellow, onClick: function onClick() {
            return _this2.playSound(2);
          }, className: "yellow-note note" }),
        React.createElement("span", { style: opacityGreen, onClick: function onClick() {
            return _this2.playSound(3);
          }, className: "green-note note" }),
        React.createElement(
          "div",
          { className: "console" },
          React.createElement(
            "div",
            { className: "title" },
            React.createElement(
              "h1",
              null,
              "SIMON"
            )
          ),
          React.createElement(
            "div",
            { className: "controlRow" },
            React.createElement(
              "div",
              { className: "display-box" },
              React.createElement(
                "div",
                { className: "display" },
                this.state.display
              ),
              React.createElement(
                "h2",
                { className: "label count" },
                "COUNT"
              )
            ),
            React.createElement(
              "div",
              { className: "start box" },
              React.createElement("button", { onClick: function onClick() {
                  return _this2.startGame();
                }, className: "start-button btn" }),
              React.createElement(
                "h2",
                { className: "label" },
                "START"
              )
            ),
            React.createElement(
              "div",
              { className: "strict box" },
              React.createElement("button", { onClick: function onClick() {
                  return _this2.toggleStrict();
                }, className: "strict-button btn" }),
              React.createElement(
                "h2",
                { className: "label" },
                "STRICT"
              ),
              React.createElement("span", { className: this.state.strict_light })
            )
          ),
          React.createElement(
            "div",
            { className: "power-row" },
            React.createElement(
              "h2",
              { className: "label label-pwr" },
              "OFF"
            ),
            React.createElement(
              "div",
              { onClick: function onClick() {
                  return _this2.togglePower();
                }, className: "power_back" },
              React.createElement("span", { className: this.state.power_switch })
            ),
            React.createElement(
              "h2",
              { className: "label label-pwr" },
              "ON"
            )
          )
        )
      )
    );
  };

  return Simon;
}(React.Component);

ReactDOM.render(React.createElement(Simon, null), document.getElementById('container'));

var sounds = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];