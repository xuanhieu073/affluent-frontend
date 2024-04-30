function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue != undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ["./src/**/*.{pug,js}"],
  theme: {
    screens: {
      xs: "376px",
      "mobile-max": "420px",
      "mobile-flipcard": "628px",
      mobile: "768px",
      "tablet-flipcard": "942px",
      tablet: "961px",
      "tablet-header": "1040px",
      desktop: "1200px",
    },
    fontFamily: {
      sharpsans: "SharpSansDispNo1, Helvetica, sans-serif",
      sourcesans3: ['"Source Sans 3"', '"sans-serif"'],
    },
    fontWeight: {
      black: 900,
      extrabold: 800,
      bold: 700,
      semibold: 600,
      medium: 500,
      normal: 400,
      light: 300,
      thin: 250,
      ultrathin: 200,
      hairline: 100,
    },
    fontSize: {
      base: ["1rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "hero-banner": ["3rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "section-header-h1": ["2.5rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "section-header-h2": ["1.75rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "section-header-h3": ["1.5rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "card-header-h1": ["2rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "card-header-h2": ["1.75rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "card-header-h3": ["1.5rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "card-sub-header": ["1.25rem", { lineHeight: "1.4", letterSpacing: 0 }],
      "card-sub-header-2": [
        "1.125rem",
        { lineHeight: "1.4", letterSpacing: 0 },
      ],
      note: ["0.75rem", { lineHeight: "1.4", letterSpacing: 0 }],
      label: ["0.75rem", { lineHeight: "1.4", letterSpacing: 0 }],
      description: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      "section-label": [
        "0.75rem",
        { lineHeight: "1.4", letterSpacing: "0.08em" },
      ],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        desktop: "0rem",
      },
      screens: {
        xs: "960px",
        mobile: "960px",
        tablet: "1200px",
        desktop: "1248px",
      },
    },
    boxShadow: {
      color: "0px 1px 30px rgba(0, 0, 0, 0.1)",
      white: "0px 1px 20px rgba(0, 0, 0, 0.1)",
      dropdown: "0px 15px 21px rgba(0, 0, 0, 0.06)",
      bottom: "0px -15px 21px rgba(0, 0, 0, 0.02)",
      sticky: "0px 4px 16px rgba(0, 0, 0, 0.16)",
      card: "0px 1px 17px rgba(0, 0, 0, 0.09)",
      accordionSmall: "0px 2px 20px rgba(0, 0, 0, 0.07)",
    },
    extend: {
      colors: {
        "singlife-red": "#ff000b", //- rgb(255,0,11)
        "singlife-red-100": "#FF0008",
        "singlife-red-300": "#f2605f", //- rgb(242,96,95)
        "singlife-red-400": "#FA8F8C",
        "singlife-purple": "#883e89", //- rgb(136,62,137)
        "singlife-purple-100": "#B474B0", //- rgb(180,116,176)
        "singlife-purple-200": "#783780", //- rgb(120,55,128) //+banner
        "singlife-purple-400": "#F2E6F1", //- rgb(242,230,241)
        "singlife-blue": "#2b5888", //- rgb(43,88,136)
        "singlife-blue-100": "#588ed5", //- rgb(88,142,213) //+banner
        "singlife-blue-200": "#001898",
        "singlife-blue-300": "#2B58B8",
        "singlife-blue-400": "#e3f2fd", //- rgb(227,242,253)
        "singlife-blue-500": "#19D3C5",
        "singlife-blue-600": "#004FB6",
        "singlife-orange": "#f47815", //- rgb(244,120,21)
        "singlife-orange-200": "#fff7f7", //- rgb(255,247,247)
        "singlife-orange-300": "#ffa168", //- rgb(255,161,104)
        "singlife-orange-400": "#ff5c00", //- rgb(255, 92, 0)
        "singlife-orange-500": "#fcece8", //- rgb(252, 236, 232)
        "singlife-orange-600": "#ffd5be", //- rgb(255, 213, 190)
        "singlife-orange-700": "#ff0008", //- rgb(255,0,8)
        "singlife-orange-800": "#F47815", //- rgb(255,0,8)
        "singlife-orange-900": "#fefafa", //- rgb(254,250,250)
        "singlife-teal": "#00baa4", //- rgb(0,186,164) //+banner
        "singlife-teal-100": "#13A498",
        "singlife-teal-200": "#DFF7F6",
        "singlife-yellow": "#f0c000", //- rgb(240,192,0)
        "singlife-yellow-100": "#e8aa01", //- rgb(232,170,1) //+banner
        "singlife-yellow-200": "#FFC700",
        grey: "#434343", //- primary grey rgb(67, 67, 67)
        "grey-100": "#fafafa",
        "grey-150": "#fbfbfb",
        "grey-200": "#c4c4c4",
        "grey-300": "#f5f5f5",
        "grey-400": "#76675d",
        "grey-500": "#504f4e",
        "grey-600": "#393939",
        "grey-700": "#8A8988", //- rgb(138,137,136) //+banner
        "grey-800": "#EFEEED",
        "grey-900": "#C4C4C4",
        "grey-1000": "#CCCCCC",
        "grey-1100": "#E4E4E4",
        "grey-1200": "#D8D8D8",
        "grey-1300": "#F5F5F5",
        "grey-1400": "#FFE9EC",
        "grey-1500": "#535353",
        "grey-1600": "#9D9D9D",
        "singlife-green": "#00AC95",
        "singlife-green-100": "#00FFDD",
        "singlife-black-100": "#1C1C1C",
        "singlife-black-200": "#262626",
        "singlife-black-300": "#434343",
        "singlife-black-400": "#2D2D2D",
        "singlife-white": "#F8F8F8",
        "singlife-white-100": "#F8F7F6",
        "sl-affluent": {
          red: {
            DEFAULT: "#590402",
            100: "#C50000",
          },
          gray: {
            DEFAULT: "#E0E0E0",
            100: "#E2E0E0",
            200: "#F0F0F0",
          },
          beige: {
            DEFAULT: "#EDDEC2",
            100: "#CAA97C",
            200: "#CFAE7C",
          },
          primary: {
            button: "#F2E3C7",
          },
        },
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          title: withOpacity("--color-text-title"),
          media: withOpacity("--color-text-media-title"),
          "quote-bg": withOpacity("--color-quote-bg"),
          type1: withOpacity("--bg-gradient-type-one"),
          type2: withOpacity("--bg-gradient-type-two"),
          type3: withOpacity("--bg-gradient-type-three"),
        },
      },
      backgroundColor: {
        overlay: "rgba(0, 0, 0, 0.7)",
        skin: {
          fill: withOpacity("--color-fill"),
          lighter: withOpacity("--color-fill-lighter"),
          media: withOpacity("--color-fill-media"),
          hover: withOpacity("--color-fill-hover"),
          label: withOpacity("--color-fill-label"),
          "get-app": withOpacity("--color-fill-get-app"),
          banner: withOpacity("--bg-gradient"),
          type1: withOpacity("--bg-gradient-type-one"),
          type2: withOpacity("--bg-gradient-type-two"),
          type3: withOpacity("--bg-gradient-type-three"),
          blog: withOpacity("--color-fill-blog"),
        },
      },
      borderColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          lighter: withOpacity("--color-fill-lighter"),
        },
      },
      borderRadius: {
        button: "100px",
        "right-side": "0px 100px 100px 0px",
      },
      animation: {
        cloud1: "cloud1 100s linear infinite",
        cloud2: "cloud2 120s linear infinite",
        cloud3: "cloud3 120s linear infinite",
        gradient: "gradient 5s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "wsl-cloud1": "wsl-cloud1 100s linear infinite",
        "wsl-cloud2": "wsl-cloud2 100s linear infinite",
        "wsl-cloud2-part2": "wsl-cloud2-part2 100s linear infinite",
        "wsl-cloud3": "wsl-cloud3 100s linear infinite",
        "wsl-cloud3-part2": "wsl-cloud3-part2 100s linear infinite",
        "wsl-cloud-small": "wsl-cloud-small 100s linear infinite",
        "wsl-cloud-big": "wsl-cloud-big 70s linear infinite",
      },
      keyframes: {
        cloud1: {
          "0%": { left: "-100px" },
          "100%": { left: "100%" },
        },
        cloud2: {
          "0%": { left: "80%" },
          "10%": { left: "100%" },
          "100%": { left: "100%" },
        },
        cloud3: {
          "0%": { left: "-10%" },
          "20%": { left: "-10%" },
          "100%": { left: "100%" },
        },
        gradient: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(250px, 250px)" },
        },
        "wsl-cloud1": {
          "0%": { left: "0%", opacity: 0 },
          "20%": { opacity: 0.7 },
          "70%": { opacity: 0.7 },
          "90%": { opacity: 0 },
          "100%": { left: "100%" },
        },
        "wsl-cloud2": {
          "0%": { left: "52%" },
          "48%": { left: "100%" },
          "100%": { left: "100%" },
        },
        "wsl-cloud2-part2": {
          "0%": { left: "-120px" },
          "48%": { left: "-120px" },
          "100%": { left: "52%" },
        },
        "wsl-cloud3": {
          "0%": { left: "91%" },
          "9%": { left: "100%" },
          "100%": { left: "100%" },
        },
        "wsl-cloud3-part2": {
          "0%": { left: "-160px", opacity: 0 },
          "9%": { left: "-160px" },
          "19%": { opacity: 1 },
          "100%": { left: "91%" },
        },
      },
    },
  },
  plugins: [],
};
