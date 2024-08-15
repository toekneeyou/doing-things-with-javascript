import { PropsWithChildren } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Fallback from "../../views/fallback/Fallback";

const ErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  const onReset: (
    details:
      | {
          reason: "imperative-api";
          args: any[];
        }
      | {
          reason: "keys";
          prev: any[] | undefined;
          next: any[] | undefined;
        }
  ) => void = (details) => {
    console.log(details);
  };

  const onError: (error: Error, info: React.ErrorInfo) => void = (error) => {
    console.log(error);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onReset={onReset}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
