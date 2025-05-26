import React, { useState, useEffect } from "react";
import instance from "/src/component/axiosInstance.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateEd() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const createEmptyQuestion = () => ({
    question: "",
    answer: null,
    options: ["", "", "", ""],
  });
  const [loading, setLoading] = useState(false);
  const [subjectName, setSubject] = useState("");
  const [curIndex, setCurIndex] = useState(0);
  const [question, setQuestion] = useState([createEmptyQuestion()]);
  const [notes, setNotes] = useState([""]);
  const [error, setError] = useState({
    quesError: "",
    optionError: "",
    answerError: "",
    subjectError: "",
    notesError: "",
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `dashboard/Teachers/examDetail?id=${id}`,
          {
            headers: { "access-token": token },
          }
        );

        if (response.data.statusCode === 200) {
          const updatedQuestions = response.data.data.questions.map((q) => {
            const index = q.options.findIndex((opt) => opt === q.answer);
            return { ...q, answer: index !== -1 ? index : null };
          });
          setQuestion(updatedQuestions);
        }

        const examDetails = await instance.get(`dashboard/Teachers/viewExam`, {
          headers: { "access-token": token },
        });
        const examList = examDetails.data.data;
        const matchid = examList.find((element) => id === element._id);
        if (matchid) {
          setSubject(matchid.subjectName);
          setNotes(matchid.notes);
        }

        setLoading(false);
      } catch (e) {
        console.log(e)
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [id, token]);

  const validate = (name, value) => {
    const newErrors = { ...error };
    if (name === "allfield") {
      const currentQuestion = question[curIndex];

      if (currentQuestion.question === "") {
        newErrors.quesError = "Question is required";
      }

      const emptyOption = currentQuestion.options.some((opt) => opt === "");
      if (emptyOption) {
        newErrors.optionError = "All options are required";
      }

      if (currentQuestion.answer === null) {
        newErrors.answerError = "Please select a correct answer";
      }
      if (subjectName === "") {
        newErrors.subjectError = "Please select subject";
      }
    } else {
      switch (name) {
        case "question":
          newErrors.quesError = value === "" ? "Question is required" : "";
          break;
        case "option-text":
          newErrors.optionError =
            value === "" ? "All options are required" : "";
          break;
        case "answer":
          newErrors.answerError =
            value === null ? "Select one correct answer!" : "";
          break;
        case "subjectName":
          newErrors.subjectError = value === "" ? "Please select subject!" : "";
          break;
        case "notes":
          newErrors.notesError =
            value === "" ? "Please enter notes NA if not applicable" : "";
          break;
        default:
      }
    }
    setError(newErrors);
    return newErrors;
  };

  const checkExisting = () => {
    let includeQues;
    let includeAnswer;
    const quesValue = question[curIndex].question;
    const optionValue = question[curIndex].options;
    const isDuplicateQuestion = question.some(
      (q, index) => index !== curIndex && q.question.toLowerCase() === quesValue
    );
    if (isDuplicateQuestion) {
      includeQues = true;
    }
    new Set(optionValue).size !== optionValue.length
      ? (includeAnswer = true)
      : null;
    return [includeQues, includeAnswer];
  };

  const handleQuesChange = (e) => {
    const { value } = e.target;
    const update = [...question];
    update[curIndex].question = value;
    setQuestion(update);
    validate("question", value);
    setEdit(true);
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedQuestions = [...question];
    const currentQuestion = updatedQuestions[curIndex];

    currentQuestion.options[index] = value;

    setQuestion(updatedQuestions);

    validate("option-text", value);
    setEdit(true);
  };

  const handleRadio = (index) => {
    const update = [...question];
    update[curIndex].answer = index;
    setQuestion(update);
    validate("answer", update[curIndex].options[index]);
    setEdit(true);
  };

  const handleSubject = (e) => {
    const { name, value } = e.target;
    setSubject(e.target.value);
    validate(name, value);
  };

  const handlePrevious = () => {
    if (edit) {
      toast("Please save  changes before moving to the previous question.", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    if (curIndex > 0) {
      setCurIndex(curIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validate("allfield");
    if (Object.values(validationErrors).some((err) => err !== "")) return;
    // const include = checkExisting();

    if (edit) {
      toast("Please save the changes before proceeding.", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    if (curIndex < question.length - 1) {
      setCurIndex(curIndex + 1);
    } else {
      if (!id) {
        const updatedQuestions = [...question, createEmptyQuestion()];
        setQuestion(updatedQuestions);
        setCurIndex(curIndex + 1);
      }
    }
  };

  const addNotes = () => {
    setNotes([...notes, ""]);
  };
  const handleNotes = (e, index) => {
    const { name, value } = e.target;
    const updateNotes = [...notes];
    updateNotes[index] = e.target.value;
    setNotes(updateNotes);
    validate(name, value);
    setEdit(true);
  };
  const deleteNote = (rindex) => {
    const updateNotes = notes.filter((_, index) => index !== rindex);
    setNotes(updateNotes);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const validationErrors = validate("allfield");
    if (Object.values(validationErrors).some((err) => err !== "")) return;
    const [includeQues, includeAnswer] = checkExisting();
    if (includeQues) {
      toast("Question already included!", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (includeAnswer) {
      toast("Same option cant be included!", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    setEdit(false);
    toast.success("saved successfully!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let exam;
    const token = localStorage.getItem("token");

    const validationErrors = validate("allfield");
    if (Object.values(validationErrors).some((err) => err !== "")) return;
    if (edit) {
      toast("Please save  changes before submitting.", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    if (id) {
      const formatQuestions = question.map((q) => ({
        ...q,
        answer: q.options[q.answer],
      }));

      exam = {
        subjectName,
        questions: formatQuestions,
        notes,
      };
    } else {
      exam = {
        subjectName: subjectName,
        questions: question.map((q) => ({
          ...q,
          answer: q.options[q.answer],
        })),
        notes: notes,
      };
    }

    if (id) {
      try {
        const response = await instance.put(
          `dashboard/Teachers/editExam?id=${id}`,
          exam,
          { headers: { "access-token": token } }
        );

        if (response.data.statusCode === 200) {
          navigate("/dashboard");
        }
      } catch (e) {
        console.log(e)
        toast(
          "Any blank field can't be submitted and atleast one note is required!",
          {
            position: "top-center",
            autoClose: 1000,
          }
        );
      }
    } else {
      setLoading(true);

      try {
        const response = await instance({
          url: "dashboard/Teachers/Exam",
          method: "POST",
          data: exam,
          headers: {
            "access-token": token,
          },
        });
        if (response.data.statusCode === 200) {
          console.log("inside response");
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 1000,
          });
          navigate("/teacher/dashboard");
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 1000,
        });
        setLoading(false);
      }
    }
  };
  return {
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
  };
}
