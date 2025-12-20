// // Canvas/Editor.jsx
// import React, { useState, useRef, useEffect } from "react";
// import {
//   Stage,
//   Layer,
//   Rect,
//   Circle,
//   Ellipse,
//   Line,
//   Text,
//   Image as KImage,
//   Transformer,
// } from "react-konva";
// import useImage from "use-image";
// import jsPDF from "jspdf";
// import { useSelector, useDispatch } from "react-redux";
// import EditNavbar from "./EditNavbar";
// import {
//   addShape,
//   updateShape,
//   clearShapes,
//   undo,
//   redo,
//   removeShape,
//   replaceAll,
// } from "../store/shapesSlice";
// import { fetchDesigns } from "../store/designSlice";
// import axiosInstance from "../utils/axiosinstance";
// import html2canvas from "html2canvas"; // install: npm i html2canvas



// // Make a safe string ID every time
// const uid = () =>
//   `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

// // Ensure we always have a real React ref per shape id
// const ensureRef = (store, id) => {
//   const key = String(id);
//   if (!store.current[key]) store.current[key] = React.createRef();
//   return store.current[key];
// };

// // Make sure any loaded/saved shape has a string id
// const coerceId = (shape) => ({
//   ...shape,
//   id: String(shape.id ?? shape._id ?? uid()),
// });

// // --------------- image node ---------------
// function KonvaImage({ shape, onSelect, onChange, nodeRef }) {
//   const [img] = useImage(shape.src);

//   return (
//     <KImage
//       image={img}
//       id={String(shape.id)}
//       x={shape.x}
//       y={shape.y}
//       width={shape.width}
//       height={shape.height}
//       draggable
//       ref={nodeRef}
//       onClick={onSelect}
//       onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
//       onTransformEnd={() => {
//         const node = nodeRef.current;
//         if (!node) return;
//         const sx = node.scaleX();
//         const sy = node.scaleY();
//         node.scaleX(1);
//         node.scaleY(1);
//         onChange({
//           x: node.x(),
//           y: node.y(),
//           width: Math.max(5, node.width() * sx),
//           height: Math.max(5, node.height() * sy),
//         });
//       }}
//     />
//   );
// }

// export default function Editor() {
//   const { shapes } = useSelector((state) => state.shapes);
//   const selectedDesign = useSelector((state) => state.designs.selected);
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const stageRef = useRef();
//   const transformerRef = useRef();
//   const nodeRefs = useRef({}); // id -> React.createRef()

//   const [currentColor, setCurrentColor] = useState("#000000");
//   const [isPainting, setIsPainting] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [editingTextId, setEditingTextId] = useState(null);

//   const [fontFamily, setFontFamily] = useState("Arial");
//   const [fontSize, setFontSize] = useState(24);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Load shapes for the chosen design (coerce ids to strings)
//   useEffect(() => {
//     if (selectedDesign) {
//       const safe = (selectedDesign.Shapes || []).map(coerceId);
//       dispatch(replaceAll(safe));
//       setSelectedId(null);
//       transformerRef.current?.nodes([]);
//     }
//   }, [selectedDesign, dispatch]);

