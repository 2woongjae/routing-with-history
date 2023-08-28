import { type BrowserHistory } from "history";
import { useEffect, useState } from "react";

const App: React.FC<{ history: BrowserHistory }> = ({ history }) => {
  const [pathname, setPathname] = useState(history.location.pathname);

  useEffect(() => {
    const unlisten = history.listen(({ location }) => {
      console.log("location", location);
      if (location.pathname === pathname) return;
      setPathname(location.pathname);
    });

    return () => {
      unlisten();
    };
  }, [history, pathname]);

  const goHome = () => {
    history.push("/");
  };

  const goAbout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (href === null) return;
    history.push(href);
  };

  console.log("render");

  return (
    <div>
      <h1>pathname: {pathname}</h1>
      <nav>
        <ul>
          <li>
            <button onClick={goHome}>Home</button>
          </li>
          <li>
            <a href="/about" onClick={goAbout}>
              About
            </a>
          </li>
        </ul>
      </nav>
      <div>
        {pathname === "/" && <h2>Home</h2>}
        {pathname === "/about" && <h2>About</h2>}
      </div>
    </div>
  );
};

export default App;
