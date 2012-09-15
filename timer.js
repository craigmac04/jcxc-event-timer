var runners = 1;
        var starttime;
        var myInterval;

        function AddRunner() {
            runners = runners + 1;
            var timerGrid = $('#timer.ui-grid-c');
            var runner = $('#runner1').clone().attr('id', 'runner'.concat(runners));
            runner.find('.name h5 input').attr('id', 'name' + runners);
            runner.find('.name h5 input').attr('onchange', 'nameRunner(' + runners + ')');
            var clickStr = "captureTime('".concat(runners, "','mile1')");
            runner.find('.mile1 a').attr('onclick', clickStr);
            clickStr = "captureTime('".concat(runners, "','mile2')");
            runner.find('.mile2 a').attr('onclick', clickStr);
            clickStr = "captureTime('".concat(runners, "','mile3')");
            runner.find('.mile3 a').attr('onclick', clickStr);
            timerGrid.append(runner);

            var splitGrid = $('#split.ui-grid-c');
            var split = $('#split1').clone().attr('id', 'split'.concat(runners));
            splitGrid.append(split);
        }

        function captureTime(runner, mile) {
            var now = new Date().getTime();
            var interval = new Date(now - starttime);

            $('#runner' + runner + ' .' + mile + ' span').html(timerString(interval));

            if (mile == 'mile1') {
                $('#split' + runner + ' .split1').append('<input type="hidden" id="r' + runner + 's1" value="' + interval.getTime() + '">');
                $('#split' + runner + ' .split1 h4').html(timerString(interval, true));
            } else if (mile == 'mile2') {
                $('#split' + runner + ' .split2').append('<input type="hidden" id="r' + runner + 's2" value="' + interval.getTime() + '">');
                var previous = $('#r' + runner + 's1').val();
                var diff = new Date(interval.getTime() - previous);
                $('#split' + runner + ' .split2 h4').html(timerString(diff, true));
            } else if (mile == 'mile3') {
                $('#split' + runner + ' .split3').append('<input type="hidden" id="r' + runner + 's3" value="' + interval.getTime() + '">');
                var previous = $('#r' + runner + 's2').val();
                var diff = new Date(interval.getTime() - previous);
                $('#split' + runner + ' .split3 h4').html(timerString(diff, true));
                var name = $('#name' + runner).val();
                $('#split' + runner + ' .name h4').text(name + ' (' + timerString(interval, true) + ')');
            }
        }

        function tick() {
            var now = new Date().getTime();
            var interval = new Date(now - starttime);

            $('#tock span').html("Timer - " + timerString(interval));
        }

        function timerString(interval) {
            var ms = interval.getMilliseconds();
            var s = interval.getSeconds();
            var min = interval.getMinutes();
            var h = interval.getHours();

            s = checkTime(s);
            min = checkTime(min);
            ms = padMilli(ms);

            return min + ":" + s + "." + ms;
        }

        function timerString(interval, round) {
            var ms = interval.getMilliseconds();
            var s = interval.getSeconds();
            var min = interval.getMinutes();
            var h = interval.getHours();

            s = checkTime(s);
            min = checkTime(min);
            ms = roundMilli(ms);

            return min + ":" + s + "." + ms;
        }

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function padMilli(i) {
            var txt = new String(i);

            while (txt.length < 3) {
                txt = "0" + txt;
            }
            return txt;
        }

        function roundMilli(i) {
            var txt = Math.round(i / 100);
            return txt;
        }
        function StartTimer() {
            if (myInterval > 0) {
                clearInterval(myInterval);
                myInterval = 0;
            } else {
                starttime = new Date().getTime();
                myInterval = setInterval(tick, 100);
            }
        }

        function nameRunner(id) {
            var name = $('#name' + id).val();
            $('#split' + id + ' .name h4').text(name);
        }

        function sendEmail() {
            var body = ""; //escape($('#split.ui-grid-c').html());
            var subject = escape("CCTimer results");
            var address = 'craigmac04@gmail.com';

            var aTag = document.createElement('a');
            var link = 'mailto:' + address + '?Subject=' + subject + '&Body=' + body;
            window.location.href = link;
        }