// Routes/designs.js
const express = require("express");
const router = express.Router();
const Design = require("../Models/Designs");
const Template = require("../Models/Template");
const cloudinary = require("../Config/cloudinary");
const { authenticateToken } = require("../src/utilities");

// ---------------------------
// GET /api/designs?userId=...
// ---------------------------
router.get("/", authenticateToken, async (req, res) => {
  const { userId } = req.query;
  
  const isAdmin = req.user?.role === "admin";
  
  // If admin and no userId specified, they might want all designs (but should use /api/admin/designs)
  // If userId is specified, validate access
  if (userId) {
    // Regular users can only fetch their own designs
    if (!isAdmin && req.user?.id && String(req.user.id) !== String(userId)) {
      return res.status(403).json({ message: "Forbidden: You can only view your own designs" });
    }
  } else {
    // If no userId is provided, return error
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const designs = await Design.find({ createdBy: userId }).sort({
      updatedAt: -1,
    });
    res.json(designs);
  } catch (err) {
    console.error("GET designs error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------------------------------------
// POST /api/designs  (supports admin saving as template)
// body: { Shapes[], name, username, imageData?, asTemplate?:bool, category?:string }
// -----------------------------------------------------------
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("🟢 POST /api/designs hit");
    console.log("🔐 Authenticated user:", req.user);
    console.log("📦 Request body keys:", Object.keys(req.body));
    console.log("📦 Shapes count:", req.body.Shapes?.length);
    console.log("📦 Name:", req.body.name);
    console.log("📦 Username:", req.body.username);
    
    const { Shapes, name, username, imageData, asTemplate, category } =
      req.body;
    
    // For admin, use admin ID; for regular users, use their ID
    const createdBy = req.user?.id || req.user?._id;
    const isAdmin = req.user?.role === "admin";

    if (!Array.isArray(Shapes) || Shapes.length === 0 || !name || !username) {
      console.error("❌ Missing required fields:", {
        hasShapes: Array.isArray(Shapes),
        shapesLength: Shapes?.length,
        name,
        username,
      });
      return res.status(400).json({
        message: "Missing required data",
        got: { 
          shapesCount: Shapes?.length, 
          name, 
          username,
          createdBy,
          isAdmin
        },
      });
    }

    let uploadResult = null;

    if (typeof imageData === "string" && imageData.startsWith("data:image/")) {
      console.log("📸 Uploading image to Cloudinary...");
      try {
        const folderName = isAdmin ? "Novy Grafyniq/admin" : `Novy Grafyniq/${createdBy}`;
        uploadResult = await cloudinary.uploader.upload(imageData, {
          folder: folderName,
        });
        console.log("✅ Cloudinary upload successful:", uploadResult.secure_url);
      } catch (err) {
        console.error("❌ Cloudinary upload failed:", err.message);
      }
    } else {
      console.log("⚠️ No valid imageData provided");
    }

    console.log("💾 Creating design document...");
    const doc = await Design.create({
      Shapes,
      name,
      createdBy,
      username,
      thumbnailUrl: uploadResult?.secure_url || "",
      assetUrl: uploadResult?.secure_url || "",
      cloudinaryPublicId: uploadResult?.public_id || "",
    });
    console.log("✅ Design created:", doc._id);

    // If admin & asTemplate = true, create a Template too
    if (isAdmin && asTemplate) {
      if (!category) {
        console.warn("⚠️ Admin attempted to save template without category");
      } else if (!uploadResult?.secure_url) {
        console.warn(
          "⚠️ No image uploaded; template will be created without image"
        );
      }
      await Template.create({
        name,
        category: category || "Uncategorized",
        imageUrl: uploadResult?.secure_url || "",
        cloudinaryPublicId: uploadResult?.public_id || "",
      });
      console.log("✅ Template also created");
    }

    return res.status(201).json(doc);
  } catch (error) {
    console.error("❌ Error saving design:", error);
    console.error("❌ Error stack:", error.stack);
    return res.status(500).json({
      message: "Error saving design",
      error: error.message,
    });
  }
});

// -----------------------------------------------------------
// PUT /api/designs/:id
// -----------------------------------------------------------
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, Shapes, imageData } = req.body;

  try {
    const existing = await Design.findById(id);
    if (!existing) return res.status(404).json({ message: "Design not found" });

    // Allow admins to update any design, or users to update their own designs
    const isAdmin = req.user?.role === "admin";
    const isOwner = req.user?.id && String(existing.createdBy) === String(req.user.id);
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Forbidden: You can only edit your own designs" });
    }

    const updates = {};
    if (typeof name === "string") updates.name = name;
    if (Array.isArray(Shapes)) updates.Shapes = Shapes;

    if (
      imageData &&
      typeof imageData === "string" &&
      imageData.startsWith("data:")
    ) {
      if (existing.cloudinaryPublicId) {
        try {
          await cloudinary.uploader.destroy(existing.cloudinaryPublicId);
        } catch {}
      }
      const newUpload = await cloudinary.uploader.upload(imageData, {
        folder: `Novy Grafyniq/${existing.createdBy}`,
        resource_type: "image",
      });
      updates.thumbnailUrl = newUpload.secure_url;
      updates.assetUrl = newUpload.secure_url;
      updates.cloudinaryPublicId = newUpload.public_id;
    }

    const updated = await Design.findByIdAndUpdate(id, updates, { new: true });
    return res.json(updated);
  } catch (error) {
    console.error("PUT design error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------------------------------------
// DELETE /api/designs/:id
// -----------------------------------------------------------
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Design.findById(id);
    if (!existing) return res.status(404).json({ message: "Design not found" });

    // Allow admins to delete any design, or users to delete their own designs
    const isAdmin = req.user?.role === "admin";
    const isOwner = req.user?.id && String(existing.createdBy) === String(req.user.id);
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own designs" });
    }

    if (existing.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(existing.cloudinaryPublicId);
      } catch (e) {
        console.warn("Cloudinary delete warning:", e?.message);
      }
    }

    await existing.deleteOne();
    res.status(200).json({ message: "Design deleted successfully" });
  } catch (error) {
    console.error("Error deleting design:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
