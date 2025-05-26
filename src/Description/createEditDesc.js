const createEditDesc = [
  {
    label: "Subject",
    name: "subjectName",
    type: "text",
    placeholder: "Enter subject",
    fun: "handleSubject",
  },

  {
    label: "Question",
    name: "question",
    type: "text",
    placeholder: `Enter question`,
  },
  {
    label: "Options",
    name: "question",
    type: "radio",
    placeholder: "Enter option",
  },

  {
    label: "Answer",
    name: "answer",
    type: "text",
    placeholder: "Select correct answer from above",
  },
];
export default createEditDesc;
