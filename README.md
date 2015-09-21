# AngularVolumeModule

> This project was developed to provide a volume bar from a html5 audio source. This is still in development and
> will be updated in due course.

## How to use

The directive allows you to ajdust in various features such as:

  - Bar Colour (default #00CCFF) [bar-color]
  - Audio Source (required) [audio-source]
  - Bar Spacing (default 1) [bar-spacing]
  - Bar Amount (default 100) [bar-amount]

## Required js

```sh
    $scope.audio = new Audio(); // var that holds html5 audio
	$scope.audio.src="adrenaline.mp3"; //attach source (mp3 file)
```
## Element
```sh
    <volume-Module audio-source="audio"></volume-Module>
```
