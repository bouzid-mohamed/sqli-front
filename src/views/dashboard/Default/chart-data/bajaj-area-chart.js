// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //
const chartData = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },


        stroke: {
            curve: 'smooth',
            width: 1
        },
        yaxis: {
            show: false,

            forceNiceScale: true,
            style: {
                color: 'blue'

            }

        },
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: true,
            },
            y: {
                show: false,

                title: 'Total Order',
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: []
        }
    ]
};

export default chartData;
