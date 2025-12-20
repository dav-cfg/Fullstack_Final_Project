// src/components/EditNavbar.jsx
import React from "react";
import {
  FaShapes,
  FaCircle,
  FaDrawPolygon,
  FaSlash,
  FaFont,
  FaEraser,
  FaUndo,
  FaRedo,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaUpload,
  FaPaintBrush,
  FaImage,
  FaFilePdf,
  FaSave,
} from "react-icons/fa";

export default function EditNavbar({
  onRect,
  onCircle,
  onEllipse,
  onLine,
  onTriangle,
  onText,
  onClear,
  onUndo,
  onRedo,
  onColorChange,
  onPaintToggle,
  isPainting,
  onExportPNG,
  onExportPDF,
  onDelete,
  onBringForward,
  onSendBackward,
  onSaveDesign,
  onUploadImageClick,
}) {
  return (
    <div className="bg-gradient-to-r from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] text-gray-100 shadow-xl border-b border-purple-900/30 w-full">
      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
        {/* Shapes Group */}
        <div className="flex items-center gap-1 md:gap-2 pr-2 md:pr-3 border-r border-gray-700">
          <span className="hidden md:block text-xs text-gray-400 font-medium">SHAPES</span>
          <button
            onClick={onRect}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Rectangle"
          >
            <FaShapes className="text-purple-400 group-hover:text-purple-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-purple-300">Rect</span>
          </button>
          <button
            onClick={onCircle}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Circle"
          >
            <FaCircle className="text-pink-400 group-hover:text-pink-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-pink-300">Circle</span>
          </button>
          <button
            onClick={onEllipse}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Ellipse"
          >
            <span className="text-base md:text-lg text-blue-400 group-hover:text-blue-300">◯</span>
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-blue-300">Ellipse</span>
          </button>
          <button
            onClick={onLine}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Line"
          >
            <FaSlash className="text-purple-400 group-hover:text-purple-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-purple-300">Line</span>
          </button>
          <button
            onClick={onTriangle}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Triangle"
          >
            <FaDrawPolygon className="text-pink-400 group-hover:text-pink-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-pink-300">Triangle</span>
          </button>
        </div>

        {/* Tools Group */}
        <div className="flex items-center gap-1 md:gap-2 pr-2 md:pr-3 border-r border-gray-700">
          <span className="hidden md:block text-xs text-gray-400 font-medium">TOOLS</span>
          <button
            onClick={onText}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-blue-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Text"
          >
            <FaFont className="text-blue-400 group-hover:text-blue-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-blue-300">Text</span>
          </button>
          <div className="flex flex-col items-center px-1 md:px-2">
            <input
              type="color"
              onChange={(e) => onColorChange(e.target.value)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg cursor-pointer border-2 border-gray-700 hover:border-purple-500 transition-colors"
              title="Pick Color"
            />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400">Color</span>
          </div>
          <button
            onClick={onPaintToggle}
            className={`group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isPainting ? 'bg-purple-600/30 border border-purple-500' : 'hover:bg-purple-600/20'
            }`}
            title="Brush"
          >
            <FaPaintBrush className={`${isPainting ? 'text-purple-300' : 'text-purple-400 group-hover:text-purple-300'} text-sm md:text-base`} />
            <span className={`hidden md:block text-[10px] mt-1 ${isPainting ? 'text-purple-300' : 'text-gray-400 group-hover:text-purple-300'}`}>Brush</span>
          </button>
          <button
            onClick={onUploadImageClick}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-pink-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Upload Image"
          >
            <FaUpload className="text-pink-400 group-hover:text-pink-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-pink-300">Upload</span>
          </button>
        </div>

        {/* Edit Group */}
        <div className="flex items-center gap-1 md:gap-2 pr-2 md:pr-3 border-r border-gray-700">
          <span className="hidden lg:block text-xs text-gray-400 font-medium">EDIT</span>
          <button
            onClick={onUndo}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Undo"
          >
            <FaUndo className="text-purple-400 group-hover:text-purple-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-purple-300">Undo</span>
          </button>
          <button
            onClick={onRedo}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-purple-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Redo"
          >
            <FaRedo className="text-purple-400 group-hover:text-purple-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-purple-300">Redo</span>
          </button>
          <button
            onClick={onDelete}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-red-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Delete"
          >
            <FaTrash className="text-red-400 group-hover:text-red-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-red-300">Delete</span>
          </button>
          <button
            onClick={onClear}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-red-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Clear Canvas"
          >
            <FaEraser className="text-red-400 group-hover:text-red-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-red-300">Clear</span>
          </button>
        </div>

        {/* Layers Group - Hidden on small screens */}
        <div className="hidden lg:flex items-center gap-1 md:gap-2 pr-2 md:pr-3 border-r border-gray-700">
          <span className="text-xs text-gray-400 font-medium">LAYERS</span>
          <button
            onClick={onBringForward}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-blue-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Bring Forward"
          >
            <FaArrowUp className="text-blue-400 group-hover:text-blue-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-blue-300">Forward</span>
          </button>
          <button
            onClick={onSendBackward}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-blue-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Send Backward"
          >
            <FaArrowDown className="text-blue-400 group-hover:text-blue-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-blue-300">Backward</span>
          </button>
        </div>

        {/* Export Group */}
        <div className="flex items-center gap-1 md:gap-2">
          <span className="hidden lg:block text-xs text-gray-400 font-medium">EXPORT</span>
          <button
            onClick={onExportPNG}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-green-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Export PNG"
          >
            <FaImage className="text-green-400 group-hover:text-green-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-green-300">PNG</span>
          </button>
          <button
            onClick={onExportPDF}
            className="group flex flex-col items-center px-2 md:px-3 py-1 md:py-2 hover:bg-green-600/20 rounded-lg transition-all duration-200 hover:scale-105"
            title="Export PDF"
          >
            <FaFilePdf className="text-green-400 group-hover:text-green-300 text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-gray-400 group-hover:text-green-300">PDF</span>
          </button>
          <button
            onClick={onSaveDesign}
            className="group flex flex-col items-center px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg ml-1 md:ml-2"
            title="Save Design"
          >
            <FaSave className="text-white text-sm md:text-base" />
            <span className="hidden md:block text-[10px] mt-1 text-white font-medium">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
