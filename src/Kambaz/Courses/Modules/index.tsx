import { useParams } from "react-router";
import { FormControl, ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useState, useEffect } from "react";
import { setModules, addModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import YouTubePickerModal from "../../YouTube/YouTubePickerModal";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);

  const handleVideoAttach = async (video: any) => {
    const module = modules.find((m: any) => m.lessons?.some((l: any) => l._id === selectedLessonId));
    if (!module || !selectedLessonId) return;
    const updatedLessons = module.lessons.map((lesson: any) =>
      lesson._id === selectedLessonId
        ? {
            ...lesson,
            youTubeId: video.id.videoId,
            youTubeTitle: video.snippet.title,
            youTubeThumbnail: video.snippet.thumbnails?.default?.url,
          }
        : { ...lesson } // ensure clean copy
    );
    const updatedModule = {
      ...module,
      lessons: updatedLessons}
    await modulesClient.updateModule(updatedModule);
    dispatch(updateModule(updatedModule));
    setShowYouTubeModal(false);
  };



  const fetchModulesForCourse = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  }

  useEffect(() => {
    fetchModulesForCourse();
  }, [cid]);

  const addModuleHandler = async () => { 
    const newModule = await coursesClient.createModuleForCourse(cid!, { 
      name: moduleName, 
      course: cid, 
    }); 
    dispatch(addModule(newModule)); 
    setModuleName(""); 
  }; 

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <div>
      { currentUser && currentUser.role === "FACULTY" && (
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
        addModule={addModuleHandler}/>)
      }
      <br/> <br/> <br/>
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              { !module.editing ? module.name :
               (<FormControl className="w-50 d-inline-block" onChange={(e) => saveModule({ ...module, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                      }
                    }
                  }
                defaultValue={module.name}/>)
              }
              {currentUser.role === "FACULTY" && (
                <ModuleControlButtons
                  module={module}
                  deleteModule={removeModule}
                  editModule={saveModule}/>
              )}
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <span>{lesson.name}</span>
                    {lesson.youTubeId && (
                      <a
                        className="btn btn-sm btn-primary ms-2"
                        href={`https://www.youtube.com/watch?v=${lesson.youTubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video
                      </a>
                    )}
                    <LessonControlButtons
                       isFaculty={currentUser.role === "FACULTY"}
                      onAttachYouTube={() => {
                        setSelectedLessonId(lesson._id);
                        setShowYouTubeModal(true);
                      }}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <YouTubePickerModal
        show={showYouTubeModal}
        onHide={() => setShowYouTubeModal(false)}
        onVideoSelect={handleVideoAttach}
      />
    </div>
  );
}
  