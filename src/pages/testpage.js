// src/pages/test.js
import React from "react";
import Post from "../components/PostWithComments";

const TestPage = () => {
    return (
        <div style={{ padding: "20px" }}>
            <Post title="Test Post" content="This is a test post." />
        </div>
    );
};

export default TestPage;