//   const shapeFactories = {
//     rect: (pos) => ({
//       type: "rect",
//       x: pos?.x ?? Math.random() * 200,
//       y: pos?.y ?? Math.random() * 200,
//       width: 120,
//       height: 80,
//       fill: "transparent",
//       stroke: currentColor,
//       strokeWidth: 2,
//       id: uid(),
//     }),
//     circle: (pos) => ({
//       type: "circle",
//       x: pos?.x ?? Math.random() * 200,
//       y: pos?.y ?? Math.random() * 200,
//       radius: 50,
//       fill: "transparent",
//       stroke: currentColor,
//       strokeWidth: 2,
//       id: uid(),
//     }),
//     ellipse: (pos) => ({
//       type: "ellipse",
//       x: pos?.x ?? Math.random() * 200,
//       y: pos?.y ?? Math.random() * 200,
//       radiusX: 70,
//       radiusY: 40,
//       fill: "transparent",
//       stroke: currentColor,
//       strokeWidth: 2,
//       id: uid(),
//     }),
//     line: (pos) => ({
//       type: "line",
//       points: pos
//         ? [pos.x - 20, pos.y - 20, pos.x + 20, pos.y + 20]
//         : [20, 20, 200, 200],
//       stroke: currentColor,
//       strokeWidth: 3,
//       tension: 0.2,
//       lineCap: "round",
//       id: uid(),
//     }),
//     triangle: (pos) => ({
//       type: "triangle",
//       points: pos
//         ? [pos.x, pos.y, pos.x + 100, pos.y, pos.x + 50, pos.y - 80]
//         : [50, 150, 150, 150, 100, 50],
//       fill: "transparent",
//       stroke: currentColor,
//       strokeWidth: 2,
//       id: uid(),
//     }),
//     text: (pos, value) => ({
//       type: "text",
//       x: pos?.x ?? 150,
//       y: pos?.y ?? 150,
//       text: value ?? "New Text",
//       fontSize,
//       fontFamily,
//       fontStyle: `${isItalic ? "italic" : ""} ${isBold ? "bold" : ""}`.trim(),
//       fill: currentColor,
//       draggable: true,
//       id: uid(),
//     }),
//   };

//   const addShapeAt = (factory, pos) => {
//     const s = factory(pos);
//     // Ensure id is a string (uid already is)
//     dispatch(addShape({ ...s, id: String(s.id) }));
//   };

//   const handleAddRect = () => addShapeAt(shapeFactories.rect);
//   const handleAddCircle = () => addShapeAt(shapeFactories.circle);
//   const handleAddEllipse = () => addShapeAt(shapeFactories.ellipse);
//   const handleAddLine = () => addShapeAt(shapeFactories.line);
//   const handleAddTriangle = () => addShapeAt(shapeFactories.triangle);
//   const handleAddText = () => {
//     console.log("🔵 Text button clicked");
//     const textId = uid();
//     const textShape = {
//       type: "text",
//       x: 150,
//       y: 150,
//       text: "Double-click to edit",
//       fontSize,
//       fontFamily,
//       fontStyle: `${isItalic ? "italic" : ""} ${isBold ? "bold" : ""}`.trim(),
//       fill: currentColor,
//       draggable: true,
//       id: textId,
//     };
//     console.log("🔵 Dispatching text shape:", textShape);
//     dispatch(addShape(textShape));
//     // Auto-select and start editing
//     setTimeout(() => {
//       setSelectedId(textId);
//       setEditingTextId(textId);
//     }, 50);
//   };

//   const isDrawing = useRef(false);

//   const handleStageMouseDown = (e) => {
//     if (isPainting) {
//       isDrawing.current = true;
//       const pos = stageRef.current.getPointerPosition();
//       dispatch(
//         addShape({
//           type: "line",
//           points: [pos.x, pos.y],
//           stroke: currentColor,
//           strokeWidth: 3,
//           tension: 0.2,
//           id: uid(), // string
//         })
//       );
//       return;
//     }

//     const clickedOnEmpty = e.target === e.target.getStage();
//     if (clickedOnEmpty) {
//       setSelectedId(null);
//       transformerRef.current?.nodes([]);
//       return;
//     }

//     const shapeId = e.target?.attrs?.id || e.target?.id?.();
//     if (shapeId) {
//       setSelectedId(String(shapeId));
//       const node = nodeRefs.current[String(shapeId)]?.current;
//       if (transformerRef.current && node) {
//         transformerRef.current.nodes([node]);
//         transformerRef.current.getLayer().batchDraw();
//       }
//     }
//   };

//   const handleStageMouseMove = () => {
//     if (!isDrawing.current || !isPainting) return;
//     const pos = stageRef.current.getPointerPosition();
//     const last = shapes[shapes.length - 1];
//     if (!last || last.type !== "line") return;
//     dispatch(
//       updateShape({
//         id: String(last.id),
//         newAttrs: { points: last.points.concat([pos.x, pos.y]) },
//       })
//     );
//   };

