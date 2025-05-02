import React, { useState, useEffect } from "react";
import instance from "/src/component/axiosInstance.jsx";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import styles from "./student.module.css";
import { Link } from "react-router-dom";
export default function StudentDashboard() {
  const token = localStorage.getItem("token");
  const [allExam, setAllExam] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get("student/studentExam", {
          headers: {
            "access-token": token,
          },
        });
        console.log(response);
        setAllExam(response.data.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (token) {
      fetchData();
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th colSpan={2}>Notes</th>
                <th>Actions</th>
                <th>Score</th>
                <th>Rank</th>

                <th>Result Status</th>
              </tr>
            </thead>
            <tbody>
              {allExam.map((element) => (
                <tr key={element._id}>
                  <td>{element.subjectName}</td>
                  {element.notes.map((noteElement) => {
                    return <td>{noteElement}</td>;
                  })}
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/start-exam/${element._id}`}>
                        <button
                          id={element._id}
                          className={styles.btn}
                          disabled={element.Result.length !== 0}
                        >
                          Start Exam
                        </button>
                      </Link>
                    </div>
                  </td>
                  {element?.Result?.map((resultElement) => {
                    return (
                      <>
                        <td>{resultElement.score}</td>
                        <td>{resultElement.rank}</td>
                        <td>{resultElement.resultStatus}</td>
                      </>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

//   "Result": []->empty array available
// Result
// :
// Array(1)
// 0
// :
// {_id: '6814c02237b3c500621c6b48', rank: 13, subjectName: 'C/C++', score: 3, resultStatus: 'Declared'}
// length
// :
// 1
