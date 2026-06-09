import ErrorBoundary from "@/components/ErrorBoundary";
import CharacterFallback from "./CharacterFallback";
import Scene from "./Scene";

const CharacterModel = () => {
  return (
    <ErrorBoundary fallback={<CharacterFallback />}>
      <Scene />
    </ErrorBoundary>
  );
};

export default CharacterModel;
