import React from "react";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";

import { useState } from "react";

function CodeSnippetModal(props) {
  const [lang, setLang] = useState("");
  const languages = ["Java", "JavaScript", "C/C++", "Python", "C#", "CSS"];
  const [code, setCode] = useState("");

  return (
    <Modal show={props.codePopUpOpen} onHide={props.toggleCodePopUp} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Send a Code Snippet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group>
                <Form.Label>Language</Form.Label>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={lang === "" ? "Select Language" : lang}
                >
                  <Dropdown.Header>Select Language</Dropdown.Header>
                  {languages.map((language) => {
                    return (
                      <Dropdown.Item
                        onClick={() => setLang(language)}
                        key={language}
                      >
                        {language}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
          </Form.Group>

          <Form.Group>
            <Form.Label>The code snippet</Form.Label>
            <div style={{flex: 1}}>
                <FormControl as="textarea" style={{ height: "40vh" }} value={code} onChange={(e) => setCode(e.target.value)}></FormControl>
            </div>
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggleCodePopUp}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={() => props.sendCode(lang, code)}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CodeSnippetModal;
