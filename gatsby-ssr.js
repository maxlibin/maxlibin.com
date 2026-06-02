const React = require('react');

exports.onRenderBody = ({setHeadComponents}) => {
  setHeadComponents([
    <link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gf-preconnect2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="inter"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    />,
    <script
      key="favicon"
      dangerouslySetInnerHTML={{
        __html: `(function() {
          try {
            var h = parseInt(new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Singapore', hour: 'numeric', hour12: false}).format(new Date()), 10) % 24;
            var e = (h >= 6 && h < 12) ? '🟢' : (h >= 12 && h < 18) ? '🧑‍💻' : (h >= 18 && h < 22) ? '😌' : '😴';
            var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>" + e + "</text></svg>";
            var href = "data:image/svg+xml," + encodeURIComponent(svg);
            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement('link');
              link.setAttribute('rel', 'icon');
              document.head.appendChild(link);
            }
            link.setAttribute('href', href);
          } catch (err) {}
        })();`,
      }}
    />,
    <script
      key="darkmode"
      dangerouslySetInnerHTML={{
        __html: `(function() {
            function setTheme(theme) {
              window.__theme = theme;
              if (theme === 'dark') {
                document.documentElement.className = 'dark';
              } else {
                document.documentElement.className = '';
              }
            };
            window.__setPreferredTheme = function(theme) {
              setTheme(theme);
              try {
                localStorage.setItem('color-theme', theme);
              } catch (e) {}
            };
            let preferredTheme;
            try {
              preferredTheme = localStorage.getItem('color-theme');
            } catch (e) {}
            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
          })();`,
      }}
    />,
  ]);
};
