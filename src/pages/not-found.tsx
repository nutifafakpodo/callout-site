import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-100">
          Nothing at this address.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-ink-400">
          The page you were after has moved or never existed.
        </p>
        <div className="mt-8">
          <Button href="/">Back to the start</Button>
        </div>
      </div>
    </div>
  );
}
