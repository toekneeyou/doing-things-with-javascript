import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputGroup from "../../components/inputGroup/InputGroup";
import { navRoutes, reactRouterRoutes } from "../../services/routes";
import { useMemo, useState } from "react";

export default function HomeView() {
  const navigate = useNavigate();

  const randomize = () => {
    const randomPath = reactRouterRoutes[
      Math.floor(Math.random() * reactRouterRoutes.length)
    ].path as string;
    navigate(randomPath);
  };

  return (
    <div className="h-full w-full centered">
      <div className="centered flex-col">
        <h1 className="text-9xl mb-8 font-bold">
          <strong className="text-app-yellow">JS</strong> Visual
        </h1>
        <div className="w-full flex items-center gap-x-4">
          <InputGroup
            inputGroupClassName="w-full"
            placeholder="What are you looking for?"
          />
          <Button onClick={randomize}>Randomize</Button>
        </div>
      </div>
    </div>
  );
}
