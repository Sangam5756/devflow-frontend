"use client";

import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface AskQuestionProps {
  onSubmit?: (data: { title: string; description: string; tags: string[] }) => void;
  onCancel?: () => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');

  const maxTags = 5;
  const maxTitleLength = 150;
  const maxDescriptionLength = 5000;

  const addTag = (tagText: string) => {
    if (tags.length >= maxTags) {
      alert(`Maximum ${maxTags} tags allowed`);
      return;
    }

    const trimmedTag = tagText.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = {
      title,
      description,
      tags
    };

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
      alert('Question posted successfully!');
    }
  };

  const handleCancel = () => {
    if (title || description || tags.length > 0) {
      if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
        setTitle('');
        setDescription('');
        setTags([]);
        setTagInput('');
        if (onCancel) {
          onCancel();
        }
      }
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-1 mb-1 p-5 bg-[#0d1117] text-[#c9d1d9] min-h-screen font-sans leading-relaxed">
      <div className="mb-8">
        <h1 className="text-3xl text-[#f0f6fc] font-semibold mb-2">Ask a Question</h1>
        <p className="text-[#8b949e] text-lg">Get help from the community by asking a detailed question</p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-6"
      >
        <h2 className="text-2xl text-[#f0f6fc] font-semibold mb-5">Question Details</h2>
        
        {/* Title Input */}
        <div className="mb-5">
          <label htmlFor="title" className="block text-[#f0f6fc] font-medium mb-2 text-sm">
            Title <span className="text-[#ff7b72]">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="What's your programming question? Be specific."
            maxLength={maxTitleLength}
            required
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-[#c9d1d9] text-sm transition-colors duration-200 focus:outline-none focus:border-[#388bfd] focus:shadow-[0_0_0_3px_rgba(56,139,253,0.1)] placeholder-[#6e7681]"
          />
          <div className="text-[#6e7681] text-xs mt-1">
            {title.length}/{maxTitleLength} characters
          </div>
        </div>

        {/* Description Textarea */}
        <div className="mb-5">
          <label htmlFor="description" className="block text-[#f0f6fc] font-medium mb-2 text-sm">
            Problem Description <span className="text-[#ff7b72]">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Describe your problem in detail. Include any code, error messages, and what you've already tried."
            maxLength={maxDescriptionLength}
            required
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-[#c9d1d9] text-sm transition-colors duration-200 focus:outline-none focus:border-[#388bfd] focus:shadow-[0_0_0_3px_rgba(56,139,253,0.1)] placeholder-[#6e7681] min-h-[120px] resize-y font-sans"
          />
          <div className="text-[#6e7681] text-xs mt-1">
            {description.length}/{maxDescriptionLength} characters
          </div>
        </div>

        {/* Tags Input */}
        <div className="mb-5">
          <label htmlFor="tags" className="block text-[#f0f6fc] font-medium mb-2 text-sm">
            Tags
          </label>
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add a tag (e.g., React, JavaScript, TypeScript)"
                className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-[#c9d1d9] text-sm transition-colors duration-200 focus:outline-none focus:border-[#388bfd] focus:shadow-[0_0_0_3px_rgba(56,139,253,0.1)] placeholder-[#6e7681]"
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="bg-[#238636] hover:bg-[#2ea043] text-white w-8 h-8 rounded-md cursor-pointer text-lg flex items-center justify-center transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[#6e7681] text-xs mb-3">
              Add up to {maxTags} tags to help others find your question
            </div>
            
            {/* Tags List */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#388bfd] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="bg-transparent border-none text-white cursor-pointer text-sm leading-none hover:bg-[rgba(255,255,255,0.1)] rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border-none"
          >
            Post Question
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-transparent hover:bg-[#21262d] text-[#c9d1d9] px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border border-[#30363d]"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Tips Section */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
        <h2 className="text-2xl text-[#f0f6fc] font-semibold mb-5">Tips for Great Questions</h2>
        <ul className="list-none">
          {[
            'Be specific and clear in your title',
            'Include relevant code snippets and error messages',
            'Explain what you\'ve already tried',
            'Use appropriate tags to help others find your question',
            'Check for similar questions before posting'
          ].map((tip, index) => (
            <li key={index} className="text-[#8b949e] mb-2 pl-5 relative">
              <span className="absolute left-0 text-[#388bfd] font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .max-w-4xl {
            padding: 0 10px;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .bg-\\[\\#161b22\\] {
            padding: 16px;
          }
          
          .flex.gap-3 {
            flex-direction: column;
          }
          
          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AskQuestion;