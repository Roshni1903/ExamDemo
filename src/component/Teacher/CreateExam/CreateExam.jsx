import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "./createExam.module.css";
export default function CreateExam() {
  const addEmptyQues = [
    {
      question: "",
      answer: "",
      options: ["", "", "", ""],
    },
  ];
  const [subject, setSubject] = useState("");
  const [curIndex, setCurIndex] = useState(0);
  const [question, setQuestion] = useState(addEmptyQues);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState({
    quesError: "",
    optionError: "",
    answerError: "",
  });
  const [edit, setEdit] = useState(false);

  const validate = () => {
    const error = {};
    if (question[curIndex].question === "") {
      error.quesError = "enter question!";
    } else {
      error.quesError = "";
    }
    const setoption = question[curIndex].options.some((element) => {
      return element === "";
    });
    if (setoption) {
      error.optionError = "any option can't be empty!";
    } else {
      error.optionError = "";
    }
    if (question[curIndex].answer === "") {
      error.answerError = "select any one from above!";
    } else {
      error.answerError = "";
    }
    setError(error);
    return error;
  };
  const handleQuesChange = (e) => {
    setEdit(true);
    const update = [...question];
    update[curIndex].question = e.target.value;
    setQuestion(update);
    validate();
  };
  const handleOptionChange = (e, index) => {
    const update = [...question];
    update[curIndex].options[index] = e.target.value;
    setQuestion(update);
    validate();
  };
  // const addQuestion = (e) => {
  //   e.preventDefault();
  //   if (question.length < 15) {
  //     setQuestion([...question, ...addEmptyQues]);
  //     setCurIndex(curIndex + 1);
  //   }
  // };

  const saveChanges = () => {
    setEdit(false);
  };
  const handleNotes = (e) => {
    const { value } = e.target;
    setNotes([value]);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurIndex(curIndex - 1);
  };
  const handleNext = (e) => {
    const error = validate();
    const hasError = Object.values(error).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      setQuestion([...question, ...addEmptyQues]);
      setCurIndex(curIndex + 1);
    }

    // if (edit) {
    //   toast("Please save the changes first", {
    //     position: "top-center",
    //     autoClose: 1000,
    //   });
    // }
    // if (question.length < 15) {
    //   setQuestion([...question, ...addEmptyQues]);
    //   setCurIndex(curIndex + 1);
    // }
    // if (curIndex + 1 === question.length) {
    //   alert("please add Question first..");
    // } else {
    //   setCurIndex(curIndex + 1);
    // }
  };
  // const handleAnswerChange = (e) => {
  //   const update = [...question];
  //   update[curIndex].answer = e.target.value;
  //   setQuestion(update);
  // };
  const handleRadio = (e) => {
    const update = [...question];
    update[curIndex].answer = e.target.value;
    setQuestion(update);
    validate();
  };
  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const examobj = {
      subjectName: subject,
      questions: question,
      notes: notes,
    };
    console.log(examobj);
  };
  return (
    <div className={styles.flex}>
      <ToastContainer />

      <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
        {curIndex === 0 ? (
          <>
            <h2>create Exam</h2>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              value={subject}
              placeholder="enter subject"
              onChange={(e) => handleSubject(e)}
            />
          </>
        ) : null}
        {addEmptyQues.map((ques) => {
          return (
            <>
              <label htmlFor="question">Question{curIndex + 1}</label>
              <input
                type="text"
                placeholder={`enter question ${curIndex + 1}`}
                value={question[curIndex].question}
                onChange={(e) => {
                  handleQuesChange(e);
                }}
              />
              <ErrorContainer error={error.quesError} />
              <label htmlFor="options">Options</label>
              {ques.options.map((element, index) => {
                return (
                  <div className={styles.optionContainer}>
                    <input
                      type="radio"
                      name="option"
                      value={question[curIndex].options[index]}
                      onChange={(e) => {
                        handleRadio(e);
                      }}
                    />
                    <input
                      type="text"
                      value={question[curIndex].options[index]}
                      onChange={(e) => handleOptionChange(e, index)}
                      placeholder={`enter option ${index + 1}`}
                    />
                  </div>
                );
              })}
              <ErrorContainer error={error.optionError} />

              <label htmlFor="answer">Answer</label>
              <input
                type="text"
                value={question[curIndex].answer}
                placeholder="select correct answer from above"
              />
              <ErrorContainer error={error.answerError} />
            </>
          );
        })}
        <div className={styles.btnContainer}>
          <button
            className={styles.btn}
            onClick={(e) => handlePrevious(e)}
            disabled={curIndex === 0}
          >
            Previous
          </button>
          {curIndex < 14 ? (
            <>
              {/* <button className={styles.btn} onClick={(e) => addQuestion(e)}>
                Add Question
              </button> */}
              <button className={styles.btn} onClick={saveChanges}>
                Save
              </button>
              <button className={styles.btn} onClick={(e) => handleNext(e)}>
                Next
              </button>
            </>
          ) : (
            <>
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </>
          )}
        </div>
        {curIndex === 14 ? (
          <>
            <label htmlFor="notes">Add notes</label>

            <input
              type="text"
              placeholder="enter notes"
              onChange={(e) => {
                handleNotes(e);
              }}
            />
          </>
        ) : null}
      </form>
    </div>
  );
}
const ErrorContainer = ({ error }) => {
  if (error) {
    return <span style={{ color: "red" }}>{error}</span>;
  } else {
    return null;
  }
};

//if change->save first
//validation if any value is empty(before next)
//field check error again error empty on change
//if nochange->save first
//same-create and edit
//next,previous btn,with notes field at last

//changes:
// validaion break
//option clear
