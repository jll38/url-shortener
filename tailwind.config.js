/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'banana' : '#FFD60A',
        'lemon' : '#FFC300',
        'bleu' : '#003566',
        'blueberry' : '#001D3D',
        'blackberry' : '#000814',
        'delft-blue' : '#2B3A67',
        'payne-gray' : '#496A81',
        'moonstone' : '#66999B',
        'sage' : '#B3AF8F',
        'peach' : '#FFC482'
      }
    },
  },
  plugins: [],
}
