export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <br />
        <br />
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" rows={5} cols={50}>
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="1">ASSIGNMENTS</option>
                <option value="2">Quiz</option>
                <option value="3">Project</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="1">Percentage</option>
                <option value="2">Points</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="1">Online</option>
                <option value="2">In Person</option>
                <option value="3">External Tool</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-online-entry-options">Online Entry Options</label><br />
              
              <input type="checkbox" name="text-entry" id="wd-text-entry"/>
              <label htmlFor="wd-text-entry">Text Entry</label><br/>
              
              <input type="checkbox" name="website-url" id="wd-website-url"/>
              <label htmlFor="wd-website-url">Website URL</label><br/>

              <input type="checkbox" name="file-upload" id="wd-file-upload"/>
              <label htmlFor="wd-file-upload">File Upload</label><br/>

              <input type="checkbox" name="media-recordings" id="wd-media-recordings"/>
              <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

              <input type="checkbox" name="student-annotation" id="wd-student-annotation"/>
              <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
              <br />
              <input id="wd-assign-to" value={"Everyone"} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
            </td>
            <td>
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input id="wd-due-date" type="Date" value={"2024-05-13"} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
            </td>
            <td>
              <table>
                <tr>
                  <td>
                    <label htmlFor="wd-available-from">Available From</label>
                  </td>
                  <td>
                    <label htmlFor="wd-available-until">Until</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input id="wd-available-from" type="Date" value={"2024-05-10"} />
                  </td>
                  <td>
                    <input id="wd-available-until" type="Date" value={"2024-05-20"} />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <hr />
        <table align="right">
          <tr>
            <td>
              <button id="wd-cancel">Cancel</button>
            </td>
            <td>
              <button id="wd-save">Save</button>
            </td>
          </tr>
        </table>
      </div>
  );
}