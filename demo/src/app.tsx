import { useState } from "preact/hooks";
import "@picsa/enketo-webform";
import basic from "./fixtures/basic.json";
import kitchenSink from "./fixtures/kitchen-sink.json";

type DemoType = "basic" | "kitchenSink";

const DEMOS: Record<
  DemoType,
  { enketoId: string; form: string; model: string }
> = {
  basic,
  kitchenSink,
};

export function App() {
  const [demo, setDemo] = useState<DemoType>("basic");

  const { enketoId, form, model } = DEMOS[demo];

  return (
    <>
      <header class="demo-header">
        <h1>Enketo Webform Demo</h1>
        <nav>
          <button
            type="button"
            class={demo === "basic" ? "active" : ""}
            onClick={() => setDemo("basic")}
          >
            Basic
          </button>
          <button
            type="button"
            class={demo === "kitchenSink" ? "active" : ""}
            onClick={() => setDemo("kitchenSink")}
          >
            Kitchen Sink
          </button>
        </nav>
      </header>

      <main>
        <enketo-webform enketoId={enketoId} form={form} model={model} />
      </main>
    </>
  );
}
