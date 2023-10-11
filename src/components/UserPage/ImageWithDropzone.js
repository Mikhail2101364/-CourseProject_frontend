import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, Button } from 'react-bootstrap';
import './custom_style_ImageWithDropzone.css'

const ImageWithDropzone = (props) => {

    const onDrop = (acceptedFiles) => {   
        const selectedFile = acceptedFiles[0];
        props.onFileUpload(selectedFile);
    }


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const handleDelete = (event) => {
        event.stopPropagation();
        props.onFileDelete();
    };

    return (
        <div {...getRootProps()} className="avatar-dropzone">
        <input {...getInputProps()} />
        {props.imageUserAvatar ? (
            <div className="avatar-container">
            <Image src={props.imageUserAvatar} roundedCircle className="avatar-preview" />
            <Button variant="light" onClick={handleDelete} className="avatar-delete-btn">
            Delete
            </Button>
        </div>
        ) : (
            <div className="avatar-placeholder">
            <Image src={props.imageDefaultAvatar} roundedCircle />
            </div>
        )}
        </div>
    );
};

export default ImageWithDropzone;
