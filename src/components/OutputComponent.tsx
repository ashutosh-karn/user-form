import { useFormContext } from "react-hook-form";
import "./styles.css";
const OutputComponent = () => {
  const { getValues } = useFormContext();
  const formData = getValues();

  return (
    <div className="App output-component">
      <div className="form-container">
        <ul className="userDetails">
          <li>First name: {formData?.firstName}</li>
          <li>Last name: {formData?.lastName}</li>
          <li>Mobile number:{formData?.mobileNumber}</li>
          <li>Email: {formData?.email}</li>
          <li>Gender: {formData?.gender}</li>
          <li>Date of birth: {formData?.dob}</li>
        </ul>
        <ul className="userDetails">
          <li>Tech stack: </li>
          {formData?.techStack.map((tech: string, index: number) => {
            return (
              <li key={index} className="techStackList">
                {tech}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OutputComponent;
