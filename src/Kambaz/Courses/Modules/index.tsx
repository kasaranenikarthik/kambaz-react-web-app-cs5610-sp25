export default function Modules() {
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <button> Collapse All </button>
        <button> View Progress </button>
        <select id="wd-select-one" title="wd-select-one">
          <option selected value="PublishAll">Publish All</option>
        </select>
        <button> + Module </button>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item"> Full Stack Developer - Chapter 1 - Introduction </li>
                  <li className="wd-content-item"> Full Stack Developer - Chapter 2 - Creating UI </li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item"> Introduction to Web Development </li>
                  <li className="wd-content-item"> Creating an HTTP server with Node.js </li>
                  <li className="wd-content-item"> Creating a React Application </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 3</div>
          </li>
        </ul>
      </div>
  );
}
  