import React from "react";
import { ToastContainer } from "react-toastify";
import styles from "/Users/tagline/Documents/project/react-exam/src/component/Teacher/CreateExam/createExam.module.css";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import createEditDesc from "../Description/CreateEditDesc";
import createEditUI from "./createEditUI";
import CreateEd from "./Teacher/createEd";
export default function CreateEdExam() {
  const {
    id,
    loading,
    subjectName,
    curIndex,
    question,
    notes,
    error,
    handleQuesChange,
    handleOptionChange,
    handleRadio,
    handleSubject,
    handlePrevious,
    handleNext,
    addNotes,
    handleNotes,
    deleteNote,
    saveChanges,
    handleSubmit,
  } = CreateEd();

  return (
    <>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles.flex}>
          <ToastContainer />
          <form onSubmit={handleSubmit} className={styles.inner}>
            {createEditDesc.map((element) => {
              return createEditUI(
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
              );
            })}

            <div className={styles.btnContainer}>
              <button
                className={styles.btn}
                onClick={handlePrevious}
                disabled={curIndex === 0}
                type="button"
              >
                Previous
              </button>
              <button
                type="button"
                className={styles.btn}
                onClick={(e) => saveChanges(e)}
              >
                Save
              </button>
              {curIndex < 14 ? (
                <>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={handleNext}
                  >
                    Next
                  </button>
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
                {notes.map((element, index) => {
                  return (
                    <div key={index} className={styles.note}>
                      <input
                        type="text"
                        name="notes"
                        value={element}
                        placeholder="Enter notes"
                        onChange={(e) => handleNotes(e, index)}
                      />
                      <button type="button" onClick={() => deleteNote(index)}>
                        X
                      </button>
                    </div>
                  );
                })}
                <ErrorContainer error={error.notesError} />

                <button
                  type="button"
                  onClick={(e, index) => addNotes(e, index)}
                >
                  Add Notes
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
