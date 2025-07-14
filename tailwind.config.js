/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': { 
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px 0 rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              fontWeight: '500',
              borderRadius: '0.25rem',
              paddingLeft: '0.125rem',
              paddingRight: '0.125rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
                backgroundColor: 'var(--tw-prose-links-bg)',
              },
              '&:focus': {
                outline: '2px solid var(--tw-prose-links)',
                outlineOffset: '2px',
              },
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal',
            },
            ol: {
              'list-style-type': 'var(--list-counter-style, decimal)',
            },
            'ol > li': {
              'padding-left': '0.25rem',
            },
            'ul > li': {
              'padding-left': '0.25rem',
            },
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              marginBottom: '1rem',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              marginTop: '1.25rem',
              marginBottom: '0.75rem',
            },
            img: {
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            video: {
              borderRadius: '0.5rem',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.7142857',
              border: '1px solid var(--tw-prose-pre-border)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
              backgroundColor: 'var(--tw-prose-quote-bg)',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#e5e7eb',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-lead': '#d1d5db',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-links-hover': '#93c5fd',
            '--tw-prose-links-bg': 'rgba(59, 130, 246, 0.1)',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-counters': '#9ca3af',
            '--tw-prose-bullets': '#6b7280',
            '--tw-prose-hr': '#374151',
            '--tw-prose-quotes': '#d1d5db',
            '--tw-prose-quote-borders': '#374151',
            '--tw-prose-quote-bg': 'rgba(59, 130, 246, 0.05)',
            '--tw-prose-captions': '#9ca3af',
            '--tw-prose-code': '#f3f4f6',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-pre-border': '#374151',
            '--tw-prose-th-borders': '#4b5563',
            '--tw-prose-td-borders': '#374151',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 