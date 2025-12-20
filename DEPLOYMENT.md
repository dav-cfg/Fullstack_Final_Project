# 🚀 Deployment Guide - Novy Grafyniq

## Overview
- **Frontend**: Vercel - https://novy-grafyniq.vercel.app/
- **Backend**: Render - https://novy-grafyniq.onrender.com

---

## 📦 Backend Deployment (Render)

### Prerequisites
- GitHub repository with latest code
- MongoDB Atlas database
- Cloudinary account
- Render account

### Steps:

1. **Create New Web Service on Render**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `Fullstack_Final_Project` repository

2. **Configure Build Settings**
   - **Name**: `novy-grafyniq`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

3. **Set Environment Variables**
   Go to "Environment" tab and add:
   ```
   MONGO_URI=mongodb+srv://your-connection-string
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   JWT_SECRET=your-long-random-secret-key
   GOOGLE_CLIENT_ID=699000506438-8mk58p3p1bg1ce4qa9ssao5sv993b82u.apps.googleusercontent.com
   FRONTEND_URL=https://novy-grafyniq.vercel.app
   PORT=3000
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy from your GitHub repo
   - Wait for deployment to complete (5-10 minutes)

5. **Verify Deployment**
   - Visit: https://novy-grafyniq.onrender.com
   - You should see: "✅ Novy Grafyniq API is running..."

### Auto-Deploy
- Render automatically deploys when you push to the `main` branch
- Monitor deployments in the Render dashboard

---

## 🌐 Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository

### Steps:

1. **Import Project to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `Fullstack_Final_Project` repository

2. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   Go to "Settings" → "Environment Variables" and add:
   ```
   VITE_API_BASE_URL=https://novy-grafyniq.onrender.com
   VITE_GOOGLE_CLIENT_ID=699000506438-8mk58p3p1bg1ce4qa9ssao5sv993b82u.apps.googleusercontent.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Wait for deployment to complete (2-5 minutes)

5. **Verify Deployment**
   - Visit: https://novy-grafyniq.vercel.app
   - The application should load and work correctly

### Auto-Deploy
- Vercel automatically deploys when you push to the `main` branch
- Production deployments from `main`
- Preview deployments from other branches

---

## 🔧 Post-Deployment Configuration

### 1. Update Google OAuth (if using)
- Go to Google Cloud Console
- Add authorized redirect URIs:
  - `https://novy-grafyniq.vercel.app`
  - `https://novy-grafyniq.onrender.com`

### 2. MongoDB Atlas Network Access
- Go to MongoDB Atlas → Network Access
- Add IP addresses:
  - `0.0.0.0/0` (allow all - for Render's dynamic IPs)
  - Or use Render's IP allowlist if on paid plan

### 3. Cloudinary Settings
- Verify folders exist:
  - `Novy Grafyniq/admin`
  - `Novy Grafyniq/templates`
- Check upload presets if using unsigned uploads

---

## 🧪 Testing Production Deployment

### Backend Health Check
```bash
curl https://novy-grafyniq.onrender.com
# Should return: "✅ Novy Grafyniq API is running..."
```

### Test API Endpoints
```bash
# Test templates (public)
curl https://novy-grafyniq.onrender.com/api/templates
```

### Frontend Testing
1. Visit https://novy-grafyniq.vercel.app
2. Test user registration/login
3. Test creating a design
4. Test admin login (Novy_admin / 123456)
5. Test admin dashboard features

---

## 🎉 Deployment Complete!

Your application is now live:
- 🌐 **Frontend**: https://novy-grafyniq.vercel.app
- 🔧 **Backend**: https://novy-grafyniq.onrender.com

### Admin Access
- **Username**: Novy_admin
- **Password**: 123456
- ⚠️ **Important**: Change these credentials for production!

---

**Last Updated**: December 20, 2025
**Version**: 1.0.0
