export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const applyTheme = (theme) => {
              document.documentElement.setAttribute('data-theme', theme);
            };
            
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme && savedTheme !== 'system') {
              applyTheme(savedTheme);
            } else {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              applyTheme(systemTheme);
              
              const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              mediaQuery.addEventListener('change', (e) => {
                const currentTheme = localStorage.getItem('theme');
                if (!currentTheme || currentTheme === 'system') {
                  applyTheme(e.matches ? 'dark' : 'light');
                }
              });
            }
          })();
        `,
      }}
    />
  );
}
