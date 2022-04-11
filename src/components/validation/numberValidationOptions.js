import tw from "tailwind-styled-components";

const StyledMain = tw.div`grid grid-rows-2 w-[65%] mx-auto`;

const StyledInputGroup1 = tw.div`grid grid-cols-2 gap-4`;
const StyledInputGroup2 = tw.div`flex gap-4 m-auto`;

const StyledInputGroupItemWrapper = tw.div`flex flex-col`;
const StyledInputGroupItem = tw.div`grid grid-cols-6 my-1`;

const StyledCheckboxWrapper = tw.div`col-span-2 my-auto font-mono text-sm`;
const StyledInput = tw.input`col-span-4 h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg`;

const NumberValidationOptions = ({ UpdateValidations }) => {
  return (
    <StyledMain>
      <StyledInputGroup1>
        <StyledInputGroupItemWrapper>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input type="checkbox" id="greater" name="greater" />{" "}
              <label htmlFor="greater">greater</label>
            </StyledCheckboxWrapper>

            <StyledInput type="number" />
          </StyledInputGroupItem>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input type="checkbox" id="less" name="less" />{" "}
              <label htmlFor="less">less</label>
            </StyledCheckboxWrapper>

            <StyledInput type="number" />
          </StyledInputGroupItem>
        </StyledInputGroupItemWrapper>
        <StyledInputGroupItemWrapper>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input type="checkbox" id="min" name="min" />{" "}
              <label htmlFor="min">min</label>
            </StyledCheckboxWrapper>

            <StyledInput type="number" />
          </StyledInputGroupItem>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input type="checkbox" id="max" name="max" />{" "}
              <label htmlFor="max">max</label>
            </StyledCheckboxWrapper>

            <StyledInput type="number" />
          </StyledInputGroupItem>
        </StyledInputGroupItemWrapper>
      </StyledInputGroup1>

      <StyledInputGroup2>
        <StyledCheckboxWrapper>
          <input type="checkbox" id="integer" name="integer" />{" "}
          <label htmlFor="integer">integer</label>
        </StyledCheckboxWrapper>

        <StyledCheckboxWrapper>
          <input type="checkbox" id="required" name="required" />{" "}
          <label htmlFor="required">required</label>
        </StyledCheckboxWrapper>
      </StyledInputGroup2>
    </StyledMain>
  );
};

export default NumberValidationOptions;
