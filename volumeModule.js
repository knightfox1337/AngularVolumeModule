.directive('volumeModule', function() {
    return {
        restrict: 'E',
        scope: {
            barColor: '@',
            audioSource: '=',
            barSpacing: '@',
            barAmount: '@'

        },
        template: '<canvas id="analyser_display" width="100%" height="300"></canvas>',
        controller: function($scope) {
            var canvas, ctx, source, context = new AudioContext(),
                analyser, fbc_array, bars, bar_x, bar_width, bar_height;

            $scope.initAudio = function(barColor, audioSource, barSpacing, barAmount) {
                document.getElementById('audio_box').appendChild(audioSource);
                analyser = context.createAnalyser();
                canvas = document.getElementById('analyser_display');
                ctx = canvas.getContext('2d');
                source = context.createMediaElementSource(audioSource);
                source.connect(analyser);
                analyser.connect(context.destination);
                $scope.frameLooper();
            }

            $scope.frameLooper = function(barColor, audioSource, barSpacing, barAmount) {
                window.requestAnimationFrame($scope.frameLooper);
                fbc_array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(fbc_array);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (barColor === undefined) {
                    ctx.fillStyle = "#00CCFF";
                } else {
                    ctx.fillStyle = barColor;
                }
                if (barSpacing === undefined) {
                    barSpacing = 1;
                } else {
                    bar_width = barSpacing;
                }

                bars = 100;
                for (var i = 0; i < bars; i++) {
                    bar_x = i * 1;
                    bar_width = 1;
                    bar_height = -(fbc_array[i]);
                    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
                }
            }
        },
        link: function(scope, iElement, iAttrs, ctrl) {
            scope.audioSource.addEventListener('canplaythrough', function() {
                scope.initAudio(scope.barColor, scope.audioSource, scope.barSpacing, scope.barAmount);
            }, false);
        }
    }
});
