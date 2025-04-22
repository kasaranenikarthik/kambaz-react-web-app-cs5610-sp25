import React from "react";
import { Form, Button, InputGroup, Card, Badge } from "react-bootstrap";
import { FillInBlankQuestion } from "../QuizQuestionEditor";
import { FaTrash } from "react-icons/fa";

interface FillInBlankEditorProps {
  question: FillInBlankQuestion;
  onChange: (question: FillInBlankQuestion) => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

interface PossibleAnswer {
  text: string;
  isPrimary?: boolean;
}

// Extend the FillInBlankQuestion to handle multiple possible answers
interface ExtendedFillInBlankQuestion extends FillInBlankQuestion {
  [x: string]: string;
  possibleAnswers?: PossibleAnswer[];
}

export default function FillInBlankEditor({ question, onChange, onCancel, onSave, onDelete }: FillInBlankEditorProps) {
  // Set up a local version of the question with possible answers array
  const extendedQuestion = question as ExtendedFillInBlankQuestion;
  if (!extendedQuestion.possibleAnswers) {
    extendedQuestion.possibleAnswers = [{ 
      text: extendedQuestion.correctAnswer || "",
      isPrimary: true
    }];
  }

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...extendedQuestion,
      question: e.target.value
    } as FillInBlankQuestion);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const points = parseInt(e.target.value, 10) || 0;
    onChange({
      ...extendedQuestion,
      points: points
    } as FillInBlankQuestion);
  };

  const handleAnswerChange = (index: number, text: string) => {
    const updatedAnswers = [...extendedQuestion.possibleAnswers!];
    updatedAnswers[index] = { 
      ...updatedAnswers[index],
      text 
    };
    
    // Update the primary answer as the correctAnswer
    const primaryAnswer = updatedAnswers.find(a => a.isPrimary)?.text || updatedAnswers[0].text;
    
    const updatedQuestion = {
      ...extendedQuestion,
      correctAnswer: primaryAnswer,
      possibleAnswers: updatedAnswers
    };
    
    onChange(updatedQuestion as FillInBlankQuestion);
  };

  const handleAddAnswer = () => {
    const updatedQuestion = {
      ...extendedQuestion,
      possibleAnswers: [
        ...extendedQuestion.possibleAnswers!, 
        { text: "", isPrimary: false }
      ]
    };
    
    onChange(updatedQuestion as FillInBlankQuestion);
  };

  const handleRemoveAnswer = (index: number) => {
    if (extendedQuestion.possibleAnswers!.length <= 1) {
      return; // Keep at least one answer
    }
    
    const updatedAnswers = [...extendedQuestion.possibleAnswers!];
    const removedAnswer = updatedAnswers[index];
    updatedAnswers.splice(index, 1);
    
    // If we removed the primary answer, make the first one primary
    let primaryFound = false;
    if (removedAnswer.isPrimary) {
      updatedAnswers[0].isPrimary = true;
      primaryFound = true;
    } else {
      // Check if there's still a primary answer
      primaryFound = updatedAnswers.some(a => a.isPrimary);
      if (!primaryFound) {
        updatedAnswers[0].isPrimary = true;
      }
    }
    
    // Update the primary answer as the correctAnswer
    const primaryAnswer = updatedAnswers.find(a => a.isPrimary)?.text || updatedAnswers[0].text;
    
    const updatedQuestion = {
      ...extendedQuestion,
      correctAnswer: primaryAnswer,
      possibleAnswers: updatedAnswers
    };
    
    onChange(updatedQuestion as FillInBlankQuestion);
  };

  const setPrimaryAnswer = (index: number) => {
    const updatedAnswers = [...extendedQuestion.possibleAnswers!].map((answer, i) => ({
      ...answer,
      isPrimary: i === index
    }));
    
    // Update the primary answer as the correctAnswer
    const primaryAnswer = updatedAnswers[index].text;
    
    const updatedQuestion = {
      ...extendedQuestion,
      correctAnswer: primaryAnswer,
      possibleAnswers: updatedAnswers
    };
    
    onChange(updatedQuestion as FillInBlankQuestion);
  };

  return (
    <div className="p-3">
      <div className="mb-3">
        <p className="instruction-text">
          <strong>Enter your question text, then define all possible correct answers for the blank.
          Students will see the question followed by a small text box to type their answer.</strong>
        </p>
      </div>
      
      <Form>
        {/* Question text */}
        <Form.Group className="mb-3">
          <Form.Label>Question:</Form.Label>
          <FaTrash className="text-danger float-end" onClick={() => onDelete()}/>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.question}
            onChange={handleQuestionTextChange}
            placeholder="How much is 2 + 2 = _____?"
          />
          
        </Form.Group>

        <div className="d-flex justify-content-end mb-3">
          <Form.Group>
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
          <Form.Label><strong>Answers:</strong></Form.Label>
          <div className="p-3 border rounded mb-2">
            <p className="text-muted mb-3">Select a primary answer and add alternative answers that should also be accepted.</p>
            {extendedQuestion.possibleAnswers!.map((answer, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <div className="me-2" style={{width: "150px"}}>
                  {answer.isPrimary ? (
                    <Badge bg="primary" className="p-2">Primary Answer</Badge>
                  ) : (
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => setPrimaryAnswer(index)}
                    >
                      Set as Primary
                    </Button>
                  )}
                </div>
                
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder={`Answer ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className={answer.isPrimary ? "border-primary" : ""}
                  />
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemoveAnswer(index)}
                    disabled={extendedQuestion.possibleAnswers!.length <= 1}
                  >
                    <FaTrash/>
                  </Button>
                </InputGroup>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline-secondary" 
            size="sm"
            className="mt-2"
            onClick={handleAddAnswer}
          >
            + Add Another Answer
          </Button>
        </Form.Group>

        <div className="p-3 border rounded mb-3 bg-light">
          <Form.Label><strong>Correct Answer:</strong></Form.Label>
          <div>
            <div className="badge bg-primary me-2 p-2">
              {extendedQuestion.correctAnswer || "No answer selected"}
            </div>
            {extendedQuestion.possibleAnswers!.filter(a => !a.isPrimary && a.text).length > 0 && (
              <span className="text-muted ms-2">
                (Plus {extendedQuestion.possibleAnswers!.filter(a => !a.isPrimary && a.text).length} alternative answers)
              </span>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-left mt-4">
          <Button variant="outline-secondary" className="me-2" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onSave}
            disabled={!extendedQuestion.correctAnswer}
          >
            Update Question
          </Button>
        </div>
      </Form>
    </div>
  );
}








// import React from "react";
// import { Form, Button, InputGroup, Card } from "react-bootstrap";
// import { FillInBlankQuestion } from "../QuizQuestionEditor";
// import { FaTrash } from "react-icons/fa";

// interface FillInBlankEditorProps {
//   question: FillInBlankQuestion;
//   onChange: (question: FillInBlankQuestion) => void;
//   onCancel: () => void;
//   onSave: () => void;
// }

// interface PossibleAnswer {
//   text: string;
// }

// // Extend the FillInBlankQuestion to handle multiple possible answers
// interface ExtendedFillInBlankQuestion extends FillInBlankQuestion {
//   possibleAnswers?: PossibleAnswer[];
// }

// export default function FillInBlankEditor({ question, onChange, onCancel, onSave }: FillInBlankEditorProps) {
//   // Set up a local version of the question with possible answers array
//   const extendedQuestion = question as ExtendedFillInBlankQuestion;
//   if (!extendedQuestion.possibleAnswers) {
//     extendedQuestion.possibleAnswers = [{ text: extendedQuestion.correctAnswer || "" }];
//   }

//   const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     onChange({
//       ...extendedQuestion,
//       question: e.target.value
//     } as FillInBlankQuestion);
//   };

//   const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const points = parseInt(e.target.value, 10) || 0;
//     onChange({
//       ...extendedQuestion,
//       points: points
//     } as FillInBlankQuestion);
//   };

//   const handleAnswerChange = (index: number, text: string) => {
//     const updatedAnswers = [...extendedQuestion.possibleAnswers!];
//     updatedAnswers[index] = { text };
    
//     // Update the first answer as the primary correct answer
//     const updatedQuestion = {
//       ...extendedQuestion,
//       correctAnswer: updatedAnswers[0].text,
//       possibleAnswers: updatedAnswers
//     };
    
//     onChange(updatedQuestion as FillInBlankQuestion);
//   };

//   const handleAddAnswer = () => {
//     const updatedQuestion = {
//       ...extendedQuestion,
//       possibleAnswers: [...extendedQuestion.possibleAnswers!, { text: "" }]
//     };
    
//     onChange(updatedQuestion as FillInBlankQuestion);
//   };

//   const handleRemoveAnswer = (index: number) => {
//     if (extendedQuestion.possibleAnswers!.length <= 1) {
//       return; // Keep at least one answer
//     }
    
//     const updatedAnswers = [...extendedQuestion.possibleAnswers!];
//     updatedAnswers.splice(index, 1);
    
//     // Update the first answer as the primary correct answer
//     const updatedQuestion = {
//       ...extendedQuestion,
//       correctAnswer: updatedAnswers[0].text,
//       possibleAnswers: updatedAnswers
//     };
    
//     onChange(updatedQuestion as FillInBlankQuestion);
//   };

//   return (
//     <div className="p-3">
//       <div className="mb-3">
//         <p className="instruction-text">
//           <strong>Enter your question text, then define all possible correct answers for the blank.
//           Students will see the question followed by a small text box to type their answer.</strong>
//         </p>
//       </div>
      
//       <Form>
//         {/* Question text */}
//         <Form.Group className="mb-3">
//           <Form.Label>Question:</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={question.question}
//             onChange={handleQuestionTextChange}
//             placeholder="How much is 2 + 2 = _____?"
//           />
//         </Form.Group>

//         <div className="d-flex justify-content-end mb-3">
//           <Form.Group>
//             <Form.Label className="me-2">pts:</Form.Label>
//             <Form.Control
//               type="number"
//               min="0"
//               step="1"
//               value={question.points}
//               onChange={handlePointsChange}
//               style={{ width: "60px" }}
//             />
//           </Form.Group>
//         </div>

//         <Form.Group className="mb-3">
//           <Form.Label><strong>Answers:</strong></Form.Label>
//           {extendedQuestion.possibleAnswers!.map((answer, index) => (
//             <div key={index} className="d-flex align-items-center mb-2">
//               <span className="me-2" style={{width: "120px"}}>
//                 Possible Answer:
//               </span>
              
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder={`Answer ${index + 1}`}
//                   value={answer.text}
//                   onChange={(e) => handleAnswerChange(index, e.target.value)}
//                 />
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => handleRemoveAnswer(index)}
//                   disabled={extendedQuestion.possibleAnswers!.length <= 1}
//                 >
//                   <FaTrash />
//                 </Button>
//               </InputGroup>
//             </div>
//           ))}
          
//           <div className="text-center mt-3">
//             <Button 
//               variant="outline-secondary" 
//               size="sm"
//               onClick={handleAddAnswer}
//             >
//               + Add Another Answer
//             </Button>
//           </div>
//         </Form.Group>

//         <div className="d-flex justify-content-end mt-4">
//           <Button variant="outline-secondary" className="me-2" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={onSave}>
//             Save
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }














// import React from "react";
// import { Form, Button, InputGroup, Row, Col, Card } from "react-bootstrap";
// import { FillInBlankQuestion } from "../QuizQuestionEditor";
// import { FaTrash } from "react-icons/fa";

// interface FillInBlankEditorProps {
//   question: FillInBlankQuestion;
//   onChange: (question: FillInBlankQuestion) => void;
//   onCancel: () => void;
//   onSave: () => void;
// }

// interface PossibleAnswer {
//   text: string;
// }

// // Extend the FillInBlankQuestion to handle multiple possible answers
// interface ExtendedFillInBlankQuestion extends FillInBlankQuestion {
//   possibleAnswers?: PossibleAnswer[];
// }

// export default function FillInBlankEditor({ question, onChange, onCancel, onSave }: FillInBlankEditorProps) {
//   // Set up a local version of the question with possible answers array
//   const extendedQuestion = question as ExtendedFillInBlankQuestion;
//   if (!extendedQuestion.possibleAnswers) {
//     extendedQuestion.possibleAnswers = [{ text: extendedQuestion.correctAnswer || "" }];
//   }

//   const handleTitleChange = (title: string) => {
//     onChange({
//       ...extendedQuestion,
//       text: title
//     } as FillInBlankQuestion);
//   };

//   const handlePointsChange = (points: number) => {
//     onChange({
//       ...extendedQuestion,
//       points: points
//     } as FillInBlankQuestion);
//   };

//   const handleAnswerChange = (index: number, text: string) => {
//     const updatedAnswers = [...extendedQuestion.possibleAnswers!];
//     updatedAnswers[index] = { text };
    
//     // Update the first answer as the primary correct answer
//     const updatedQuestion = {
//       ...extendedQuestion,
//       correctAnswer: updatedAnswers[0].text,
//       possibleAnswers: updatedAnswers
//     };
    
//     onChange(updatedQuestion as FillInBlankQuestion);
//   };

//   const handleAddAnswer = () => {
//     const updatedQuestion = {
//       ...extendedQuestion,
//       possibleAnswers: [...extendedQuestion.possibleAnswers!, { text: "" }]
//     };
    
//     onChange(updatedQuestion as FillInBlankQuestion);
//   };

//   const handleRemoveAnswer = (index: number) => {
//     if (extendedQuestion.possibleAnswers!.length <= 1) {
//       return; // Keep at least one answer
//     }
    
//     const updatedAnswers = [...extendedQuestion.possibleAnswers!];
//     updatedAnswers.splice(index, 1);
    
//     // Update the first answer as the primary correct answer
//     const updatedQuestion = {
//       ...extendedQuestion,
//       correctAnswer: updatedAnswers[0].text,
//       possibleAnswers: updatedAnswers
//     };
    
//     onChange(updatedQuestion as FillInBlankQuestion);
//   };

//   return (
//     <Card className="border">
//       <Card.Body>
//         <Row className="mb-3 align-items-center">
//           <Col md={6}>
//             <Form.Control 
//               type="text" 
//               placeholder="Easy fill the blank" 
//               value={question.text} 
//               onChange={(e) => handleTitleChange(e.target.value)}
//               className="mb-2 mb-md-0"
//             />
//           </Col>
//           <Col md={3}>
//             <Form.Select defaultValue="FILL_IN_BLANK" disabled>
//               <option value="FILL_IN_BLANK">Fill In the Blank</option>
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
//           Enter your question text, then define all possible correct answers for the blank.
//           Students will see the question followed by a small text box to type their answer.
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
//               placeholder="How much is 2 + 2 = _____?"
//               className="border-0"
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <h6>Answers:</h6>
//           {extendedQuestion.possibleAnswers!.map((answer, index) => (
//             <div key={index} className="d-flex align-items-center mb-2">
//               <div className="me-2" style={{width: "120px"}}>
//                 Possible Answer:
//               </div>
              
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder={`Answer ${index + 1}`}
//                   value={answer.text}
//                   onChange={(e) => handleAnswerChange(index, e.target.value)}
//                 />
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => handleRemoveAnswer(index)}
//                   disabled={extendedQuestion.possibleAnswers!.length <= 1}
//                 >
//                   <FaTrash />
//                 </Button>
//               </InputGroup>
//             </div>
//           ))}
          
//           <div className="text-center mt-3">
//             <Button 
//               variant="link" 
//               onClick={handleAddAnswer}
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