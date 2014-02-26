$().ready(function() {
    var fb = new Firebase("https://popping-fire-6738.firebaseio.com/temperature");
    var series;

    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    var chart = new Highcharts.Chart({
        chart : {
            renderTo: 'container',
            events : {
                load : function() {
                }
            }
        },
        title: { text: 'Temperatures at home' },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e of %b'
            },
            zoomType: 'x'
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }],
            min: 0
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
                     name: "Temperature",
                     data: [],
                     tooltip: {
                         valueDecimals: 1,
                         valueSuffix: '°C'
                     }
                 }]
    });
    chart.showLoading();

    var reDrawChart = false;

    fb.once("value", function(data) {
        var temps = data.val();
        var data = _.values(_.mapValues(temps, function(o) { return [new Date(o.time).getTime(), o.celsius]; }));

        series = chart.series[0];

        chart.hideLoading();
        chart.redraw();

        reDrawChart = true;
        console.log('Done');
    });

    fb.on("child_added", function(snapshot) {
        var temp = snapshot.val();
        var point = [new Date(temp.time).getTime(), temp.celsius];
        console.log(point);
        chart.series[0].addPoint(point, reDrawChart);
    });

    window.chart = chart;

});

