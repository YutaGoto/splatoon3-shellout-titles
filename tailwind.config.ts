import type { Config } from "tailwindcss";

export default {
  theme: {
    fontFamily: {
      body: [
        "Meiryo UI",
        "Hiragino Kaku Gothic ProN",
        "ヒラギノ角ゴ ProN W3",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        "purple": "#603bff",
        "yellow": "#eaff3d",
      },
    },
  },
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
} satisfies Config;
