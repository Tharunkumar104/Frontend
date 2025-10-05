import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notes.css';

function Notes() {
    const [activeTab, setActiveTab] = useState('browse');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Upload form states
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (activeTab === 'browse') {
            fetchNotes();
        }
    }, [activeTab]);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
            alert('Failed to load notes');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !title) {
            alert('Please select a file and enter a title');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        try {
            setUploading(true);
            await axios.post('http://localhost:5000/api/notes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
            });

            alert('Notes uploaded successfully!');
            setFile(null);
            setTitle('');
            setDescription('');
            setUploadProgress(0);
            document.getElementById('fileInput').value = '';

            // Switch to browse tab and refresh
            setActiveTab('browse');
            fetchNotes();
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const downloadFile = async (noteId, fileName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/notes/download/${noteId}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Download error:', error);
            alert('Download failed');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="notes-container">
            <div className="notes-header">
                <h1>📚 Study Notes Hub</h1>
                <p>Upload and share study materials with your peers</p>
            </div>

            <div className="notes-tabs">
                <button
                    className={`tab-btn ${activeTab === 'browse' ? 'active' : ''}`}
                    onClick={() => setActiveTab('browse')}
                >
                    📖 Browse Notes
                </button>
                <button
                    className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                >
                    📤 Upload Notes
                </button>
            </div>

            <div className="notes-content">
                {activeTab === 'browse' ? (
                    <div className="notes-browse">
                        {loading ? (
                            <div className="loading">🔄 Loading notes...</div>
                        ) : notes.length === 0 ? (
                            <div className="no-notes">
                                <h3>📝 No notes uploaded yet</h3>
                                <p>Be the first to share your study materials!</p>
                            </div>
                        ) : (
                            <div className="notes-grid">
                                {notes.map((note) => (
                                    <div key={note._id} className="note-card">
                                        <div className="note-icon">
                                            {note.fileType === '.pdf' ? '📄' :
                                                note.fileType === '.doc' || note.fileType === '.docx' ? '📝' :
                                                    note.fileType === '.ppt' || note.fileType === '.pptx' ? '📊' :
                                                        note.fileType === '.jpg' || note.fileType === '.png' ? '🖼️' : '📋'}
                                        </div>
                                        <h3>{note.title}</h3>
                                        <p className="note-description">{note.description || 'No description provided'}</p>
                                        <div className="note-meta">
                                            <span className="file-type">{note.fileType.toUpperCase()}</span>
                                            <span className="file-size">{formatFileSize(note.fileSize)}</span>
                                        </div>
                                        <div className="upload-date">
                                            📅 {new Date(note.uploadDate).toLocaleDateString()}
                                        </div>
                                        <button
                                            onClick={() => downloadFile(note._id, note.originalName)}
                                            className="download-btn"
                                        >
                                            ⬇️ Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="notes-upload">
                        <form onSubmit={handleUpload} className="upload-form">
                            <div className="form-group">
                                <label>📋 Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter note title (e.g., Physics Chapter 1)"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>📝 Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description of the notes content"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label>📎 Choose File *</label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.png,.jpeg"
                                    required
                                />
                                <small>Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, JPG, PNG (Max: 10MB)</small>
                            </div>

                            {uploading && (
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">Uploading... {uploadProgress}%</span>
                                </div>
                            )}

                            <button type="submit" disabled={uploading} className="upload-btn">
                                {uploading ? '🔄 Uploading...' : '📤 Upload Notes'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notes;
