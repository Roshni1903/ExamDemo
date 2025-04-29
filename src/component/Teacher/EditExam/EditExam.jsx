import React, { useEffect, useState } from "react";
import styles from "./editExam.module.css";
import instance from "../../axiosInstance";
import { useParams } from "react-router-dom";
export default function EditExam() {
  const [question, setQuestion] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `dashboard/Teachers/examDetail?id=${id}`,
          {
            headers: {
              "access-token": token,
            },
          }
        );
        console.log(response.data);
        if (response.data.statusCode === 200) {
          setQuestion(response.data.data);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);
  console.log(question);
  return (
    <>
      <div className={styles.flex}>
        <form className={styles.inner}>
          {/* {curIndex === 0 && (
          <>
            <h2>Edit Exam</h2>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              value={subject}
              name="subject"
              placeholder="Enter subject"
              onChange={handleSubject}
            />
            <ErrorContainer error={error.subjectError} />
          </>
        )} */}
          {question.length > 0 && (
            <>
              <label htmlFor="question">Question {curIndex + 1}</label>
              <input
                type="text"
                name="question"
                placeholder={`Enter question ${curIndex + 1}`}
                value={question[curIndex].question}
              />
              {/* <ErrorContainer error={error.quesError} /> */}

              <label>Options</label>
              {question[curIndex].options.map((opt, index) => (
                <div key={index} className={styles.optionContainer}>
                  <input
                    type="radio"
                    name={`question-${curIndex}`}
                    value={index}
                    checked={question[curIndex].answer === index}
                  />
                  <input
                    type="text"
                    name="option-text"
                    value={opt}
                    placeholder={`Enter option ${index + 1}`}
                  />
                </div>
              ))}
              {/* <ErrorContainer error={error.optionError} /> */}

              <label>Answer</label>
              <input
                name="answer"
                type="text"
                value={
                  question[curIndex].answer !== ""
                    ? question[curIndex].options[question[curIndex].answer]
                    : ""
                }
                placeholder="select Correct answer from above"
              />
              {/* <ErrorContainer error={error.answerError} /> */}
            </>
          )}

          <div className={styles.btnContainer}>
            <button className={styles.btn} disabled={curIndex === 0}>
              Previous
            </button>
            {curIndex < 14 ? (
              <>
                <button className={styles.btn}>Save</button>
                <button className={styles.btn}>Next</button>
              </>
            ) : (
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            )}
          </div>

          {curIndex === 14 && (
            <>
              <label htmlFor="notes">Add notes</label>
              <input type="text" value={notes} placeholder="Enter notes" />
            </>
          )}
        </form>
      </div>
    </>
  );
}