//   const handleStageMouseUp = () => {
//     isDrawing.current = false;
//   };

//   const selectShape = (id) => {
//     const sid = String(id);
//     setSelectedId(sid);
//     const node = nodeRefs.current[sid]?.current;
//     if (node && transformerRef.current) {
//       transformerRef.current.nodes([node]);
//       transformerRef.current.getLayer().batchDraw();
//     }
//   };

//   const handleDragEnd = (id, node) => {
//     if (!node) return;
//     const className = node.getClassName();
//     const base = { x: node.x(), y: node.y() };
//     if (className === "Text") {
//       base.width = node.width();
//       base.height = node.height();
//     }
//     dispatch(updateShape({ id: String(id), newAttrs: base }));
//   };

//   const handleTransformEnd = (id, node) => {
//     if (!node) return;
//     const className = node.getClassName();
//     const newAttrs = { x: node.x(), y: node.y(), rotation: node.rotation() };
//     const scaleX = node.scaleX();
//     const scaleY = node.scaleY();

//     if (["Rect", "Text", "Image"].includes(className)) {
//       newAttrs.width = Math.max(5, node.width() * scaleX);
//       newAttrs.height = Math.max(5, node.height() * scaleY);
//     }
//     if (className === "Circle") {
//       newAttrs.radius = Math.max(1, node.radius() * scaleX);
//     }
//     if (className === "Ellipse") {
//       newAttrs.radiusX = Math.max(1, node.radiusX() * scaleX);
//       newAttrs.radiusY = Math.max(1, node.radiusY() * scaleY);
//     }

//     node.scaleX(1);
//     node.scaleY(1);
//     dispatch(updateShape({ id: String(id), newAttrs }));
//   };

//   const handleDelete = () => {
//     if (!selectedId) return;
//     dispatch(removeShape(String(selectedId)));
//     setSelectedId(null);
//     transformerRef.current?.nodes([]);
//   };

//   const bringForward = () => {
//     if (!selectedId) return;
//     const idx = shapes.findIndex((s) => String(s.id) === String(selectedId));
//     if (idx < shapes.length - 1 && idx >= 0) {
//       const newArr = [...shapes];
//       [newArr[idx + 1], newArr[idx]] = [newArr[idx], newArr[idx + 1]];
//       dispatch(replaceAll(newArr));
//     }
//   };

//   const sendBackward = () => {
//     if (!selectedId) return;
//     const idx = shapes.findIndex((s) => String(s.id) === String(selectedId));
//     if (idx > 0) {
//       const newArr = [...shapes];
//       [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
//       dispatch(replaceAll(newArr));
//     }
//   };

//   const hiddenFileRef = useRef();
//   const handleUploadImageClick = () => hiddenFileRef.current?.click();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       const imgData = reader.result;
//       dispatch(
//         addShape({
//           type: "image",
//           src: imgData,
//           x: 100,
//           y: 100,
//           width: 300,
//           height: 200,
//           id: uid(), // string
//         })
//       );
//     };
//     reader.readAsDataURL(file);
//     e.target.value = "";
//   };

//   const exportPNG = () => {
//     const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
//     const link = document.createElement("a");
//     link.download = "Novy Grafyniq_design.png";
//     link.href = uri;
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   };

//   const exportPDF = () => {
//     const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [stageRef.current.width(), stageRef.current.height()],
//     });
//     pdf.addImage(
//       uri,
//       "PNG",
//       0,
//       0,
//       stageRef.current.width(),
//       stageRef.current.height()
//     );
//     pdf.save("Novy Grafyniq_design.pdf");
//   };
//   const saveDesign = async () => {
//     console.log("💾 Save Design clicked");
    
//     // Check if user is logged in (token exists)
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//       console.error("💾 No token found - user not logged in");
//       if (window.confirm("You must be logged in to save designs. Go to login page?")) {
//         window.location.href = "/login";
//       }
//       return;
//     }
    
