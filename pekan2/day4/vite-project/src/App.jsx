import "./App.css";

import FetchDataComponent from "./components/FetchDataComponent";
import AxiosDataComponent from "./components/AxiosDataComponent";
import AbortFetchComponent from "./components/AbortFetchComponent";
import UserListManipulated from "./components/UserListManipulated";

function Section({ title, subtitle, children }) {
  return (
    <section className="card">
      <div className="card__head">
        <h2 className="card__title">{title}</h2>
        {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
      </div>
      <div className="card__body">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app container">
      <h1 className="pageTitle">BAB 2.4 — API Integration & Async</h1>

      <Section title="1) Fetch API" subtitle="GET /posts/1">
        <FetchDataComponent />
      </Section>

      <Section title="2) Axios" subtitle="GET /users/1">
        <AxiosDataComponent />
      </Section>

      <Section title="3) AbortController" subtitle="cleanup on unmount">
        <AbortFetchComponent />
      </Section>

      <Section title="4) Manipulasi JSON" subtitle="map + filter + nested">
        <UserListManipulated />
      </Section>
    </div>
  );
}
