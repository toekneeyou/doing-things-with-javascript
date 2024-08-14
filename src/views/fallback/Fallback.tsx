import { FallbackProps } from "react-error-boundary";
import Button from "../../components/button/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="bg-app-dark-blue w-screen h-screen centered text-white"
    >
      <div className="centered flex-col gap-y-8 bg-app-slate-blue rounded-xl p-8">
        <ExclamationTriangleIcon className="size-12 text-app-error" />
        <p>Uhoh.. something went wrong!</p>
        <pre className="text-app-error">{error.message}</pre>
        <Button onClick={resetErrorBoundary}>Reset</Button>
      </div>
    </div>
  );
}
