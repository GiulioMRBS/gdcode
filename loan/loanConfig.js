const config = {
    bsk: {
        onceAYear: true,
        rest: 190000,
        pattern: "2500",
        errorMessage: "Only 2500",
        rate: 0.0189,
        monthly: 615.92,
        mStart: 3,
        yStart: 2017,
        extra: {
            '03.2017': 2500,
            '01.2018': 2500,
            '01.2019': 2500,
            '01.2020': 2500,
            '01.2021': 2500,
            '01.2022': 2500,
            '01.2023': 2500,
            '01.2024': 2500,
            '01.2025': 2500,
            '01.2026': 2500
        }
    },
    kfw: {
        rest: 50000,
        pattern: "[0-9]{4,5}",
        errorMessage: "Only numbers between 1000 and 99999",
        rate: 0.013,
        monthly: 172.54,
        mStart: 3,
        yStart: 2017,
        extra: {
            '03.2017': 6000,
            '04.2017': 6000
        }
    }
};