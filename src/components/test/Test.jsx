import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";

const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const checkboxes = [
    { id: "view", label: "مشاهده", value: "device_view" },
    { id: "add", label: "افزودن", value: "device_add" },
    { id: "edit", label: "ویرایش", value: "device_edit" },
    { id: "edit", label: "ویرایش", value: "device_edit" },
    { id: "edit", label: "ویرایش", value: "device_edit" },
    { id: "edit", label: "ویرایش", value: "device_edit" },
    { id: "edit", label: "ویرایش", value: "device_edit" },
    { id: "edit", label: "ویرایش", value: "device_edit" },
  ];

  const handlePlayClick = () => {
    setIsPlaying(true);
    setCurrentIndex(currentIndex);
  };

  useEffect(() => {
    if (isPlaying) {
      const timeoutId = setTimeout(() => {
        if (currentIndex < checkboxes.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, isPlaying]);

  console.log(checkboxes.length, currentIndex);

  const handleCheckboxChange = (index) => {
    setCurrentIndex(index);
  };

  const getCheckBoxData = (index) => {
    if (index >= 0 && index < checkboxes.length) {
      const label = checkboxes[index].label;
      setCurrentIndex(index);
      // console.log(label);
    }
  };

  useEffect(() => {
    getCheckBoxData(currentIndex);
  }, [currentIndex]);

  return (
    <Container>
      {checkboxes.map((checkbox, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          id={checkbox.id}
          label={checkbox.label}
          value={checkbox.value}
          checked={index === currentIndex}
          onChange={() => handleCheckboxChange(index)}
          className="me-3"
        />
      ))}
      <Form.Group>
        <Button
          variant="primary"
          onClick={() => {
            if (currentIndex !== 0) {
              setCurrentIndex((prev) => prev - 1);
            } else {
              setCurrentIndex(checkboxes.length - 1);
            }
          }}
        >
          backward
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handlePlayClick}
          disabled={isPlaying}
        >
          Play
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setIsPlaying(false);
            setCurrentIndex(0);
          }}
        >
          Pause
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (currentIndex <= checkboxes.length - 2) {
              setCurrentIndex((prev) => prev + 1);
            } else {
              setCurrentIndex(0);
            }
          }}
        >
          forward
        </Button>
      </Form.Group>
    </Container>
  );
};

export default Test;
