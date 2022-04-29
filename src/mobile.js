import tw from "tailwind-styled-components";

const ErrorWrapper = tw.div`w-1/2 mx-auto p-5`;
const SizeError = tw.h1`text-2xl text-center font-serif`;
const Context = tw.h2`text-sm italic text-center font-mono`;
const MobileApp = () => {
  return (
    <ErrorWrapper>
      <SizeError>
        Not currently available for devices smaller than a laptop sorry!
      </SizeError>
      <Context>
        The app isn't designed to work well on tablet/mobile devices. Maybe I'll
        consider this in the future, but at this point in time I don't see a use
        case.
      </Context>
    </ErrorWrapper>
  );
};

export default MobileApp;
