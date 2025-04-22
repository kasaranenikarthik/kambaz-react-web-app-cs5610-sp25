import React, { useState } from "react";
import { Form, Button, FormCheck } from "react-bootstrap";
import { MultipleChoiceQuestion } from "../QuizQuestionEditor";

interface MultipleChoiceEditorProps {
  question: MultipleChoiceQuestion;
  onChange: (question: MultipleChoiceQuestion) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function MultipleChoiceEditor({
  question,
  onChange,
  onCancel,
  onSave
}: MultipleChoiceEditorProps) {
  // Convert single correctAnswer string to array of correct answers
  const [multipleCorrectAnswers, setMultipleCorrectAnswers] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    question.correctAnswer ? [question.correctAnswer] : []
  );
  
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...question,
      question: e.target.value
    });
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const points = parseInt(e.target.value, 10) || 0;
    onChange({
      ...question,
      points
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = { text: value };
    
    // Update correctAnswers if this option was selected
    const newCorrectAnswers = correctAnswers.map(answer => {
      if (answer === question.options[index].text) {
        return value;
      }
      return answer;
    });
    
    setCorrectAnswers(newCorrectAnswers);
    
    // Update the question
    onChange({
      ...question,
      options: updatedOptions,
      correctAnswer: multipleCorrectAnswers 
        ? newCorrectAnswers.join('|') // Join multiple answers with a delimiter
        : (newCorrectAnswers[0] || '') // Use first answer or empty string
    });
  };

  const handleCorrectAnswerChange = (index: number, isChecked: boolean) => {
    let newCorrectAnswers = [...correctAnswers];
    const optionText = question.options[index].text;
    
    if (multipleCorrectAnswers) {
      // For checkboxes (multiple answers)
      if (isChecked) {
        newCorrectAnswers.push(optionText);
      } else {
        newCorrectAnswers = newCorrectAnswers.filter(a => a !== optionText);
      }
    } else {
      // For radio buttons (single answer)
      newCorrectAnswers = [optionText];
    }
    
    setCorrectAnswers(newCorrectAnswers);
    
    onChange({
      ...question,
      correctAnswer: multipleCorrectAnswers 
        ? newCorrectAnswers.join('|') // Join multiple answers with a delimiter
        : (newCorrectAnswers[0] || '') // Use first answer or empty string
    });
  };

  const toggleMultipleCorrectAnswers = () => {
    const newValue = !multipleCorrectAnswers;
    setMultipleCorrectAnswers(newValue);
    
    // If switching to single answer mode and multiple were selected,
    // keep only the first selected answer
    if (!newValue && correctAnswers.length > 1) {
      const newCorrectAnswers = [correctAnswers[0]];
      setCorrectAnswers(newCorrectAnswers);
      
      onChange({
        ...question,
        correctAnswer: newCorrectAnswers[0] || ''
      });
    } else if (newValue) {
      // If switching to multiple answers, use the delimiter format
      onChange({
        ...question,
        correctAnswer: correctAnswers.join('|')
      });
    }
  };

  const addOption = () => {
    onChange({
      ...question,
      options: [...question.options, { text: "" }]
    });
  };

  const removeOption = (index: number) => {
    // Keep at least 2 options
    if (question.options.length <= 2) return;
    
    const updatedOptions = question.options.filter((_, i) => i !== index);
    
    // Check if we're removing a correct answer
    const removedOptionText = question.options[index].text;
    const newCorrectAnswers = correctAnswers.filter(answer => answer !== removedOptionText);
    
    setCorrectAnswers(newCorrectAnswers);
    
    onChange({
      ...question,
      options: updatedOptions,
      correctAnswer: multipleCorrectAnswers 
        ? newCorrectAnswers.join('|')
        : (newCorrectAnswers[0] || '')
    });
  };

  // Parse the correctAnswer string to get individual answers
  const isCorrectAnswer = (optionText: string) => {
    return correctAnswers.includes(optionText);
  };

  return (
    <div className="p-3">
      <div className="mb-3">
        <p className="instruction-text">
          <strong>Enter your question and multiple answers, then select the correct answer(s).</strong>
        </p>
      </div>
      
      <Form>
        {/* Question text */}
        <Form.Group className="mb-3">
          <Form.Label>Question:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.question}
            onChange={handleQuestionTextChange}
            placeholder="Enter your question"
          />
        </Form.Group>

        <div className="d-flex justify-content-between mb-3">
          <Form.Group className="d-flex align-items-center">
            <Form.Check 
              type="checkbox"
              id="multiple-correct-answers"
              label="Allow multiple correct answers"
              checked={multipleCorrectAnswers}
              onChange={toggleMultipleCorrectAnswers}
              className="me-2"
            />
          </Form.Group>
          
          <Form.Group className="d-flex align-items-center">
            <Form.Label className="me-2">pts:</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="1"
              value={question.points}
              onChange={handlePointsChange}
              style={{ width: "60px" }}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label><strong>Options:</strong></Form.Label>
          <div className="p-3 border rounded mb-2">
            {question.options.map((option, i) => (
              <div key={i} className="d-flex align-items-center mb-2">
                <FormCheck
                  type={multipleCorrectAnswers ? "checkbox" : "radio"}
                  id={`mcq-option-${i}`}
                  name="correctAnswer"
                  className="me-2"
                  checked={isCorrectAnswer(option.text)}
                  onChange={(e) => handleCorrectAnswerChange(i, e.target.checked)}
                />
                <Form.Control
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="me-2"
                />
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => removeOption(i)}
                  disabled={question.options.length <= 2}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="mt-2"
            onClick={addOption}
          >
            + Add Option
          </Button>
        </Form.Group>

        <div className="p-3 border rounded mb-3 bg-light">
          <Form.Label><strong>Correct Answer(s):</strong></Form.Label>
          <div>
            {correctAnswers.length > 0 ? (
              correctAnswers.map((answer, i) => (
                <div key={i} className="badge bg-success me-2 p-2">
                  {answer}
                </div>
              ))
            ) : (
              <div className="text-danger">No correct answer selected</div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-left mt-3">
          <Button variant="outline-secondary" className="me-2" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onSave}
            disabled={correctAnswers.length === 0}
          >
            Update Question
          </Button>
        </div>
      </Form>
    </div>
  );
}




// import React from "react";
// import { Form, Button, InputGroup, Row, Col, Card } from "react-bootstrap";
// import { MultipleChoiceQuestion } from "../QuizQuestionEditor";
// import { FaTrash, FaCheck } from "react-icons/fa";

// interface MultipleChoiceEditorProps {
//   question: MultipleChoiceQuestion;
//   onChange: (question: MultipleChoiceQuestion) => void;
//   onCancel: () => void;
//   onSave: () => void;
// }

// export default function MultipleChoiceEditor({ question, onChange, onCancel, onSave }: MultipleChoiceEditorProps) {
//   const handleTitleChange = (title: string) => {
//     onChange({
//       ...question,
//       text: title
//     });
//   };

//   const handlePointsChange = (points: number) => {
//     onChange({
//       ...question,
//       points: points
//     });
//   };

//   const handleOptionTextChange = (index: number, text: string) => {
//     const updatedOptions = [...question.options];
//     updatedOptions[index] = {
//       ...updatedOptions[index],
//       text
//     };
    
//     onChange({
//       ...question,
//       options: updatedOptions
//     });
//   };

//   const handleCorrectAnswerChange = (index: number) => {
//     const updatedOptions = question.options.map((option, i) => ({
//       ...option,
//       isCorrect: i === index
//     }));
    
//     onChange({
//       ...question,
//       options: updatedOptions
//     });
//   };

//   const handleAddOption = () => {
//     onChange({
//       ...question,
//       options: [
//         ...question.options,
//         { text: "", isCorrect: false }
//       ]
//     });
//   };

//   const handleRemoveOption = (index: number) => {
//     if (question.options.length <= 2) {
//       return; // Minimum 2 options
//     }
    
//     const updatedOptions = [...question.options];
//     updatedOptions.splice(index, 1);
    
//     // If we removed the correct answer, set the first option as correct
//     const hasCorrectAnswer = updatedOptions.some(option => option.isCorrect);
//     if (!hasCorrectAnswer) {
//       updatedOptions[0].isCorrect = true;
//     }
    
//     onChange({
//       ...question,
//       options: updatedOptions
//     });
//   };

//   return (
//     <Card className="border">
//       <Card.Body>
//         <Row className="mb-3 align-items-center">
//           <Col md={6}>
//             <Form.Control 
//               type="text" 
//               placeholder="Easy Question" 
//               value={question.text} 
//               onChange={(e) => handleTitleChange(e.target.value)}
//               className="mb-2 mb-md-0"
//             />
//           </Col>
//           <Col md={3}>
//             <Form.Select defaultValue="MULTIPLE_CHOICE" disabled>
//               <option value="MULTIPLE_CHOICE">Multiple Choice</option>
//             </Form.Select>
//           </Col>
//           <Col md={3} className="d-flex align-items-center justify-content-end">
//             <span className="me-2">pts:</span>
//             <Form.Control 
//               type="number" 
//               min="1" 
//               value={question.points} 
//               onChange={(e) => handlePointsChange(parseInt(e.target.value))}
//               style={{ width: "60px" }}
//             />
//           </Col>
//         </Row>

//         <div className="text-muted mb-2">
//           Enter your question and multiple answers, then select the one correct answer.
//         </div>

//         <div className="mb-3">
//           <h6>Question:</h6>
//           <div className="border p-2 mb-2">
//             <div className="d-flex mb-2 border-bottom pb-2">
//               <Button variant="light" size="sm" className="me-1">Edit</Button>
//               <Button variant="light" size="sm" className="me-1">View</Button>
//               <Button variant="light" size="sm" className="me-1">Insert</Button>
//               <Button variant="light" size="sm" className="me-1">Format</Button>
//               <Button variant="light" size="sm" className="me-1">Tools</Button>
//               <Button variant="light" size="sm" className="me-1">Table</Button>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <Form.Select size="sm" className="me-2" style={{width: "80px"}}>
//                 <option>12pt</option>
//               </Form.Select>
//               <Form.Select size="sm" className="me-2" style={{width: "120px"}}>
//                 <option>Paragraph</option>
//               </Form.Select>
//               <Button variant="light" size="sm" className="me-1">B</Button>
//               <Button variant="light" size="sm" className="me-1">I</Button>
//               <Button variant="light" size="sm" className="me-1">U</Button>
//               <Button variant="light" size="sm" className="me-1">A</Button>
//               <Button variant="light" size="sm" className="me-1">-</Button>
//               <Button variant="light" size="sm" className="me-1">T²</Button>
//               <Button variant="light" size="sm" className="me-1">⋮</Button>
//             </div>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               placeholder="How much is 2 + 2?"
//               className="border-0"
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <h6>Answers:</h6>
//           {question.options.map((option, index) => (
//             <div key={index} className="d-flex align-items-center mb-2">
//               {option.isCorrect ? (
//                 <div className="me-2 text-success" style={{width: "120px"}}>
//                   <FaCheck className="me-1" />
//                   <span>Correct Answer</span>
//                 </div>
//               ) : (
//                 <div className="me-2" style={{width: "120px"}}>
//                   Possible Answer
//                 </div>
//               )}
              
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder={`Answer ${index + 1}`}
//                   value={option.text}
//                   onChange={(e) => handleOptionTextChange(index, e.target.value)}
//                 />
//                 <Button
//                   variant="outline-secondary"
//                   onClick={() => handleCorrectAnswerChange(index)}
//                   className={option.isCorrect ? "bg-success text-white" : ""}
//                 >
//                   <FaCheck />
//                 </Button>
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => handleRemoveOption(index)}
//                   disabled={question.options.length <= 2}
//                 >
//                   <FaTrash />
//                 </Button>
//               </InputGroup>
//             </div>
//           ))}
          
//           <div className="text-center mt-3">
//             <Button 
//               variant="link" 
//               onClick={handleAddOption}
//               className="text-danger"
//             >
//               + Add Another Answer
//             </Button>
//           </div>
//         </div>

//         <div className="d-flex mt-4">
//           <Button 
//             variant="secondary" 
//             onClick={onCancel}
//             className="me-2"
//           >
//             Cancel
//           </Button>
//           <Button 
//             variant="danger" 
//             onClick={onSave}
//           >
//             Update Question
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }