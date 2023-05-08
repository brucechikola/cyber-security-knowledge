import ApexCharts from 'apexcharts'
export default function RenderMultiAxisChart({ data = [] }) {
    var options = {
        chart: {
            height: 300,
            type: "line",
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#332785', '#1bbfa8', '#8C29F0'],
        series: [

            {
                name: 'Cases',
                type: 'column',
                data: data?.values
            },
        ],
        stroke: {
            width: [4, 4, 4]
        },
        plotOptions: {
            bar: {
                columnWidth: "40%"
            }
        },
        xaxis: {
            categories: data?.categories || []
        },
        yaxis: [
            {
                seriesName: 'Column A',
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                },
                title: {
                    text: "Total Cases"
                },
                labels: {
                    formatter: function (value) {
                        return Math.round(value);
                    }
                }
            },
            {
                seriesName: 'Column A',
                show: false
            }
        ],
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        }
    };

    var chart = new ApexCharts(document.querySelector("#multiAxisChart"), options);

    chart.render();
}
