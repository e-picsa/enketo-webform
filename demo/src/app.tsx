import { useState } from "preact/hooks";
import "@picsa/enketo-webform";
import basic from "./fixtures/basic.json";
import kitchenSink from "./fixtures/kitchen-sink.json";
import widgets from "./fixtures/widgets.json";

type DemoType = "basic" | "widgets" | "kitchenSink";

const DEMOS: Record<
  DemoType,
  { enketoId: string; form: string; model: string }
> = {
  widgets,
  basic,
  kitchenSink,
};
const DEMO_NAMES = Object.keys(DEMOS) as DemoType[];

export function App() {
  const [demo, setDemo] = useState<DemoType>(DEMO_NAMES[0]);

  const { enketoId, form, model } = DEMOS[demo];

  return (
    <>
      <header class="demo-header">
        <h1>Enketo Webform Demo</h1>
        <nav>
          {DEMO_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              class={demo === name ? "active" : ""}
              onClick={() => setDemo(name)}
            >
              <span style={{ textTransform: "capitalize" }}>{name}</span>
            </button>
          ))}
        </nav>
      </header>

      <main>
        <enketo-webform enketoId={enketoId} form={form} model={model} />
      </main>
    </>
  );
}