//     // Get user from Redux state or sessionStorage
//     let storedUser = user;
//     if (!storedUser || !storedUser._id) {
//       try {
//         const sessionUser = sessionStorage.getItem("user");
//         storedUser = sessionUser ? JSON.parse(sessionUser) : null;
//       } catch (e) {
//         console.error("Failed to parse user from sessionStorage:", e);
//         storedUser = null;
//       }
//     }

//     const userId = storedUser?._id || "";
//     const username = storedUser?.username || "";

//     console.log("💾 User data:", { userId, username, fullUser: storedUser });

//     if (!userId || !username) {
//       console.error("💾 Missing user info:", { userId, username, storedUser });
//       if (window.confirm("User session expired. Please login again. Go to login page?")) {
//         window.location.href = "/login";
//       }
//       return;
//     }

//     if (!Array.isArray(shapes) || shapes.length === 0) {
//       console.error("💾 No shapes to save:", shapes);
//       alert("Please create something on canvas before saving.");
//       return;
//     }

//     let name = prompt("Enter a name for your design:", "Untitled Design");
//     if (name === null) {
//       console.log("💾 User cancelled name prompt");
//       return;
//     }
//     name = name.trim() || "Untitled Design";

//     console.log("💾 Shapes to save:", shapes.length);
//     const shapesToSave = shapes.map(coerceId);

//     let imageData = "";
//     try {
//       if (stageRef.current) {
//         imageData = stageRef.current.toDataURL({
//           mimeType: "image/png",
//           pixelRatio: 2,
//         });
//       }
//     } catch (e) {
//       console.warn("Konva export failed:", e?.message);
//     }

//     // 🔍 Debug logs
//     console.log("🟢 Frontend saveDesign called");
//     console.log("User:", { userId, username });
//     console.log("Shapes count:", shapesToSave.length);
//     console.log("ImageData length:", imageData?.length);
//     console.log("Token:", sessionStorage.getItem("token") ? "Present" : "Missing");

//     const payload = { Shapes: shapesToSave, name, username, imageData };
//     console.log("Payload sent to backend:", JSON.stringify(payload).substring(0, 200));

//     try {
//       const res = await axiosInstance.post("/api/designs", payload);
//       console.log("✅ Backend response:", res.data);

//       if (res?.data) {
//         dispatch(fetchDesigns(userId));
//         alert("Design saved successfully!");
//       }
//     } catch (error) {
//       console.error("❌ Save design failed:", error);
//       console.error("❌ Error response:", error?.response?.data);
//       console.error("❌ Error status:", error?.response?.status);
//       alert(
//         "Failed to save design: " +
//           (error?.response?.data?.message || error.message || "Unknown error")
//       );
//     }
//   };

//   // Keep transformer synced with selection and changes
//   useEffect(() => {
//     if (!transformerRef.current) return;
//     if (!selectedId) {
//       transformerRef.current.nodes([]);
//       transformerRef.current.getLayer()?.batchDraw();
//       return;
//     }
//     const node = nodeRefs.current[String(selectedId)]?.current;
//     if (node) {
//       transformerRef.current.nodes([node]);
//       transformerRef.current.getLayer()?.batchDraw();
//     }
//   }, [selectedId, shapes]);

//   // Live-update text styling on selected text node
//   useEffect(() => {
//     if (!selectedId) return;
//     const s = shapes.find((x) => String(x.id) === String(selectedId));
//     if (s && s.type === "text") {
//       dispatch(
//         updateShape({
//           id: String(selectedId),
//           newAttrs: {
//             fontSize,
//             fontFamily,
//             fontStyle: `${isItalic ? "italic" : ""} ${
//               isBold ? "bold" : ""
//             }`.trim(),
//             fill: currentColor,
//           },
//         })
//       );
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fontSize, fontFamily, isBold, isItalic, currentColor]);

//   // Responsive canvas - fills available space
//   const [stageSize, setStageSize] = useState({ width: 900, height: 600 });
//   useEffect(() => {
//     const update = () => {
//       const isMobile = window.innerWidth < 768;
//       const sidebarWidth = isMobile ? 0 : (sidebarOpen ? 288 : 0); // 288px = w-72
//       const navbarHeight = 70; // EditNavbar height
      
