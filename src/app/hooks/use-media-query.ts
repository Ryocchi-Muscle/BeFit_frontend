import { useMediaQuery } from "@custom-react-hooks/all";

const MediaQueryComponent = () => {
  const isWide = useMediaQuery("(min-width: 600px)");

  return (
    <div>
      {isWide ? "Wide viewport detected" : "Narrow viewport detected"}
      <br />
      <span>
        <i>Resize to see the effect</i>
      </span>
    </div>
  );
};

export default MediaQueryComponent;
