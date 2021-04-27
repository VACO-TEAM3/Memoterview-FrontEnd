import styled from "styled-components";

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }

  label {
    float: right;
    width: 2rem;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    font-size: 2rem;
  }

  label:before {
    content: "★";
  }

  input:checked ~ label {
    color: ${({ theme }) => theme.LittleBoyBlue};  
  }

  label:hover,
  label:hover ~ label {
    color: ${({ theme }) => theme.LittleBoyBlueDark}; 
  }

  .rate > input:checked + label:hover,
  .rate > input:checked + label:hover ~ label,
  .rate > input:checked ~ label:hover,
  .rate > input:checked ~ label:hover ~ label,
  .rate > label:hover ~ input:checked ~ label {
    color: ${({ theme }) => theme.LittleBoyBlueDeepDark};  
  }
`;

export default function RatingStars({ onChange, rateOption }) {
  function handleChange({ target: { name, value } }) {
    onChange(name, value);
  }

  return (
    <RatingWrapper>
      <div className="rate" onChange={handleChange}>
        <input type="radio" id={`star5-${rateOption}`} value="5" name={`${rateOption}`} />
        <label htmlFor={`star5-${rateOption}`} />
        <input type="radio" id={`star4-${rateOption}`} value="4" name={`${rateOption}`} />
        <label htmlFor={`star4-${rateOption}`} />
        <input type="radio" id={`star3-${rateOption}`} value="3" name={`${rateOption}`} />
        <label htmlFor={`star3-${rateOption}`} />
        <input type="radio" id={`star2-${rateOption}`} value="2" name={`${rateOption}`} />
        <label htmlFor={`star2-${rateOption}`} />
        <input type="radio" id={`star1-${rateOption}`} value="1" name={`${rateOption}`} />
        <label htmlFor={`star1-${rateOption}`} />
      </div>
    </RatingWrapper>
  );
}