//       // Calculate available space, accounting for padding and margins
//       // Leave some padding around the canvas for the shadow effect
//       const padding = isMobile ? 20 : 40;
//       const w = Math.max(300, window.innerWidth - sidebarWidth - padding);
//       const h = Math.max(400, window.innerHeight - navbarHeight - padding);
      
//       setStageSize({ width: w, height: h });
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, [sidebarOpen]);

//   return (
//     <div className="bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] min-h-screen text-white flex flex-col">
//       <EditNavbar
//         onRect={handleAddRect}
//         onCircle={handleAddCircle}
//         onEllipse={handleAddEllipse}
//         onLine={handleAddLine}
//         onTriangle={handleAddTriangle}
//         onText={handleAddText}
//         onClear={() => {
//           dispatch(clearShapes());
//           setSelectedId(null);
//           transformerRef.current?.nodes([]);
//         }}
//         onUndo={() => dispatch(undo())}
//         onRedo={() => dispatch(redo())}
//         onColorChange={setCurrentColor}
//         onPaintToggle={() => setIsPainting((v) => !v)}
//         isPainting={isPainting}
//         onExportPNG={exportPNG}
//         onExportPDF={exportPDF}
//         onDelete={handleDelete}
//         onBringForward={bringForward}
//         onSendBackward={sendBackward}
//         onSaveDesign={saveDesign}
//         onUploadImageClick={handleUploadImageClick}
//       />

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Mobile Sidebar Toggle Button */}
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {sidebarOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>

//         {/* Desktop Sidebar Toggle */}
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 w-8 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-r-lg shadow-lg items-center justify-center hover:w-10 transition-all duration-200"
//           style={{ left: sidebarOpen ? '288px' : '0' }}
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {sidebarOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             )}
//           </svg>
//         </button>

//         {/* Left sidebar */}
//         <div className={`
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-full'}
//           fixed md:relative w-72 h-full bg-gradient-to-b from-gray-800/60 to-gray-900/60 
//           backdrop-blur-sm border-r border-purple-900/30 p-4 md:p-6 space-y-4 md:space-y-6 
//           overflow-auto z-40 transition-transform duration-300 ease-in-out
//         `}>
//           {/* Text Controls Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//               </svg>
//               Text Controls
//             </h3>
//             <div>
//               <label className="text-xs text-gray-400 mb-2 block">Font Family</label>
//               <select
//                 value={fontFamily}
//                 onChange={(e) => setFontFamily(e.target.value)}
//                 className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//               >
//                 <option>Arial</option>
//                 <option>Times New Roman</option>
//                 <option>Courier New</option>
//                 <option>Georgia</option>
//                 <option>Roboto</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-xs text-gray-400 mb-2 block">Font Size</label>
//               <input
//                 type="number"
//                 value={fontSize}
//                 onChange={(e) => setFontSize(Number(e.target.value))}
//                 className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//               />
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsBold((b) => !b)}
//                 className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
//                   isBold
//                     ? "bg-purple-600 text-white shadow-lg"
//                     : "bg-gray-800/50 text-gray-400 hover:bg-gray-700"
//                 }`}
//               >
//                 B
//               </button>
//               <button
//                 onClick={() => setIsItalic((i) => !i)}
//                 className={`flex-1 px-4 py-2 rounded-lg italic text-sm transition-all duration-200 ${
//                   isItalic
//                     ? "bg-purple-600 text-white shadow-lg"
//                     : "bg-gray-800/50 text-gray-400 hover:bg-gray-700"
//                 }`}
//               >
//                 I
//               </button>
//             </div>
//           </div>

