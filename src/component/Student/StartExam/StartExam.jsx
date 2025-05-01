import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "/src/component/axiosInstance.jsx";
import styles from "./StartExam.module.css";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";

export default function StartExam() {
  const token = localStorage.getItem("token");
  const [getExam, setExam] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [submit, setSubmit] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`student/examPaper?id=${id}`, {
          headers: {
            "access-token": token,
          },
        });
        console.log(response);
        setExam(response.data.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, []);

  const handleRadio = (id, e, index) => {
    // console.log(getExam[curIndex].options[index]);
    // const { value } = e.target;
    // const update = [...answer];
    // update[curIndex] = { question: id, answer: value };
    // setAnswer(update);
    // const updateSubmit = [...submit];
    // updateSubmit[curIndex] = {
    //   question: getExam[curIndex].question,
    //   answer: value,
    // };
    // setSubmit(updateSubmit);
  };
  console.log(getExam);

  const handleNext = (e) => {
    e.preventDefault();
    setCurIndex(curIndex + 1);
  };
  const handlePrevious = (e) => {
    e.preventDefault();
    setCurIndex(curIndex - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles.flex}>
          <h1>Exam</h1>
          {/* <form className={styles.inner}>
            <label>Question {curIndex + 1}</label>
            <input
              type="text"
              name="question"
              value={getExam[curIndex]?.question}
              readOnly
            />
            <label>Options</label>
            {getExam[curIndex]?.options.map((optionValues, index) => {
              return (
                <>
                  <label>
                    {optionValues}
                    <input
                      type="radio"
                      name={`question-${curIndex}`}
                      value={optionValues}
                      onChange={(e) =>
                        handleRadio(getExam[curIndex]._id, e, index)
                      }
                    />
                  </label>
                </>
              );
            })}
            <div className={styles.btnContainer}>
              <button
                type="button"
                className={styles.btn}
                onClick={(e) => handlePrevious(e)}
                disabled={curIndex === 0}
              >
                Previous
              </button>
              {curIndex <= 5 ? (
                <button
                  type="button"
                  className={styles.btn}
                  onClick={(e) => handleNext(e)}
                >
                  Next
                </button>
              ) : null}

              {curIndex === 6 ? (
                <Link to="/submit-review">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className={styles.btn}
                  >
                    Submit & Review
                  </button>
                </Link>
              ) : null}
            </div>
          </form> */}
        </div>
      )}
    </>
  );
}

//submit other page
//you cannot give exam again disable if one time clicked
