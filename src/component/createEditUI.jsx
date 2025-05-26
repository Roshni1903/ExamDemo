const createEditUI = (
  id,
  element,
  question,
  curIndex,
  subjectName,
  error,
  addNotes,
  deleteNote,
  saveChanges,
  handleNotes,
  handleNext,
  handleQuesChange,
  handleOptionChange,
  handleSubject,
  handleRadio,
  handlePrevious,
  handleSubmit
) => {
  switch (element.type) {
    case "text": {
      return (
        <>
          {element.name !== "answer" ? (
            <div>
              <b>
                <label key={element.label}>{element.label} </label>
              </b>
              <input
                name={element.name}
                type={element.type}
                placeholder={element.placeholder}
                value={
                  element.name === "subjectName"
                    ? subjectName
                    : question[curIndex].question
                }
                onChange={(e) =>
                  element.name === "subjectName"
                    ? handleSubject(e)
                    : handleQuesChange(e)
                }
              ></input>
              <ErrorContainer
                error={
                  element.name === "subjectName"
                    ? error.subjectError
                    : error.quesError
                }
              />
            </div>
          ) : (
            <>
              <label>{element.label}</label>
              <input
                name={element.name}
                type={element.type}
                value={
                  question[curIndex].answer !== null
                    ? question[curIndex].options[question[curIndex].answer]
                    : ""
                }
                placeholder={element.placeholder}
                readOnly
              />
              <ErrorContainer error={error.answerError} />
            </>
          )}
        </>
      );
    }
    case "radio": {
      return (
        <>
          <label>{element.label}</label>
          {question[curIndex].options.map((opt, index) => {
            return (
              <>
                <input
                  type={element.type}
                  name={`${element.name}-${curIndex}`}
                  value={id ? null : index}
                  checked={question[curIndex].answer === index}
                  onChange={() => handleRadio(index)}
                />
                <input
                  type="text"
                  name="option-text"
                  value={opt}
                  onChange={(e) => handleOptionChange(e, index)}
                  placeholder={`${element.placeholder} ${index + 1}`}
                />
              </>
            );
          })}
          <ErrorContainer error={error.optionError} />
        </>
      );
    }
  }
};

const ErrorContainer = ({ error }) => {
  if (error) {
    return <span style={{ color: "red" }}>{error}</span>;
  } else {
    return null;
  }
};
export default createEditUI;

//desc
// in text
//function call,value and error
//answer change and subject new field