//           {/* Selected Shape Section */}
//           <div className="space-y-4 pt-4 border-t border-gray-700">
//             <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider flex items-center gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
//               </svg>
//               Selected Shape
//             </h3>
//             <div className="bg-gray-800/30 rounded-lg p-4 space-y-3">
//               <div className="text-xs">
//                 <span className="text-gray-400">ID:</span>
//                 <span className="ml-2 text-purple-300 font-mono">{selectedId ?? "None"}</span>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-2 block">Color</label>
//                 <input
//                   type="color"
//                   value={currentColor}
//                   onChange={(e) => setCurrentColor(e.target.value)}
//                   className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-700 hover:border-purple-500 transition-colors"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image Upload Section */}
//           <div className="space-y-4 pt-4 border-t border-gray-700">
//             <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Image Upload
//             </h3>
//             <div>
//               <input
//                 ref={hiddenFileRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <button
//                 onClick={handleUploadImageClick}
//                 className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 Upload Image
//               </button>
//             </div>
//           </div>

//           {/* Save & Export Section */}
//           <div className="space-y-4 pt-4 border-t border-gray-700">
//             <h3 className="text-sm font-bold text-green-300 uppercase tracking-wider flex items-center gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//               </svg>
//               Save & Export
//             </h3>
//             <div className="space-y-3">
//               <button
//                 onClick={saveDesign}
//                 className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//                 </svg>
//                 Save Design
//               </button>
//               <button
//                 onClick={exportPNG}
//                 className="w-full px-4 py-3 bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-green-500 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 Export PNG
//               </button>
//               <button
//                 onClick={exportPDF}
//                 className="w-full px-4 py-3 bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-green-500 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                 </svg>
//                 Export PDF
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Canvas area - fills all available space */}
//         <div className="flex-1 flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50">
//           <div
//             className="relative shadow-2xl shadow-purple-900/30"
//             style={{ 
//               width: `${stageSize.width}px`,
//               height: `${stageSize.height}px`,
//               maxWidth: "100%",
//               maxHeight: "100%",
//             }}
//           >
//             <Stage
//               width={stageSize.width}
//               height={stageSize.height}
//               ref={stageRef}
//               onMouseDown={handleStageMouseDown}
//               onMouseMove={handleStageMouseMove}
//               onMouseUp={handleStageMouseUp}
//               className="rounded-lg"
//               style={{ background: "#ffffff" }}
//             >
//               <Layer>
//                 {shapes?.map((shape) => {
//                   const id = String(shape.id);
//                   const ref = ensureRef(nodeRefs, id);

