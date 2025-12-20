# 🚀 Quick Deployment Checklist

## Pre-Deployment
- [x] All code changes committed and tested locally
- [x] Bug fixes implemented and verified
- [x] Database connection tested
- [x] Cloudinary credentials verified
- [x] Environment variables prepared
- [x] Code pushed to GitHub

## Backend (Render)
- [ ] Create new Web Service on Render
- [ ] Set Root Directory to `backend`
- [ ] Configure environment variables:
  - [ ] MONGO_URI
  - [ ] CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
  - [ ] JWT_SECRET
  - [ ] GOOGLE_CLIENT_ID
  - [ ] FRONTEND_URL=https://novy-grafyniq.vercel.app
  - [ ] NODE_ENV=production
- [ ] Deploy and verify at https://novy-grafyniq.onrender.com

## Frontend (Vercel)
- [ ] Import project to Vercel
- [ ] Set Root Directory to `frontend`
- [ ] Configure environment variables:
  - [ ] VITE_API_BASE_URL=https://novy-grafyniq.onrender.com
  - [ ] VITE_GOOGLE_CLIENT_ID
- [ ] Deploy and verify at https://novy-grafyniq.vercel.app

## Post-Deployment Testing
- [ ] Test user registration/login
- [ ] Test creating a design
- [ ] Test design rename (should update immediately)
- [ ] Test admin login (Novy_admin / 123456)
- [ ] Test admin dashboard - view all designs
- [ ] Test admin - add template
- [ ] Test admin - view all users
- [ ] Test canvas editor (whiteboard coverage)
- [ ] Verify CORS is working
- [ ] Check MongoDB Atlas network access (0.0.0.0/0)
- [ ] Monitor logs for errors

## Production Hardening
- [ ] Change admin password from default
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure database backups
- [ ] Enable rate limiting
- [ ] Set up uptime monitoring
- [ ] Update Google OAuth redirect URIs

## 🎯 URLs
- Frontend: https://novy-grafyniq.vercel.app
- Backend: https://novy-grafyniq.onrender.com
- GitHub: https://github.com/dav-cfg/Fullstack_Final_Project

## 🔑 Credentials
- Admin: Novy_admin / 123456 (⚠️ CHANGE IN PRODUCTION!)

## ✅ Bug Fixes Included
- ✅ Design rename updates immediately without refresh
- ✅ Admin can view all users' designs
- ✅ Admin can add templates
- ✅ Admin can save designs from editor
- ✅ Admin can view all users
- ✅ Whiteboard covers all workspace area
