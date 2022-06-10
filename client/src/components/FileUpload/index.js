import React, { useState, useRef, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';

const StudentFileUpload = (props) => {
  const [file, setFile] = useState(null); // state in which the real picture is stored
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [data, setData] = useState({
    // groupName: '',
    submissionTypes: [],
  });

  const [submissionName, SetsubmissionName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); 



  useEffect(() => {
    axios.get('http://localhost:8082/api/fileupload/') //backend path
      .then(response => {
        if (response.data.length > 0) {

          //console.log("llllllllllllllllllll");
          setData({

            
            submissionTypes: response.data.map(submission => submission.submissionName)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const subName   = submissionName;
      const groupName = sessionStorage.getItem("group");
      const sub = subName.submissionName;
     

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('groupName', groupName);
        formData.append('submissionName', sub);

        setErrorMsg('');
        await axios.post('http://localhost:8082/api/fileupload/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        props.history.push('/student-home');
      } else {
        setErrorMsg('Please select a file to add.');
      }

    //console.log("Hello world");
      
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const onChangeSubmissionName = (e) => {
    SetsubmissionName({
      submissionName: e.target.value
    })
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  return (
    
    <React.Fragment>
      <hr />
      <h3>Presentation Template Upload Portal</h3>
      <hr />
      <br />
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="groupName">
              <Form.Label> Group Name </Form.Label>
              <Form.Control
                type="text"
                name="groupName"
                required
                readOnly
                value={sessionStorage.getItem("group") || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Group controlId="Submission Type">
              <Form.Label> Submission Type</Form.Label>
              <Form.Select aria-label='Default select example'
                required
                className="form-control"
                value={data.submissionName}
                onChange={onChangeSubmissionName}
              
              >
                {
                  data.submissionTypes.map(function (submission) {
                    return <option
                      key={submission}
                      value={submission}>{submission}
                    </option>;
                  })
                }
                
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="groupName">
              <Form.Label> Description </Form.Label>
              <Form.Control
                type="text"
                name="a"
                required
                readOnly
                
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="groupName">
              <Form.Label> Deadline </Form.Label>
              <Form.Control
                type="text"
                name="a"
                required
                readOnly
                
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}

          >

            {({ getRootProps, getInputProps }) => (
              <div style={{ backgroundColor: "skyBlue", width: '40%' }}{...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} style={{ height: "100px", backgroundColor: "skyBlue" }} />
                <p>Drag and drop a file OR<button style={{ color: "red", border: "none", backgroundColor: 'transparent' }}>click here</button>to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" style={{ width: "200px", height: "200px;" }} src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <br />
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default StudentFileUpload;