//                   switch (shape.type) {
//                     case "rect":
//                       return (
//                         <Rect
//                           key={id}
//                           id={id}
//                           x={shape.x}
//                           y={shape.y}
//                           width={shape.width}
//                           height={shape.height}
//                           fill={shape.fill ?? "transparent"}
//                           stroke={shape.stroke ?? currentColor}
//                           strokeWidth={shape.strokeWidth ?? 2}
//                           draggable
//                           ref={ref}
//                           onClick={() => selectShape(id)}
//                           onTap={() => selectShape(id)}
//                           onDragEnd={() => handleDragEnd(id, ref.current)}
//                           onTransformEnd={() =>
//                             handleTransformEnd(id, ref.current)
//                           }
//                         />
//                       );
//                     case "circle":
//                       return (
//                         <Circle
//                           key={id}
//                           id={id}
//                           x={shape.x}
//                           y={shape.y}
//                           radius={shape.radius}
//                           fill={shape.fill ?? "transparent"}
//                           stroke={shape.stroke ?? currentColor}
//                           strokeWidth={shape.strokeWidth ?? 2}
//                           draggable
//                           ref={ref}
//                           onClick={() => selectShape(id)}
//                           onDragEnd={() => handleDragEnd(id, ref.current)}
//                           onTransformEnd={() =>
//                             handleTransformEnd(id, ref.current)
//                           }
//                         />
//                       );
//                     case "ellipse":
//                       return (
//                         <Ellipse
//                           key={id}
//                           id={id}
//                           x={shape.x}
//                           y={shape.y}
//                           radiusX={shape.radiusX}
//                           radiusY={shape.radiusY}
//                           fill={shape.fill ?? "transparent"}
//                           stroke={shape.stroke ?? currentColor}
//                           strokeWidth={shape.strokeWidth ?? 2}
//                           draggable
//                           ref={ref}
//                           onClick={() => selectShape(id)}
//                           onDragEnd={() => handleDragEnd(id, ref.current)}
//                           onTransformEnd={() =>
//                             handleTransformEnd(id, ref.current)
//                           }
//                         />
//                       );
//                     case "line":
//                       return (
//                         <Line
//                           key={id}
//                           id={id}
//                           points={shape.points}
//                           stroke={shape.stroke ?? currentColor}
//                           strokeWidth={shape.strokeWidth ?? 2}
//                           tension={shape.tension ?? 0}
//                           lineCap={shape.lineCap ?? "round"}
//                           draggable={!shape.isFreehand}
//                           ref={ref}
//                           onClick={() => selectShape(id)}
//                           onDragEnd={() => handleDragEnd(id, ref.current)}
//                           onTransformEnd={() =>
//                             handleTransformEnd(id, ref.current)
//                           }
//                         />
//                       );
//                     case "triangle":
//                       return (
//                         <Line
//                           key={id}
//                           id={id}
//                           points={shape.points}
//                           closed
//                           fill={shape.fill ?? "transparent"}
//                           stroke={shape.stroke ?? currentColor}
//                           strokeWidth={shape.strokeWidth ?? 2}
//                           draggable
//                           ref={ref}
//                           onClick={() => selectShape(id)}
//                           onDragEnd={() => handleDragEnd(id, ref.current)}
//                           onTransformEnd={() =>
//                             handleTransformEnd(id, ref.current)
//                           }
//                         />
//                       );
//                     case "text":
//                       return (
//                         <Text
//                           key={id}
//                           id={id}
//                           x={shape.x}
//                           y={shape.y}
//                           text={shape.text}
//                           fontSize={shape.fontSize ?? 24}
//                           fontFamily={shape.fontFamily ?? "Arial"}
//                           fontStyle={shape.fontStyle ?? ""}
//                           fill={shape.fill ?? currentColor}
//                           draggable
//                           ref={ref}
//                           onClick={() => selectShape(id)}
//                           onDragEnd={() => handleDragEnd(id, ref.current)}
//                           onTransformEnd={() =>
//                             handleTransformEnd(id, ref.current)
//                           }
//                           onDblClick={() => {
//                             setEditingTextId(id);
//                           }}
//                         />
//                       );
//                     case "image":
//                       return (
//                         <KonvaImage
//                           key={id}
//                           shape={{ ...shape, id }}
//                           nodeRef={ref}
//                           onSelect={() => selectShape(id)}
//                           onChange={(newAttrs) =>
//                             dispatch(updateShape({ id, newAttrs }))
//                           }
//                         />
//                       );
//                     default:
//                       return null;
//                   }
//                 })}
//                 <Transformer ref={transformerRef} rotateEnabled />
//               </Layer>
//             </Stage>
            
//             {/* Editable text overlay */}
//             {editingTextId && (() => {
//               const shape = shapes.find(s => String(s.id) === String(editingTextId));
//               if (!shape || shape.type !== "text") return null;
              
//               return (
//                 <textarea
//                   autoFocus
//                   value={shape.text}
//                   onChange={(e) => {
//                     dispatch(updateShape({
//                       id: editingTextId,
//                       newAttrs: { text: e.target.value }
//                     }));
//                   }}
//                   onBlur={() => {
//                     setEditingTextId(null);
//                     if (!shape.text || shape.text.trim() === "") {
//                       dispatch(updateShape({
//                         id: editingTextId,
//                         newAttrs: { text: "Text" }
//                       }));
//                     }
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Escape") {
//                       setEditingTextId(null);
//                     }
//                   }}
//                   style={{
//                     position: "absolute",
//                     top: `${shape.y + 10}px`,
//                     left: `${shape.x + 10}px`,
//                     fontSize: `${shape.fontSize ?? 24}px`,
//                     fontFamily: shape.fontFamily ?? "Arial",
//                     fontStyle: shape.fontStyle ?? "",
//                     color: shape.fill ?? currentColor,
//                     background: "white",
//                     border: "2px solid #3b82f6",
//                     outline: "none",
//                     padding: "4px 8px",
//                     minWidth: "150px",
//                     minHeight: "40px",
//                     resize: "both",
//                     zIndex: 1000,
//                   }}
//                 />
//               );
//             })()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Canvas/Editor.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Ellipse,
  Line,
  Text,
  Image as KImage,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import jsPDF from "jspdf";
