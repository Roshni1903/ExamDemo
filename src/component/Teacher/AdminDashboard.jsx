import React, { useEffect, useState } from "react";
import instance from "../axiosInstance";
import styles from "./admin.module.css";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("dashboard/Teachers/viewExam", {
          headers: {
            "access-token": token,
          },
        });
        console.log(response);
        setExams(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tr>
          <th>Subject Name</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
        {exams.map((examElement) => {
          return (
            <>
              <tr>
                <td>{examElement.subjectName}</td>
                <td>{examElement.notes}</td>

                <Link to={`/edit-exam/${examElement._id}`}>
                  <button id={examElement._id}>Edit Exam</button>
                </Link>
                <button id={examElement._id}>delete Exam</button>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
}
