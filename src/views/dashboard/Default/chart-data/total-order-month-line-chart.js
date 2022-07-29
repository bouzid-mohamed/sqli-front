// ===========================|| DASHBOARD - TOTAL ORDER MONTH CHART ||=========================== //

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
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
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


};

export default chartData;