import { useSelector, useDispatch } from "react-redux";
import EditNavbar from "./EditNavbar";
import {
  addShape,
  updateShape,
  clearShapes,
  undo,
  redo,
  removeShape,
  replaceAll,
} from "../store/shapesSlice";
import { fetchDesigns } from "../store/designSlice";
import axiosInstance from "../utils/axiosinstance";

/* helpers */
const uid = () =>
  `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const ensureRef = (store, id) => {
  if (!store.current[id]) store.current[id] = React.createRef();
  return store.current[id];
};

const coerceId = (shape) => ({
  ...shape,
  id: String(shape.id ?? shape._id ?? uid()),
});

function KonvaImage({ shape, onSelect, onChange, nodeRef }) {
  const [img] = useImage(shape.src);
  return (
    <KImage
      image={img}
      {...shape}
      draggable
      ref={nodeRef}
      onClick={onSelect}
      onDragEnd={(e) =>
        onChange({ x: e.target.x(), y: e.target.y() })
      }
      onTransformEnd={() => {
        const node = nodeRef.current;
        const sx = node.scaleX();
        const sy = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          x: node.x(),
          y: node.y(),
          width: node.width() * sx,
          height: node.height() * sy,
        });
      }}
    />
  );
}

export default function Editor() {
  const { shapes } = useSelector((state) => state.shapes);
  const selectedDesign = useSelector((state) => state.designs.selected);
  const dispatch = useDispatch();

  const stageRef = useRef();
  const transformerRef = useRef();
  const nodeRefs = useRef({});

  const [selectedId, setSelectedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* Load saved design */
  useEffect(() => {
    if (selectedDesign) {
      dispatch(replaceAll(selectedDesign.Shapes.map(coerceId)));
      transformerRef.current?.nodes([]);
    }
  }, [selectedDesign, dispatch]);

  /* Canvas size */
  const [stageSize, setStageSize] = useState({ width: 900, height: 600 });

  useEffect(() => {
    const resize = () => {
      const sidebar = window.innerWidth >= 768 && sidebarOpen ? 288 : 0;
      const navbar = 70;
      const padding = 120;

      setStageSize({
        width: Math.max(320, window.innerWidth - sidebar - padding),
        height: Math.max(400, window.innerHeight - navbar - padding),
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [sidebarOpen]);

  const selectShape = (id) => {
    setSelectedId(id);
    const node = nodeRefs.current[id]?.current;
    if (node) transformerRef.current.nodes([node]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] text-white flex flex-col">
      <EditNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`w-72 bg-gray-900/60 border-r border-purple-900/40 ${sidebarOpen ? "block" : "hidden"} md:block`} />

        {/* CANVAS AREA */}
        <div className="flex-1 bg-gradient-to-br from-gray-900/50 to-gray-800/50 px-6 md:px-10 pb-10 pt-4 overflow-auto">

          {/* CANVAS CONTAINER */}
          <div
            className="mx-auto bg-white rounded-2xl shadow-2xl shadow-purple-900/40 border border-purple-200"
            style={{
              width: stageSize.width,
              height: stageSize.height,
              maxWidth: "100%",
            }}
          >
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              ref={stageRef}
              className="rounded-2xl"
              style={{ background: "#ffffff" }}
            >
              <Layer>
                {shapes.map((shape) => {
                  const ref = ensureRef(nodeRefs, shape.id);

                  if (shape.type === "rect") {
                    return (
                      <Rect
                        key={shape.id}
                        {...shape}
                        draggable
                        ref={ref}
                        onClick={() => selectShape(shape.id)}
                      />
                    );
                  }
                  return null;
                })}
                <Transformer ref={transformerRef} />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
}

