import React, { useState, useEffect, useRef } from 'react';
import { removeBackground } from "@imgly/background-removal";

const UPLOAD_STATE = {
  IDLE: 'idle',
  SELECTED: 'selected',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error'
};

function UploadSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [resultSrc, setResultSrc] = useState(null);
  const [uploadState, setUploadState] = useState(UPLOAD_STATE.IDLE);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewSrc) URL.revokeObjectURL(previewSrc);
      if (resultSrc) URL.revokeObjectURL(resultSrc);
    };
  }, [previewSrc, resultSrc]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setErrorMsg('');
    setResultSrc(null);

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
          setErrorMsg('Invalid file type. Please select an image (JPG, PNG, GIF, WEBP).');
          resetUpload();
          return;
      }
       const maxSize = 10 * 1024 * 1024;
       if (file.size > maxSize) {
           setErrorMsg('File is too large. Maximum size is 10MB.');
           resetUpload();
           return;
       }
      setSelectedFile(file);
      if (previewSrc) URL.revokeObjectURL(previewSrc);
      const newPreviewSrc = URL.createObjectURL(file);
      setPreviewSrc(newPreviewSrc);
      setUploadState(UPLOAD_STATE.SELECTED);
    } else {
      resetUpload();
    }
  };

  const resetUpload = () => {
      setSelectedFile(null);
      if (previewSrc) URL.revokeObjectURL(previewSrc);
      setPreviewSrc(null);
      if (resultSrc) URL.revokeObjectURL(resultSrc);
      setResultSrc(null);
      setUploadState(UPLOAD_STATE.IDLE);
      setErrorMsg('');
      setIsGenerating(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleRemoveFile = () => {
    resetUpload();
  };

  const handleGenerate = async () => {
    if (!selectedFile || isGenerating) return;
    setIsGenerating(true);
    setUploadState(UPLOAD_STATE.PROCESSING);
    setErrorMsg('');
    setResultSrc(null);
    try {
        console.log("Starting background removal for:", selectedFile.name);
        const blob = await removeBackground(selectedFile); // Add options if needed
        console.log("Background removal successful, blob created:", blob);
        if (resultSrc) URL.revokeObjectURL(resultSrc);
        const newResultSrc = URL.createObjectURL(blob);
        setResultSrc(newResultSrc);
        setUploadState(UPLOAD_STATE.SUCCESS);
    } catch (error) {
        console.error("Background removal failed:", error);
        const message = error?.message || 'Failed to remove background. Please try again.';
        setErrorMsg(`Error: ${message}`);
        setUploadState(UPLOAD_STATE.ERROR);
        setResultSrc(null);
    } finally {
        setIsGenerating(false);
    }
  };

  // --- CHANGE HERE ---
  // Determine CSS classes for the button_outer div
  const buttonOuterClasses = `button_outer ${ // Start with base class
    uploadState === UPLOAD_STATE.PROCESSING ? 'file_uploading' : ''
  } ${
    uploadState === UPLOAD_STATE.SUCCESS ? 'file_uploaded' : ''
  }`;
  // --- END CHANGE ---

  const uploadedViewClasses = `uploaded_file_view ${previewSrc ? 'show' : ''}`;

  return (
    <section id="main">
      <h1>Peel Now !!</h1>
      <div className="drg">
        <main className="main_full">
          <div className="container">
             {/* --- CHANGE HERE: Remove panelClasses --- */}
            <div className="panel"> {/* Panel might still be needed for layout, but no dynamic classes */}
              {/* --- CHANGE HERE: Apply dynamic classes to button_outer --- */}
              <div className={buttonOuterClasses}>
                {/* This btn_upload div will now be correctly hidden by CSS */}
                <div className="btn_upload">
                  <input
                    type="file"
                    id="upload_file"
                    name="upload_file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={isGenerating || uploadState === UPLOAD_STATE.PROCESSING}
                    ref={fileInputRef}
                  />
                  Upload Image
                </div>
                 {/* This processing_bar will now be correctly targeted by CSS */}
                <div className="processing_bar"></div>
                 {/* This success_box will now be correctly targeted by CSS */}
                <div className="success_box"></div>
              </div>
               {/* --- END CHANGES --- */}
            </div>

            {errorMsg && <div className="error_msg">{errorMsg}</div>}

            {previewSrc && (
              <div className={uploadedViewClasses} id="uploaded_view">
                <span className="file_remove" onClick={handleRemoveFile}>X</span>
                <img
                    src={previewSrc}
                    alt="Uploaded preview"
                    style={{ maxWidth: '100%', display: 'block' }}
                />
                {resultSrc && uploadState === UPLOAD_STATE.SUCCESS && (
                    <div className="result-image-container">
                        <img
                            src={resultSrc}
                            className="uploaded-image"
                            alt="Background removed result"
                        />
                        <a
                            href={resultSrc}
                            download={selectedFile?.name ? `peeled_${selectedFile.name.split('.')[0]}.png` : 'peeled_image.png'}
                            className="download-btn"
                        >
                            Download Peeled Image
                        </a>
                    </div>
                 )}
              </div>
            )}

            {uploadState === UPLOAD_STATE.SELECTED && (
                 <div className="peel" style={{ textAlign: 'center', marginTop: '20px' }}>
                     <button
                         className="lok"
                         onClick={handleGenerate}
                         disabled={isGenerating}
                     >
                         {isGenerating ? 'Peeling...' : 'Generate'}
                     </button>
                 </div>
             )}

          </div>
        </main>
      </div>
    </section>
  );
}

export default React.memo(UploadSection);