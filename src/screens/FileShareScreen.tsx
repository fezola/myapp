import React, { useState } from 'react';
import { Upload, File, Download, MessageCircle } from 'lucide-react';

interface SharedFile {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

const FileShareScreen: React.FC = () => {
  const [files, setFiles] = useState<SharedFile[]>([
    { id: 1, name: 'Project_Proposal.pdf', type: 'PDF', size: '2.5 MB', uploadedBy: 'John Doe', uploadDate: '2023-04-10' },
    { id: 2, name: 'Meeting_Minutes.docx', type: 'Word', size: '1.2 MB', uploadedBy: 'Jane Smith', uploadDate: '2023-04-09' },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile: SharedFile = {
        id: files.length + 1,
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadedBy: 'Current User',
        uploadDate: new Date().toISOString().split('T')[0],
      };
      setFiles([...files, newFile]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">File Sharing</h1>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Shared Files</h2>
          <label className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <Upload size={20} className="inline mr-2" />
            Upload File
          </label>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Size</th>
                <th className="py-2 px-4 text-left">Uploaded By</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.id} className="border-t">
                  <td className="py-2 px-4 flex items-center">
                    <File size={20} className="mr-2 text-gray-500" />
                    {file.name}
                  </td>
                  <td className="py-2 px-4">{file.type}</td>
                  <td className="py-2 px-4">{file.size}</td>
                  <td className="py-2 px-4">{file.uploadedBy}</td>
                  <td className="py-2 px-4">{file.uploadDate}</td>
                  <td className="py-2 px-4">
                    <button className="mr-2 text-blue-600 hover:text-blue-800">
                      <Download size={20} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <MessageCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">File Preview</h2>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-gray-600">Select a file to preview its contents</p>
        </div>
      </div>
    </div>
  );
};

export default FileShareScreen;