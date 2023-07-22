import { SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  Link,
  Outlet,
  RootRoute,
  Route,
  Router,
  redirect,
} from "@tanstack/router";
import { ReactNode } from "react";
import { AboutPage } from "./routes/about";
import { HomePage } from "./routes/home";

function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div>
          <div>Pleae Sign In To View This Page</div>

          <button onClick={() => redirect("/sign-in")} type="button">
            {" "}
            Sign In{" "}
          </button>
        </div>
      </SignedOut>
    </>
  );
};

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: () => {
    return <div>Sign In</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
